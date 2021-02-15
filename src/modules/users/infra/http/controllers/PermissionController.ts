import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePermissionService from '../../../services/CreatePermissionService';

class PermissionController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const permissionService = container.resolve(CreatePermissionService);

    const permission = await permissionService.execute({ name, description });

    return response.json(permission);
  }
}
export default PermissionController;
