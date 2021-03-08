import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IBanksRepository from '../repositories/IBanksRepository';

interface IRequest {
  ownerUser: { id: string; who: 'org' | 'people' };

  name: 'Travelex' | 'Ourinvest' | 'Frente';

  bankNumber: string;

  agency: string;

  account: string;

  iban: string;
}

@injectable()
export default class CreateBankService {
  constructor(
    @inject('BanksRepository')
    private banksRepository: IBanksRepository,
  ) {}
  public async execute(data: IRequest) {
    let bank = await this.banksRepository.findByIban(data.iban);
    if (bank) throw new AppError('Banco já cadastrado.');

    bank = await this.banksRepository.create({
      account: data.account,
      agency: data.agency,
      bankNumber: data.bankNumber,
      iban: data.iban,
      name: data.name,
      agendorId: data.ownerUser.id,
    });

    return bank;
  }
}
