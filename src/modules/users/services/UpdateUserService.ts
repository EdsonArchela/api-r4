import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IRolesRepository from '../repositories/IRolesRepository';
import agendor_api from '../../../services/agendor_api';

interface AgUser {
  id: string;
  contact: { email: string };
}

interface UsersList {
  data: {
    data: AgUser[];
  };
}
interface IRequest {
  name: string;
  email: string;
  password: string;
  comission?: number;
  roles: string[];
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private RolesRepository: IRolesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    comission,
    roles,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Usuário não encontrado');

    let existsRoles;
    if (roles) {
      existsRoles = await this.RolesRepository.findThose(roles);
      if (!existsRoles) throw new AppError('Não pude encontrar seu Role');
    }

    const users: UsersList = await agendor_api.get('users');
    const agendorId = users.data.data.find(
      a_user => a_user.contact.email === email,
    );

    if (!agendorId && email !== 'mesa@r4cambio.com.br')
      throw new AppError('Usuário não encontrado no Agendor');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const updatedUser = await this.usersRepository.save({
      ...user,
      name,
      email,
      password: hashedPassword,
      comission: comission || 0,
      roles: existsRoles,
      agendor_id: agendorId?.id,
    });

    return updatedUser;
  }
}

export default UpdateUserService;
