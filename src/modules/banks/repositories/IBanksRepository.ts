import IBankDTO from '../dtos/IBankDTO';
import Bank from '../infra/typeorm/entities/Bank';

export default interface IBanksRepository {
  create(data: IBankDTO): Promise<Bank>;
  findByIban(iban: string): Promise<Bank | undefined>;
}
