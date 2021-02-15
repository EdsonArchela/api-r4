import { getRepository, Repository } from 'typeorm';

import IPermissionDTO from '../../../dtos/IPermissionDTO';
import IPermissionRepository from '../../../repositories/IPermissionRepository';
import Permission from '../entities/Permissions';

class PermissionRepository implements IPermissionRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }
  public async create({
    name,
    description,
  }: IPermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({ name, description });
    await this.ormRepository.save(permission);
    return permission;
  }

  public async save(data: Permission): Promise<Permission> {
    return this.ormRepository.save(data);
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    return await this.ormRepository.findOne({ where: { name } });
  }

  public async findThose(ids: string[]): Promise<Permission[] | undefined> {
    const exists = await this.ormRepository.findByIds(ids);
    return exists;
  }
}

export default PermissionRepository;
