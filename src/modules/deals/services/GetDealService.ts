import { injectable, inject } from 'tsyringe';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';

@injectable()
export default class GetDealService {
  constructor(
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,
  ) {}

  public async execute(id: string): Promise<Deal | undefined> {
    const deal = await this.dealsRepository.findById(id);

    return deal;
  }
}
