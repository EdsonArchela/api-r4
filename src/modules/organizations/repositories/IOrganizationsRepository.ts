import IOrganizationDTO from '../dtos/IOrganizationDTO';
import Organization from '../infra/typeorm/entities/Organization';

export default interface IOrganizationsRepository {
  create(data: IOrganizationDTO): Promise<Organization>;
  save(data: Organization): Promise<Organization>;
  findById(id: string): Promise<Organization | undefined>;
  findByAgendorId(id: string): Promise<Organization | undefined>;
  findByUserId(id: string): Promise<Organization | undefined>;
}
