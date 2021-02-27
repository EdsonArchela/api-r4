import { Repository, getRepository } from 'typeorm';
import IPartnerDTO from '../../../dtos/IPartnerDTO';
import IPartnersRepository from '../../../repositories/IPartnersRepository';
import Partner from '../entities/Partners';

export default class PartnersRepository implements IPartnersRepository {
  private ormRepository: Repository<Partner>;

  constructor() {
    this.ormRepository = getRepository(Partner);
  }

  public async create(data: IPartnerDTO): Promise<Partner> {
    const partner = this.ormRepository.create(data);

    await this.ormRepository.save(partner);

    return partner;
  }

  public async findById(id: string): Promise<Partner | undefined> {
    const partner = this.ormRepository.findOne(id);

    return partner;
  }
}
