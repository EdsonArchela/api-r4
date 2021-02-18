import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import RolesController from '../controllers/RolesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import is from '../middlewares/permissions';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.use(ensureAuthenticated);

rolesRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      permissions: Joi.array().items(Joi.string()),
    },
  }),
  rolesController.create,
);

rolesRouter.get('/', rolesController.index);

export default rolesRouter;
