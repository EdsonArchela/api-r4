import { inject, injectable } from 'tsyringe';
import agendor_api from '../../../services/agendor_api';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../users/providers/HashProvider/models/IHashProvider';
import { UsersList } from '../../users/services/CreateUserService';
import Enterprise from '../infra/typeorm/clients/entities/Enterprise';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

interface Request {
  documment: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    documment,
    email,
    password,
  }: Request): Promise<Enterprise> {
    const isUser = await this.enterprisesRepository.findByDocumment(documment);
    if (isUser) {
      throw new AppError(
        'Empresa já possui cadastro. Contate seu assessor de câmbio',
      );
    }

    let agendorId;
    try {
      const agendorsEnterprise: UsersList = await agendor_api.get(
        'organizations',
        { params: { cnpj: documment } },
      );
      agendorId = agendorsEnterprise.data.data.pop();
    } catch (err) {
      console.log('Comunication With Agendor:', err);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const enterprise = await this.enterprisesRepository.create({
      email,
      password: hashedPassword,
      documment,
      agendor_id: agendorId?.id,
    });

    return enterprise;
  }
}
