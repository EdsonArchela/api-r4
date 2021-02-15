import { inject, injectable } from 'tsyringe';
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

    const userRoles = user?.roles.map(role => role.name);

    const existsRoles = userRoles?.some(r => roles.includes(r));

    if (existsRoles) return true;

    return false;
  }
}
export default EnsureUserRole;
