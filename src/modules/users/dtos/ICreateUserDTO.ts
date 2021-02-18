import Roles from '../infra/typeorm/entities/Roles';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  comission?: number;
  roles?: Roles[];
  agendor_id: string;
}
