import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRolesService from '../../../services/CreateRolesService';
import ListRolesService from '../../../services/ListRolesService';

class RolesController {
  async create(request: Request, response: Response) {
    const { name, description, permissions } = request.body;

    const rolesService = container.resolve(CreateRolesService);

    const roles = await rolesService.execute({
      name,
      description,
      permissions,
    });

    return response.json(roles);
  }

  public async index(request: Request, response: Response) {
    const rolesService = container.resolve(ListRolesService);

    const permissions = await rolesService.execute();

    return response.json(permissions);
  }
}
export default RolesController;
