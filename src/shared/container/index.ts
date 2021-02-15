import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IPermissionRepository from '../../modules/users/repositories/IPermissionRepository';
import PermissionRepository from '../../modules/users/infra/typeorm/repositories/PermisionRepository';
import IRolesRepository from '../../modules/users/repositories/IRolesRepository';
import RolesRepository from '../../modules/users/infra/typeorm/repositories/RolesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPermissionRepository>(
  'PermissionRepository',
  PermissionRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);
