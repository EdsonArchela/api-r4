import { inject, injectable } from 'tsyringe';
import IOrganizationsRepository from '../../organizations/repositories/IOrganizationsRepository';
import IPeoplesRepository from '../../people/repositories/IPeoplesRepository';
import IDealsRepository from '../repositories/IDealsRepository';

@injectable()
export default class ListUserDealsService {
  constructor(
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('PeoplesRepository')
    private peoplesRepository: IPeoplesRepository,
  ) {}

  public async execute(id: string): Promise<any[]> {
    const deals = await this.dealsRepository.findByUserId(id);

    const org = await this.organizationsRepository.findByListOfAgendorIds(
      deals.map(item => item.agendorOrganizationId || ''),
    );

    const people = await this.peoplesRepository.findByListOfAgendorIds(
      deals.map(item => item.agendorPeopleId || ''),
    );

    console.log(people);

    // if (!org) throw new AppError('Falha ao encontrar empresa');
    const org_deals = deals.map(deal => ({
      ...deal,
      people: people.find(item => deal.agendorPeopleId === item.agendor_id),
      organization: org.find(
        item => deal.agendorOrganizationId === item.agendor_id,
      ),
    }));
    return org_deals;
  }
}
