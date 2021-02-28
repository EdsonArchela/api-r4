import { Repository, getRepository } from 'typeorm';
import IOrganizationDTO from '../../../dtos/IOrganizationDTO';
import IOrganizationsRepository from '../../../repositories/IOrganizationsRepository';
import Organization from '../entities/Organization';

export default class OrganizationsRepository
  implements IOrganizationsRepository {
  private ormRepository: Repository<Organization>;

  constructor() {
    this.ormRepository = getRepository(Organization);
  }
  findByEmail(email: string): Promise<Organization | undefined> {
    throw new Error('Method not implemented.');
  }

  public async create(data: IOrganizationDTO): Promise<Organization> {
    const organization = this.ormRepository.create(data);

    await this.ormRepository.save(organization);
    return organization;
  }

  public async save(organization: Organization): Promise<Organization> {
    return this.ormRepository.save(organization);
  }

  public async findByUserId(id: string): Promise<Organization | undefined> {
    const organization = await this.ormRepository
      .createQueryBuilder('org')
      .leftJoinAndSelect('org.ownerUser', 'ownerUser')
      .where('ownerUser.id = :userId', { userId: id })
      .execute();
    console.log(organization);
    return organization;
  }

  public async findByAgendorId(id: string): Promise<Organization | undefined> {
    const organization = await this.ormRepository.findOne({
      where: { agendor_id: id },
    });
    return organization;
  }

  public async findById(id: string): Promise<Organization | undefined> {
    const organization = await this.ormRepository.findOne(id);
    return organization;
  }
}
