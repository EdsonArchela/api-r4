import { getRepository, Repository } from 'typeorm';
import ICreateEnterpriseDTO from '../../../dtos/ICreateEnterpriseDTO';
import IEnterprisesRepository from '../../../repositories/IEnterprisesRepository';
import Enterprise from '../clients/entities/Enterprise';

export default class EnterprisesRepository implements IEnterprisesRepository {
  private ormRepository: Repository<Enterprise>;

  constructor() {
    this.ormRepository = getRepository(Enterprise, 'clients');
  }

  public async create(data: ICreateEnterpriseDTO): Promise<Enterprise> {
    const enterprise = this.ormRepository.create(data);

    await this.ormRepository.save(enterprise);

    return enterprise;
  }

  public async findByDocumment(cnpj: string): Promise<Enterprise | undefined> {
    const enterprise = await this.ormRepository.findOne({
      where: { documment: cnpj },
    });
    return enterprise;
  }
}
