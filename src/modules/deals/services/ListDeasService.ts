import { inject, injectable } from 'tsyringe';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';

@injectable()
export default class ListAllDealsService {
  constructor(
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,
  ) {}

  public async execute(): Promise<Deal[]> {
    const deals = await this.dealsRepository.findAll();

    return deals;
  }
}
