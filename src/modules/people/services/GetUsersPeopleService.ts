import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import IPeoplesRepository from '../repositories/IPeoplesRepository';

@injectable()
export default class GetUsersPeopleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PeoplesRepository')
    private peoplesRepository: IPeoplesRepository,
  ) {}

  public async execute(id: string, name: string, cpf: string): Promise<void> {
    const people = await this.peoplesRepository.findByUserId(id);

    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuário não encontrado');

    if (!name && !cpf)
      throw new AppError('Digite um nome ou cnpj para a procura');

    const { data } = await agendor_api.get(
      `/people?${
        user.agendor_id ? `userOwner=${user.agendor_id}&` : ''
      }per_page=100&${name ? `name=${name}` : `cpf=${cpf}`}`,
    );

    return { ...data, partner: people?.partner };
  }
}
