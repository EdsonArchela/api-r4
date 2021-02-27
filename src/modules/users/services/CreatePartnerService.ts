import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Partner from '../infra/typeorm/entities/Partners';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IPartnersRepository from '../repositories/IPartnersRepository';
import IRolesRepository from '../repositories/IRolesRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  comission?: number;
  roles: string[];
  user: string;
  operationFee: number;
  indicationFee: number;
  phone?: string;
  description?: string;
}

@injectable()
export default class CreatePartnerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PartnersRepository')
    private partnerRepository: IPartnersRepository,

    @inject('RolesRepository')
    private RolesRepository: IRolesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<Partner> {
    const ownerUser = await this.usersRepository.findById(data.user);
    if (!ownerUser) throw new AppError('Assessor não encontrado');

    const existsRoles = await this.RolesRepository.findThose(data.roles);
    if (!existsRoles) throw new AppError('Não pude encontrar seu Role');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const partner = await this.partnerRepository.create({
      email: data.email,
      indicationFee: data.indicationFee,
      name: data.name,
      password: hashedPassword,
      user: ownerUser,
      operationFee: data.operationFee,
      description: data.description,
      phone: data.phone,
    });

    return partner;
  }
}
