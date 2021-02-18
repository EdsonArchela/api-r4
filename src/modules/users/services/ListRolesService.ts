import { inject, injectable } from 'tsyringe';
import Roles from '../infra/typeorm/entities/Roles';
import IRolesRepository from '../repositories/IRolesRepository';

@injectable()
export default class ListRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute(): Promise<Roles[]> {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }
}
