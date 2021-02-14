import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
