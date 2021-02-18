import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import GetUsersOrganizationService from '../../../services/GetUsersOrganizationService';
import UpdateUserService from '../../../services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, comission, roles } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      comission,
      roles,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, comission, roles } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      name,
      email,
      password,
      comission,
      roles,
    });

    return response.json(classToClass(user));
  }

  public async getOrganization(
    request: Request,
    response: Response,
  ): Promise<Response> {
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
