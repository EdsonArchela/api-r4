import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import permissionRouter from '../../../../modules/users/infra/http/routes/permissions.routes';
import rolesRouter from '../../../../modules/users/infra/http/routes/roles.routes';
import dealsRouter from '../../../../modules/deals/infra/http/routes/deals.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/permissions', permissionRouter);
routes.use('/roles', rolesRouter);
routes.use('/deals', dealsRouter);

export default routes;
