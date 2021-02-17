import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface AgUser {
  id: string;
  contact: { email: string };
}

interface UsersList {
  data: {
    data: AgUser[];
  };
}

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

    const users: UsersList = await agendor_api.get('users');

    const agendorId = users.data.data.find(
      a_user => a_user.contact.email === user.email,
    );

    if (!agendorId) throw new AppError('Usuário não encontrado no Agendor');

    if (!name && !cnpj)
      throw new AppError('Digite um nome ou cnpj para a procura');

    console.log(name, cnpj);
    const { data } = await agendor_api.get(
      `/organizations?userOwener=${agendorId.id}&per_page=100&${
        name ? `name=${name}` : `cnpj=${cnpj}`
      }`,
    );

    return data;
  }
}
export default GetUsersOrganizationService;
