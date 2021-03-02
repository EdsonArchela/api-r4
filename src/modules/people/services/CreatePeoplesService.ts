import { injectable, inject } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IPartnersRepository from '../../users/repositories/IPartnersRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import People from '../infra/typeorm/entities/People';
import IPeoplesRepository from '../repositories/IPeoplesRepository';

interface IRequest {
  userId: string;
  partner?: string;
  agendorId: string;
  phone?: string;
}

export default interface IAgendorResponse {
  accountId: number;
  name: string;
  email: string | null;
  cpf: string | null;
  description: string | null;
  organization: number | null;
  website: string | null;
  _webUrl?: string;
  ownerUser: { id: number };
}

@injectable()
export default class CreatePeopleService {
  constructor(
    @inject('PeoplesRepository')
    private peoplesRepository: IPeoplesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PartnersRepository')
    private partnersRepository: IPartnersRepository,
  ) {}

  public async execute(data: IRequest): Promise<People> {
    const user = await this.usersRepository.findById(data.userId);
    if (!user) throw new AppError('Usuário não encontrado');

    let partner = undefined;
    if (data.partner) {
      partner = await this.partnersRepository.findById(data.partner);
      if (!partner) throw new AppError('Parceiro não encontrado');
    }

    const response = await agendor_api.get(`people/${data.agendorId}`);

    const agendor: IAgendorResponse = response.data.data;
    if (!agendor) throw new AppError('Pessoa não encontrada no Agendor');

    const ownerUser = await this.usersRepository.findByAgendorId(
      agendor.ownerUser.id.toString() || '',
    );

    if (!ownerUser)
      throw new AppError(
        'Assessor responsável pelo cliente não foi encontrado no sistema',
      );
    const people = await this.peoplesRepository.create({
      agendor_id: data.agendorId,
      cpf: agendor.cpf || undefined,
      name: agendor.name,
      organization: agendor.organization?.toString() || undefined,
      ownerUser,
      _webUrl: agendor._webUrl,
      description: agendor.description || undefined,
      email: agendor.email || undefined,
      partner,
      website: agendor.website || undefined,
    });
    return people;
  }
}
