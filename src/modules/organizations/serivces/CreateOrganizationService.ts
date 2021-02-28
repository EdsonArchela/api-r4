import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IAgendorResponse from '../../deals/dtos/IAgendorResponse';
import IPartnersRepository from '../../users/repositories/IPartnersRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import Organization from '../infra/typeorm/entities/Organization';
import IOrganizationsRepository from '../repositories/IOrganizationsRepository';

interface IRequest {
  userId: string;
  partner?: string;
  agendorId: string;
  phone?: string;
}

@injectable()
export default class CreateOrganizationService {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PartnersRepository')
    private partnersRepository: IPartnersRepository,
  ) {}

  public async execute(data: IRequest): Promise<Organization> {
    const user = await this.usersRepository.findById(data.userId);
    if (!user) throw new AppError('Usuário não encontrado');

    let partner = undefined;
    if (data.partner) {
      partner = await this.partnersRepository.findById(data.partner);
      if (!partner) throw new AppError('Parceiro não encontrado');
    }

    console.log(data);

    const { data: a_data } = await agendor_api.get(
      `organizations/${data.agendorId}`,
    );

    const agendor: IAgendorResponse = a_data.data;
    if (!agendor) throw new AppError('Empresa não encontrada no Agendor');

    console.log('agendor ->', agendor);

    const ownerUser = await this.usersRepository.findByAgendorId(
      agendor.ownerUser.id.toString(),
    );
    if (!ownerUser)
      throw new AppError(
        'Assessor responsável pela empresa não foi encontrado no sistema',
      );

    const organization = await this.organizationsRepository.create({
      agendor_id: data.agendorId,
      cnpj: agendor.cnpj,
      name: agendor.name,
      ownerUser,
      _webUrl: agendor._webUrl,
      description: agendor.description,
      email: agendor.email,
      partner,
      website: agendor.website,
    });

    return organization;
  }
}
