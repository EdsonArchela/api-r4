import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../../../shared/errors/AppError';
import EnsureUserRole from '../../../services/EnsureUserRole';
export default function is(roles: string[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const userRoleService = container.resolve(EnsureUserRole);

    const hasRole = await userRoleService.execute({
      id: request.user.id,
      roles,
    });

    if (!hasRole) throw new AppError('Usuário não possui assesso.', 401);

    return next();
  };
}
