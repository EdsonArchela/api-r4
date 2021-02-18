import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePermissionService from '../../../services/CreatePermissionService';
import ListPermissionsService from '../../../services/ListPermissionsService';

class PermissionController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const permissionService = container.resolve(CreatePermissionService);

    const permission = await permissionService.execute({ name, description });

    return response.json(permission);
  }

  public async index(request: Request, response: Response) {
    const permissionsService = container.resolve(ListPermissionsService);

    const permissions = await permissionsService.execute();

    return response.json(permissions);
  }
}
export default PermissionController;
