import { inject, injectable } from 'tsyringe';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import Deal from '../infra/typeorm/entities/Deal';
import IDealsRepository from '../repositories/IDealsRepository';

@injectable()
export default class UploadFilesService {
  constructor(
    @inject('DealsRepository')
    private dealsRepository: IDealsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    userId: string,
    dealId: string,
    files: {
      invoice?: Express.Multer.File[];
      contractDocumment?: Express.Multer.File[];
      swift?: Express.Multer.File[];
    },
  ): Promise<Deal> {
    const user = await this.usersRepository.findById(userId);
    if (!user)
      throw new AppError(
        'Não foi possível encontrar o usuário responsável pela transação.',
      );

    const deal = await this.dealsRepository.findById(dealId);
    if (!deal) throw new AppError('Não foi possível encontrar a transação.');

    let invoiceFilesNames;
    if (files.invoice)
      invoiceFilesNames = await this.storageProvider.saveFiles(
        files.invoice.map(file => file.filename),
        `${userId}/${dealId}/invoice`,
      );
    let contractFileName;
    if (files.contractDocumment)
      contractFileName = await this.storageProvider.saveFile(
        files.contractDocumment[0].filename,
        `${userId}/${dealId}/contract`,
      );
    let swiftFileName;
    if (files.swift)
      swiftFileName = await this.storageProvider.saveFile(
        files.swift[0].filename,
        `${userId}/${dealId}/swift`,
      );

    const updatedDeal = await this.dealsRepository.save({
      ...deal,
      contractDocumment: contractFileName || deal.contractDocumment,
      swift: swiftFileName || deal.swift,
      invoice: invoiceFilesNames?.join('|') || deal.invoice,
    });

    return updatedDeal;
  }
}
