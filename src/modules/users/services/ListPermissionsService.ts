import { inject, injectable } from 'tsyringe';
import Permission from '../infra/typeorm/entities/Permissions';
import IPermissionRepository from '../repositories/IPermissionRepository';

@injectable()
export default class ListPermissionsService {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository,
  ) {}
  public async execute(): Promise<Permission[]> {
    const permissions = await this.permissionRepository.findAll();
    return permissions;
  }
}
