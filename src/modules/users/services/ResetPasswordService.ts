import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRolesRepository from '../repositories/IRolesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
  user_id: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private RolesRepository: IRolesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password, user_id }: IRequest): Promise<User> {
    const requestUser = await this.usersRepository.findById(user_id);
    const user = await this.usersRepository.findByEmail(email);
    const adminRole = await this.RolesRepository.findByName('ROLE_ADMIN');
    if (!adminRole) throw new AppError('Algo deu errado, tente novamente');
    if (!user) throw new AppError('Usuário não encontrado');
    if (!requestUser) throw new AppError('Algo deu errado, tente novamente');
    console.log('hastheinfo');
    console.log(
      requestUser.roles?.map(role => role.id === adminRole.id).length,
    );
    if (
      user.email !== email ||
      requestUser.roles?.map(role => role.id === adminRole.id).length !== 1
    )
      throw new AppError(
        'Usuário não possui permissão para alterar a senha',
        401,
      );
    console.log('hasPermission');
    const hashedPassword = await this.hashProvider.generateHash(password);
    console.log(hashedPassword);
    const updatedUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
    console.log(updatedUser);
    return updatedUser;
  }
}
