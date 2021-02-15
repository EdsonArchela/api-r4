import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRolesService from '../../../services/CreateRolesService';

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
}
export default RolesController;
