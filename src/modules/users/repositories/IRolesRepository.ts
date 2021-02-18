import IRolesDTO from '../dtos/IRolesDTO';
import Roles from '../infra/typeorm/entities/Roles';

export default interface IRolesRepository {
  create(data: IRolesDTO): Promise<Roles>;
  save(data: Roles): Promise<Roles>;
  findByName(name: string): Promise<Roles | undefined>;
  findThose(ids: string[]): Promise<Roles[] | undefined>;
  findAll(): Promise<Roles[]>;
}
