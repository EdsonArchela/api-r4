import IPermissionDTO from '../dtos/IPermissionDTO';
import Permission from '../infra/typeorm/entities/Permissions';

export default interface IPermissionRepository {
  create(data: IPermissionDTO): Promise<Permission>;
  save(data: Permission): Promise<Permission>;
  findByName(name: string): Promise<Permission | undefined>;
  findThose(ids: string[]): Promise<Permission[] | undefined>;
  findAll(): Promise<Permission[]>;
}
