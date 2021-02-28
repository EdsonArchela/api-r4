import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDealService from '../../../services/CreateDealService';
import ListAllDealsService from '../../../services/ListDeasService';
import SimulateDealService from '../../../services/SimulateDealService';

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
}
