import { container, inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IOrganizationsRepository from '../../organizations/repositories/IOrganizationsRepository';
import CreateOrganizationService from '../../organizations/serivces/CreateOrganizationService';
import Roles from '../../users/infra/typeorm/entities/Roles';
import IPartnersRepository from '../../users/repositories/IPartnersRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';
import SimulateDealService from './SimulateDealService';

interface IRequest {
  organization_id: string;
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
  ) {}

  public async execute({
    organization_id,
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
    organization = await this.organizationsRepository.findByAgendorId(
      organization_id,
    );
    if (!organization) {
      const createOrganizationService = container.resolve(
        CreateOrganizationService,
      );
      organization = createOrganizationService.execute({
        agendorId: organization_id,
        partner: partnerId,
        userId: advisorId,
      });
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
      (simulatedData.assFee - discount) /
      ((1 + partnerOpFee) * (1 + partnerIndFee));

    const deal = await this.dealsRepository.create({
      advisorId,
      bank,
      agendorOrganizationId: organization_id,
      assFee: finalAssFee * (1 - counterFee),
      partnerFee: partnerId
        ? partnerOpFee > 0
          ? partnerOpFee
          : partnerIndFee
        : 0,
      counterFee,
      cet: simulatedData.cet,
      contract,
      contractDiscount: discount,
      currency,
      direction,
      flow,
      iof,
      ir,
      operationType,
      ptax1: simulatedData.ptaxD1 || 0,
      ptax2,
      r4Fee: value * spread * 0.5 - simulatedData.assFee,
      user: user || partner,
      value,
      darf: simulatedData.darf,
      partnerId,
    });

    return deal;
  }
}
