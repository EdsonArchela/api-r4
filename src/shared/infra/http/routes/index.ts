import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import permissionRouter from '@modules/users/infra/http/routes/permissions.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import dealsRouter from '@modules/deals/infra/http/routes/deals.routes';
import partnersRouter from '@modules/users/infra/http/routes/partners.routes';
import organizationRouter from '@modules/organizations/infra/http/routes/organization.routes';
import peopleRouter from '@modules/people/infra/http/routes/people.routes';
import bankRouter from '@modules/banks/infra/http/routes/bank.routes';
import enterprisesRouter from '@modules/clients/infra/http/routes/enterprises.routes';

const routes = Router();

routes.use('/clients', enterprisesRouter);
routes.use('/users', usersRouter);
routes.use('/partners', partnersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/permissions', permissionRouter);
routes.use('/organizations', organizationRouter);
routes.use('/peoples', peopleRouter);
routes.use('/roles', rolesRouter);
routes.use('/deals', dealsRouter);
routes.use('/banks', bankRouter);

export default routes;
