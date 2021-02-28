import { getRepository, Repository } from 'typeorm';
import ICreateDealDTO from '../../../dtos/ICreateDealDTO';
import IDealsRepository from '../../../repositories/IDealsRepository';
import Deal from '../entities/Deal';

export default class DealsRepository implements IDealsRepository {
  private ormRepository: Repository<Deal>;

  constructor() {
    this.ormRepository = getRepository(Deal);
  }

  public async create(data: ICreateDealDTO): Promise<Deal> {
    const deal = this.ormRepository.create(data);

    await this.ormRepository.save(deal);

    return deal;
  }

  public async findAll(): Promise<Deal[]> {
    const deals = await this.ormRepository.find();
    return deals;
  }

  public async findByUserId(userId: string): Promise<Deal[]> {
    const deals = await this.ormRepository.find({
      where: { advisorId: userId },
    });
    return deals;
  }
}
