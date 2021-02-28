import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import permissionRouter from '@modules/users/infra/http/routes/permissions.routes';
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import dealsRouter from '@modules/deals/infra/http/routes/deals.routes';
import partnersRouter from '@modules/users/infra/http/routes/partners.routes';
import organizationRouter from '../../../../modules/organizations/infra/http/routes/organization.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/partners', partnersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/permissions', permissionRouter);
routes.use('/organizations', organizationRouter);
routes.use('/roles', rolesRouter);
routes.use('/deals', dealsRouter);

export default routes;
