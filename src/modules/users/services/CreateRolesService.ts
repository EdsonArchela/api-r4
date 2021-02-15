import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Roles from '../infra/typeorm/entities/Roles';
import IPermissionRepository from '../repositories/IPermissionRepository';
import IRolesRepository from '../repositories/IRolesRepository';

interface IRequest {
  name: string;
  description: string;
  permissions: string[];
}
@injectable()
class CreateRolesService {
  constructor(
    @inject('RolesRepository')
    private RolesRepository: IRolesRepository,
    @inject('PermissionRepository')
    private PermissionRepository: IPermissionRepository,
  ) {}

  public async execute({
    name,
    description,
    permissions,
  }: IRequest): Promise<Roles> {
    const existRoles = await this.RolesRepository.findByName(name);

    if (existRoles) throw new AppError('Role já cadastrado');

    const existsPermissions = await this.PermissionRepository.findThose(
      permissions,
    );

    if (!existsPermissions)
      throw new AppError('Não pude encontrar sua permissão');

    const roles = await this.RolesRepository.create({
      name,
      description,
      permissions: existsPermissions,
    });

    return roles;
  }
}

export default CreateRolesService;
