import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import Partner from '../infra/typeorm/entities/Partners';
import IPartnerDTO from '../dtos/IPartnerDTO';

export default interface IPartnersRepository {
  create(data: IPartnerDTO): Promise<Partner>;
  findById(id: string): Promise<Partner | undefined>;
}
