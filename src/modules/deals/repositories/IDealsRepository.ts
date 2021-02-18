import ICreateDealDTO from '../dtos/ICreateDealDTO';
import Deal from '../infra/typeorm/entities/Deal';

export default interface IDealsRepository {
  create(data: ICreateDealDTO): Promise<Deal>;
}
