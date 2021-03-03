import User from '../../users/infra/typeorm/entities/User';

export default interface IBankDTO {
  ownerUser: User;

  name: 'Travelex' | 'Ourinvest' | 'Frente';

  bankNumber: string;

  agency: string;

  account: string;

  iban: string;
}
