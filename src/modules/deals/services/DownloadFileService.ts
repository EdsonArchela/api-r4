import { inject, injectable } from 'tsyringe';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';

interface IRequest {
  userId: string;
  dealId: string;
  fileName: string;
}

@injectable()
export default class DownloadFileService {
  constructor(
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    dealId,
    fileName,
  }: IRequest): Promise<string> {
    const user = await this.usersRepository.findById(userId);
    if (!user)
      throw new AppError(
        'Não foi possível encontrar o usuário responsável pela transação.',
      );

    const deal = await this.dealsRepository.findById(dealId);
    if (!deal) throw new AppError('Não foi possível encontrar a transação.');

    if (process.env.STORAGE_DRIVER === 'disk') {
      let filePath = `${userId}/${dealId}`;
      switch (fileName) {
        case deal.contractDocumment:
          filePath += `/contract/${fileName}`;
          break;
        case deal.swift:
          filePath += `/swift/${fileName}`;
          break;
        default:
          filePath += `/invoice/${fileName}`;
          break;
      }

      const link = await this.storageProvider.getDownloadLink(filePath);
      return link;
    } else {
      const link = await this.storageProvider.getDownloadLink(fileName);
      return link;
    }
  }
}
