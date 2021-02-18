import { getRepository, Repository } from 'typeorm';
import IRolesDTO from '../../../dtos/IRolesDTO';
import IRolesRepository from '../../../repositories/IRolesRepository';

import Roles from '../entities/Roles';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Roles>;

  constructor() {
    this.ormRepository = getRepository(Roles);
  }

  public async create({
    name,
    description,
    permissions,
  }: IRolesDTO): Promise<Roles> {
    const roles = this.ormRepository.create({ name, description, permissions });
    await this.ormRepository.save(roles);
    return roles;
  }

  public async save(data: Roles): Promise<Roles> {
    return this.ormRepository.save(data);
  }

  public async findAll(): Promise<Roles[]> {
    return await this.ormRepository.find();
  }

  public async findByName(name: string): Promise<Roles | undefined> {
    return await this.ormRepository.findOne({ where: { name } });
  }

  public async findThose(ids: string[]): Promise<Roles[] | undefined> {
    const exists = await this.ormRepository.findByIds(ids);
    return exists;
  }
}

export default RolesRepository;
