import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import IOrganizationsRepository from '../repositories/IOrganizationsRepository';

@injectable()
class GetUsersOrganizationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  public async execute(id: string, name: string, cnpj: string): Promise<void> {
    const organizations = await this.organizationsRepository.findByUserId(id);

    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    if (!name && !cnpj)
      throw new AppError('Digite um nome ou cnpj para a procura');

    const { data } = await agendor_api.get(
      `/organizations?${
        user.agendor_id ? `userOwner=${user.agendor_id}&` : ''
      }per_page=100&${name ? `name=${name}` : `cnpj=${cnpj}`}`,
    );

    return { ...data, partner: organizations?.partner };
  }
}
export default GetUsersOrganizationService;
