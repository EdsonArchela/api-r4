import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IRolesRepository from '../repositories/IRolesRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  comission?: number;
  roles: string[];
}

@injectable()
class CreateUserService {
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
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail já foi cadastrado');
    }

    const existsRoles = await this.RolesRepository.findThose(roles);

    if (!existsRoles) throw new AppError('Não pude encontrar seu Role');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      comission,
      roles: existsRoles,
    });

    return user;
  }
}

export default CreateUserService;
