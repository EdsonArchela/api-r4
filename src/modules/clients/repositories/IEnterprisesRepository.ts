import ICreateEnterpriseDTO from '../dtos/ICreateEnterpriseDTO';
import Enterprise from '../infra/typeorm/clients/entities/Enterprise';

export default interface IEnterprisesRepository {
  create(data: ICreateEnterpriseDTO): Promise<Enterprise>;
  findByDocumment(cnpj: string): Promise<Enterprise | undefined>;
}
