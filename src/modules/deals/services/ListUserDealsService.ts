import { delay, inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Organization from '../../organizations/infra/typeorm/entities/Organization';
import IOrganizationsRepository from '../../organizations/repositories/IOrganizationsRepository';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';

@injectable()
export default class ListUserDealsService {
  constructor(
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  public async execute(id: string): Promise<any[]> {
    const deals = await this.dealsRepository.findByUserId(id);
    const org = await this.organizationsRepository.findByListOfAgendorIds(
      deals.map(item => item.agendorOrganizationId),
    );
    if (!org) throw new AppError('Falha ao encontrar empresa');
    const org_deals = deals.map(deal => ({
      ...deal,
      organization: org.find(
        item => deal.agendorOrganizationId === item.agendor_id,
      ),
    }));
    return org_deals;
  }
}
