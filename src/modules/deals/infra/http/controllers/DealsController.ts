import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDealService from '../../../services/CreateDealService';
import DeleteFileService from '../../../services/DeleteFileService';
import DownloadFileService from '../../../services/DownloadFileService';
import GetDealService from '../../../services/GetDealService';
import ListAllDealsService from '../../../services/ListDeasService';
import ListUserDealsService from '../../../services/ListUserDealsService';
import SimulateDealService from '../../../services/SimulateDealService';
import UploadFilesService from '../../../services/UploadFilesService';

export default class DealsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createDealService = container.resolve(CreateDealService);

    const deal = await createDealService.execute({
      ...data,
      user_id: request.user.id,
    });

    return response.json(deal);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllDealsService = container.resolve(ListAllDealsService);
    const deals = await listAllDealsService.execute();
    return response.json(deals);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getDealService = container.resolve(GetDealService);
    const deal = await getDealService.execute(id);
    return response.json(deal);
  }

  public async getUserDeals(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userId = request.user.id;
    const listUserDealsService = container.resolve(ListUserDealsService);
    const deals = await listUserDealsService.execute(userId);

    return response.json(deals);
  }

  public async simulate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const data = request.body;

    const simulateDealService = container.resolve(SimulateDealService);

    const result = await simulateDealService.execute({
      ...data,
      user_id: request.user.id,
    });

    return response.json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { dealId } = request.body;
    const files = request.files as {
      invoice: Express.Multer.File[];
      contractDocumment: Express.Multer.File[];
      swift: Express.Multer.File[];
    };

    const uploadFiles = container.resolve(UploadFilesService);

    const updatedDeal = await uploadFiles.execute(
      request.user.id,
      dealId,
      files,
    );

    return response.json(updatedDeal);
  }

  public async getDownloadLink(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { dealId, fileName } = request.query as {
      dealId: string;
      fileName: string;
    };

    const downloadFiles = container.resolve(DownloadFileService);
    const link = await downloadFiles.execute({
      userId: request.user.id,
      dealId,
      fileName,
    });

    return response.json(link);
  }

  public async deleteFile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { dealId, fileName, folderType } = request.query as {
      dealId: string;
      fileName: string;
      folderType: 'contract' | 'invoice' | 'swift';
    };

    const deleteService = container.resolve(DeleteFileService);

    const deal = await deleteService.execute({
      userId: request.user.id,
      dealId,
      fileName,
      folderType,
    });
    return response.json(deal);
  }
}
