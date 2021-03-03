import { getRepository, Repository } from 'typeorm';
import IBankDTO from '../../../dtos/IBankDTO';
import IBanksRepository from '../../../repositories/IBanksRepository';
import Bank from '../entities/Bank';

export default class BanksRepository implements IBanksRepository {
  private ormRepository: Repository<Bank>;

  constructor() {
    this.ormRepository = getRepository(Bank);
  }

  public async create(data: IBankDTO): Promise<Bank> {
    const bank = this.ormRepository.create(data);

    await this.ormRepository.save(bank);

    return bank;
  }

  public async findByIban(iban: string): Promise<Bank | undefined> {
    const bank = await this.ormRepository.findOne({ where: { iban: iban } });
    return bank;
  }
}
