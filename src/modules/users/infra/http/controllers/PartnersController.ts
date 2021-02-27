import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePartnerService from '../../../services/CreatePartnerService';

export default class PartnersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const user = request.user.id;

    const createPartnerService = container.resolve(CreatePartnerService);

    const partner = await createPartnerService.execute({ ...data, user });

    return response.json(classToClass(partner));
  }
}
