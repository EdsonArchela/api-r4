import Partner from '../../users/infra/typeorm/entities/Partners';
import User from '../../users/infra/typeorm/entities/User';

export default interface ICreateUserDTO {
  user?: User | Partner;
  advisorId: string;
  agendorOrganizationId: string;
  partnerId?: string;
  operationType: string;
  bank: string;
  currency: string;
  direction: boolean;
  flow: string;
  value: number;
  assFee: number;
  r4Fee: number;
  contract: number;
  spread: number;
  cet: number;
  iof: number;
  ptax1: number;
  ptax2: number;
  ir: number;
  contractDiscount: number;
  darf?: number;
  partner: number;
  broker: number;
}
