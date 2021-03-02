import IPeopleDTO from '../dtos/IPeopleDTO';
import People from '../infra/typeorm/entities/People';

export default interface IPeoplesRepository {
  create(data: IPeopleDTO): Promise<People>;
  findByUserId(id: string): Promise<People | undefined>;
  findByAgendorId(id: string): Promise<People | undefined>;
}
