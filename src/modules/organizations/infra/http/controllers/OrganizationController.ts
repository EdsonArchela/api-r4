import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetUsersOrganizationService from '../../../serivces/GetUsersOrganizationService';

export default class OrganizationController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, cnpj } = request.query;
    const getUsersOrganizationService = container.resolve(
      GetUsersOrganizationService,
    );

    const organizations = await getUsersOrganizationService.execute(
      request.user.id,
      name as string,
      cnpj as string,
    );

    return response.json(organizations);
  }
}
