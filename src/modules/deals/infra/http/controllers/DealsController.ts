import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDealService from '../../../services/CreateDealService';

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
}
