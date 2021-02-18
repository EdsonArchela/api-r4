import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class EnsureUserRole {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    roles,
  }: {
    id: string;
    roles: string[];
  }): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    console.log('Users Roles', user.roles, user);
    const userRoles = user.roles?.map(role => role.name);

    const existsRoles = userRoles?.some(r => roles.includes(r));

    if (existsRoles) return true;

    return false;
  }
}
export default EnsureUserRole;
