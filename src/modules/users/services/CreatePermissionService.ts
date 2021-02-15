import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Permission from '../infra/typeorm/entities/Permissions';
import IPermissionRepository from '../repositories/IPermissionRepository';

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}

  public async execute({
    name,
    description,
  }: {
    name: string;
    description: string;
  }): Promise<Permission> {
    const existPermission = await this.permissionRepository.findByName(name);

    if (existPermission) throw new AppError('Permissão já cadastrada');

    const permission = await this.permissionRepository.create({
      name,
      description,
    });

    return permission;
  }
}

export default CreatePermissionService;
