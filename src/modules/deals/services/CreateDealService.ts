import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';

interface IRequest {
  organization_id: string;
  description: string;
  value: number;
  user_id: string;
  assFee: number;
  bank: string;
  cet: number;
  contract: number;
  currency: string;
  direction: string;
  flow: string;
  operationType: string;
  r4Fee: number;
}

interface IResponse {
  data: {
    data: {
      id: number;
      _email: string;
    };
  };
}

@injectable()
export default class CreateDealService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,
  ) {}

  private getProduct(prod: string) {
    switch (prod) {
      case 'Exportação':
        return 93972;
      case 'Financeiro':
        return 93981;
      case 'Importação':
        return 93970;
      default:
        return 93982;
    }
  }

  public async execute({
    organization_id,
    description,
    value,
    user_id,
    assFee,
    bank,
    cet,
    contract,
    currency,
    direction,
    flow,
    operationType,
    r4Fee,
  }: IRequest): Promise<Deal> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('Usuário não encontrado');

    const response: IResponse = await agendor_api.post(
      `organizations/${organization_id}/deals`,
      {
        title: 'Fechamento de Câmbio -',
        description: description,
        value: value,
        ownerUser: user.agendor_id,
        products: [this.getProduct(operationType)],
      },
    );
    if (!response)
      throw new AppError(
        'Não foi possível adicionar um novo negócio no agendor',
      );

    const deal = await this.dealsRepository.create({
      deal_id: response.data.data.id.toString(),
      user_id: user.id,
      a_email: response.data.data._email,
      agendorOrganizationId: organization_id,
      assFee,
      bank,
      cet,
      contract,
      currency,
      direction,
      flow,
      operationType,
      ownnerId: user.agendor_id,
      r4Fee,
      value,
    });

    return deal;
  }
}
