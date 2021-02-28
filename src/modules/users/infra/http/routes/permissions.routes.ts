import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PermissionController from '../controllers/PermissionController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import is from '../middlewares/permissions';

const permissionRouter = Router();
const permissionController = new PermissionController();

permissionRouter.use(ensureAuthenticated);

permissionRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  permissionController.create,
);

permissionRouter.get(
  '/',
  is(['ROLE_ADMIN', 'ROLE_CONSELHO']),
  permissionController.index,
);

export default permissionRouter;
