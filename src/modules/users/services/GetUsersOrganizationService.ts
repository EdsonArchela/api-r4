import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetUsersOrganizationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    id: string,
    name: string,
    cnpj: string,
  ): Promise<object> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    if (!name && !cnpj)
      throw new AppError('Digite um nome ou cnpj para a procura');

    const { data } = await agendor_api.get(
      `/organizations?userOwener=${user.agendor_id}&per_page=100&${
        name ? `name=${name}` : `cnpj=${cnpj}`
      }`,
    );

    return data;
  }
}
export default GetUsersOrganizationService;
