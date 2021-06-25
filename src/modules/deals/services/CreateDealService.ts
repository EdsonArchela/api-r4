import { container, inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IOrganizationsRepository from '../../organizations/repositories/IOrganizationsRepository';
import CreateOrganizationService from '../../organizations/serivces/CreateOrganizationService';
import CreatePeopleService from '@modules/people/services/CreatePeoplesService';
import IPeoplesRepository from '../../people/repositories/IPeoplesRepository';
import Roles from '../../users/infra/typeorm/entities/Roles';
import IPartnersRepository from '../../users/repositories/IPartnersRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';
import SimulateDealService from './SimulateDealService';
import agendor_api from '../../../services/agendor_api';
import moment from 'moment';

interface IRequest {
  organization_id?: string;
  people_id?: string;
  value: number;
  user_id: string;
  bank: string;
  cet: number;
  contract: number;
  currency: string;
  direction: boolean;
  flow: string;
  operationType: string;
  partnerId?: string;
  advisorId?: string;
  otc: number;
  spread: number;
  iof: number;
  ir: number;
  ptax2: number;
  darf: boolean;
}

@injectable()
export default class CreateDealService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('PartnersRepository')
    private partnerRepository: IPartnersRepository,
    @inject('PeoplesRepository')
    private peoplesRepository: IPeoplesRepository,
  ) {}

  public async execute({
    organization_id,
    people_id,
    value,
    user_id,
    bank,
    contract,
    currency,
    direction,
    flow,
    operationType,
    partnerId,
    advisorId,
    otc,
    spread,
    iof,
    ir,
    ptax2,
    darf,
  }: IRequest): Promise<Deal> {
    const user = await this.usersRepository.findById(user_id);

    let partner;

    if (!user) {
      partner = await this.partnerRepository.findById(user_id);
      if (!partner) throw new AppError('Usuário não encontrado');
    }

    if (!user && !partner) throw new AppError('Usuário não encontrado');
    const isBroker = user?.roles?.filter(
      (role: Roles) => role.name === 'ROLE_MESA',
    ).length;

    if (!advisorId) advisorId = user_id;
    // criar nova organização caso não exista
    let organization = undefined;
    let people = undefined;
    if (organization_id) {
      organization = await this.organizationsRepository.findByAgendorId(
        organization_id,
      );
      if (!organization) {
        const createOrganizationService = container.resolve(
          CreateOrganizationService,
        );
        organization = await createOrganizationService.execute({
          agendorId: organization_id,
          partner: partnerId,
          userId: advisorId,
        });
      }
    } else if (people_id) {
      people = await this.peoplesRepository.findByAgendorId(people_id);
      if (!people) {
        const createPeoplesService = container.resolve(CreatePeopleService);
        people = await createPeoplesService.execute({
          agendorId: people_id,
          partner: partnerId,
          userId: advisorId,
        });
      }
    } else {
      throw new AppError(
        'Não foi possível linkar seu negócio à uma pessoa ou empresa',
      );
    }

    let counterFee = 0;
    let partnerOpFee = 0;
    let partnerIndFee = 0;

    if (isBroker) counterFee = user?.comission || 0;

    if (partnerId) {
      if (partner?.roles?.filter(role => role.name === 'ROLE_PARTNER'))
        partnerOpFee = value * spread * 0.95 * 0.86 * partner.operationFee;
      else
        partnerIndFee =
          value * spread * 0.95 * 0.86 * (partner?.indicationFee || 0);
    }

    //recalculate sensible data
    const simulateDealService = container.resolve(SimulateDealService);

    const simulatedData = await simulateDealService.execute({
      bank,
      currency,
      direction,
      otc,
      spread,
      user_id: advisorId,
      value,
      iof,
      ir,
      ptax2,
      darf,
    });
    const discount = contract - simulatedData.contract;

    const finalAssFee =
      (simulatedData.assFee + discount) /
      ((1 + partnerOpFee) * (1 + partnerIndFee));

    const bankFee = () => {
      switch (bank) {
        case 'ourinvest':
          return 0.6;
        case 'c6':
          return 0.55;
        case 'daycoval':
          return 0.5;
        case 'moneycorp':
          return 0.7;
        default:
          return 0.5;
      }
    };

    const deal = await this.dealsRepository.create({
      advisorId,
      bank,
      agendorOrganizationId: organization_id,
      agendorPeopleId: people_id,
      assFee: finalAssFee * (1 - counterFee),
      partner: partnerId
        ? partnerOpFee > 0
          ? partnerOpFee
          : partnerIndFee
        : 0,
      broker: counterFee,
      cet: simulatedData.cet,
      contract,
      contractDiscount: discount,
      currency,
      spread,
      direction,
      flow,
      iof,
      ir,
      otcQuote: otc,
      operationType,
      ptax1: simulatedData.ptaxD1 || 0,
      ptax2,
      r4Fee: value * spread * bankFee() - simulatedData.assFee,
      user: user || partner,
      value,
      darf: simulatedData.darf,
      partnerId,
    });

    const formato = {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
      style: 'currency',
      currency: 'BRL',
    };

    const agendor_id = await this.usersRepository.findById(advisorId);

    if (organization_id) {
      await agendor_api.post(`organizations/${organization_id}/deals`, {
        title: `Fechamento de Câmbio - ${organization_id} ${moment
          .now()
          .toLocaleString()}`,
        description: `Taxa Mesa: ${otc.toLocaleString(
          'pt-BR',
          formato,
        )}\nTaxa Cliente: ${(direction
          ? otc - spread
          : otc + spread
        ).toLocaleString(
          'pt-BR',
          formato,
        )}\nDespesas: ${contract.toLocaleString(
          'pt-BR',
          formato,
        )}\nFluxo: ${flow}`,
        ownerUser: agendor_id?.agendor_id ? parseInt(agendor_id.agendor_id) : 0,
        value: value,
      });
    } else if (people_id) {
      await agendor_api.post(`people/${people_id}/deals`, {
        title: `Fechamento de Câmbio - ${people_id} ${moment
          .now()
          .toLocaleString()}`,
        description: `Taxa Mesa: ${otc.toLocaleString(
          'pt-BR',
          formato,
        )}\nTaxa Cliente: ${(direction
          ? otc - spread
          : otc + spread
        ).toLocaleString(
          'pt-BR',
          formato,
        )}\nDespesas: ${contract.toLocaleString(
          'pt-BR',
          formato,
        )}\nFluxo: ${flow}`,
        owneruser: Number(agendor_id?.agendor_id),
        value: value,
      });
    }

    return deal;
  }
}
