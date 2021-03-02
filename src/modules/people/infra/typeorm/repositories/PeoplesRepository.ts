import { getRepository, In, Repository } from 'typeorm';
import IPeopleDTO from '../../../dtos/IPeopleDTO';
import IPeoplesRepository from '../../../repositories/IPeoplesRepository';
import People from '../entities/People';

export default class PeoplesRepository implements IPeoplesRepository {
  private ormRepository: Repository<People>;

  constructor() {
    this.ormRepository = getRepository(People);
  }

  public async create(data: IPeopleDTO): Promise<People> {
    console.log('PeoplesRepository', data);
    const people = this.ormRepository.create(data);

    await this.ormRepository.save(people);
    return people;
  }

  public async findByUserId(id: string): Promise<People | undefined> {
    const people = await this.ormRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.ownerUser', 'ownerUser')
      .where('ownerUser.id = :userId', { userId: id })
      .execute();
    return people;
  }

  public async findByListOfAgendorIds(ids: string[]): Promise<People[]> {
    const peoples = await this.ormRepository.find({
      where: { agendor_id: In(ids) },
    });
    return peoples;
  }

  public async findByAgendorId(id: string): Promise<People | undefined> {
    const organization = await this.ormRepository.findOne({
      where: { agendor_id: id },
    });
    return organization;
  }
}
