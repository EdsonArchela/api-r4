import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../users/providers/HashProvider/models/IHashProvider';
import Enterprise from '../infra/typeorm/clients/entities/Enterprise';
import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

@injectable()
export default class AuthenticateEnterpriseService {
  constructor(
    @inject('EnterprisesRepository')
    private enterpriseRepository: IEnterprisesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    documment,
    password,
  }: {
    documment: string;
    password: string;
  }): Promise<{ enterprise: Enterprise; token: string }> {
    const enterprise = await this.enterpriseRepository.findByDocumment(
      documment,
    );

    if (!enterprise)
      throw new AppError('CNPJ ou senha informados incorretamente', 401);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      enterprise.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ cnpj: enterprise.documment }, secret, {
      subject: enterprise.id,
      expiresIn,
    });

    return {
      enterprise,
      token,
    };
  }
}
