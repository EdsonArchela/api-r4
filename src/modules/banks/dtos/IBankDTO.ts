import { Organization } from 'aws-sdk/clients/organizations';
import { DeepPartial } from 'typeorm';
import People from '../../people/infra/typeorm/entities/People';

export default interface IBankDTO {
  agendorId: string;

  name: 'Travelex' | 'Ourinvest' | 'Frente';

  bankNumber: string;

  agency: string;

  account: string;

  iban: string;
}
