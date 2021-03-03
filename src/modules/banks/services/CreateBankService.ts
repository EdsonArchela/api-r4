import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import IBanksRepository from '../repositories/IBanksRepository';

interface IRequest {
  userId: string;

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

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(data: IRequest) {
    const user = await this.usersRepository.findById(data.userId);
    if (!user) throw new AppError('Usuário não encontrado');

    let bank = await this.banksRepository.findByIban(data.iban);
    if (bank) throw new AppError('Banco já cadastrado.');

    bank = await this.banksRepository.create({
      account: data.account,
      agency: data.agency,
      bankNumber: data.bankNumber,
      iban: data.iban,
      name: data.name,
      ownerUser: user,
    });

    return bank;
  }
}
