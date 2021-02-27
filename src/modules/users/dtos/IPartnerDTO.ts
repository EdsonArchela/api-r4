import Roles from '../infra/typeorm/entities/Roles';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from './ICreateUserDTO';

export default interface IPartnerDTO extends ICreateUserDTO {
  user: User;
  operationFee: number;
  indicationFee: number;
  phone?: string;
  description?: string;
}
