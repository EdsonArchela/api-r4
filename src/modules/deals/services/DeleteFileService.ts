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
  folderType: 'contract' | 'invoice' | 'swift';
}

@injectable()
export default class DeleteFileService {
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
    folderType,
  }: IRequest): Promise<Deal> {
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

      await this.storageProvider.deleteFile(filePath);
    } else {
      await this.storageProvider.deleteFile(fileName);
    }

    let files: string[] | undefined;
    let newFileList: string[] = [];
    let newDeal;
    switch (folderType) {
      case 'contract':
        files = deal.contractDocumment?.split('|');
        if (!files) throw new AppError('No files to delete');
        newFileList = files.filter(file => file !== fileName);
        newDeal = this.dealsRepository.save({
          ...deal,
          contractDocumment: newFileList.join('|'),
        });
        break;
      case 'swift':
        files = deal.swift?.split('|');
        if (!files) throw new AppError('No files to delete');
        newFileList = files.filter(file => file !== fileName);
        newDeal = this.dealsRepository.save({
          ...deal,
          swift: newFileList.join('|'),
        });
        break;
      default:
        files = deal.invoice?.split('|');
        if (!files) throw new AppError('No files to delete');
        newFileList = files.filter(file => file !== fileName);
        newDeal = this.dealsRepository.save({
          ...deal,
          invoice: newFileList.join('|'),
        });
        break;
    }
    return newDeal;
  }
}
