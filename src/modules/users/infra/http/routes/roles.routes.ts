import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import RolesController from '../controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.post(
  '/',
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
