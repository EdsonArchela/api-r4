export default interface IAgendorResponse {
  accountId: number;
  name: string;
  email: string;
  cnpj: string;
  description: string;
  website: string;
  _webUrl: string;
  ownerUser: { id: number };
}
