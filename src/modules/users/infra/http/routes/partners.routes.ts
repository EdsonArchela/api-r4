import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import PartnersController from '../controllers/PartnersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import is from '../middlewares/permissions';

const partnersRouter = Router();
const partnersController = new PartnersController();

partnersRouter.use(ensureAuthenticated);

partnersRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      roles: Joi.array().items(Joi.string()),
      operationFee: Joi.number().required(),
      indicationFee: Joi.number().required(),
      phone: Joi.string(),
      description: Joi.string(),
    },
  }),
  partnersController.create,
);

export default partnersRouter;
