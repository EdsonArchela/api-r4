import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetUsersPeopleService from '../../../services/GetUsersPeopleService';

export default class PeopleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = request.query;
    const getUsersPeopleService = container.resolve(GetUsersPeopleService);

    const peoples = await getUsersPeopleService.execute(
      request.user.id,
      name as string,
      cpf as string,
    );

    return response.json(peoples);
  }
}
