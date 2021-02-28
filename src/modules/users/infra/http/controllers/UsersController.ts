import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import ResetPasswordService from '../../../services/ResetPasswordService';

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

  public async changePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, email } = request.body;

    const updatePassword = container.resolve(ResetPasswordService);

    await updatePassword.execute({
      email,
      password,
      user_id: request.user.id,
    });

    return response.status(200).json();
  }
}
