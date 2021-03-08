import { inject, injectable } from 'tsyringe';
import IBanksRepository from '../repositories/IBanksRepository';

@injectable()
export default class ReadBankService {
  constructor(
    @inject('BanksRepository')
    private banksRepository: IBanksRepository,
  ) {}

  public async execute(bankId: string) {
    const bank = await this.banksRepository.findById(bankId);

    return bank;
  }
}
