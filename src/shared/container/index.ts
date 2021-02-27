import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IPermissionRepository from '@modules/users/repositories/IPermissionRepository';
import PermissionRepository from '@modules/users/infra/typeorm/repositories/PermisionRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';
import IDealsRepository from '@modules/deals/repositories/IDealsRepository';
import DealsRepository from '@modules/deals/infra/typeorm/repositories/DealsRepository';
import PartnersRepository from '@modules/users/infra/typeorm/repositories/PartnersRepository';
import IPartnersRepository from '@modules/users/repositories/IPartnersRepository';
import IOrganizationsRepository from '@modules/organizations/repositories/IOrganizationsRepository';
import OrganizationsRepository from '@modules/organizations/infra/typeorm/repositories/OrganizationsRepository';

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

container.registerSingleton<IDealsRepository>(
  'DealsRepository',
  DealsRepository,
);

container.registerSingleton<IPartnersRepository>(
  'PartnersRepository',
  PartnersRepository,
);

container.registerSingleton<IOrganizationsRepository>(
  'OrganizationsRepository',
  OrganizationsRepository,
);
