import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

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
import IPeoplesRepository from '@modules/people/repositories/IPeoplesRepository';
import PeoplesRepository from '@modules/people/infra/typeorm/repositories/PeoplesRepository';
import IBanksRepository from '@modules/banks/repositories/IBanksRepository';
import BanksRepository from '@modules/banks/infra/typeorm/repositories/BanksRepository';
import IEnterprisesRepository from '@modules/clients/repositories/IEnterprisesRepository';
import EnterprisesRepository from '@modules/clients/infra/typeorm/repositories/EnterprisesRepository';

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

container.registerSingleton<IPeoplesRepository>(
  'PeoplesRepository',
  PeoplesRepository,
);

container.registerSingleton<IBanksRepository>(
  'BanksRepository',
  BanksRepository,
);

container.registerSingleton<IEnterprisesRepository>(
  'EnterprisesRepository',
  EnterprisesRepository,
);
