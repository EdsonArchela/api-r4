import Partner from '../../users/infra/typeorm/entities/Partners';
import User from '../../users/infra/typeorm/entities/User';

export default interface IOrganizationDTO {
  ownerUser: User;
  partner?: Partner;
  agendor_id: string;
  name: string;
  cnpj: string;
  email?: string;
  description?: string;
  website?: string;
  _webUrl?: string;
  link?: string;
}
