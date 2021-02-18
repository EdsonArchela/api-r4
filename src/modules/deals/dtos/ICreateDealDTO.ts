export default interface ICreateUserDTO {
  deal_id: string;
  user_id: string;
  ownnerId: string;
  agendorOrganizationId: string;
  a_email: string;
  operationType: string;
  bank: string;
  currency: string;
  direction: string;
  flow: string;
  value: number;
  assFee: number;
  r4Fee: number;
  contract: number;
  cet: number;
}
