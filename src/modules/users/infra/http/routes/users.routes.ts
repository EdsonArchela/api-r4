import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import is from '../middlewares/permissions';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      comission: Joi.number(),
      roles: Joi.array().items(Joi.string()),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/update',
  is(['ROLE_ADMIN']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      comission: Joi.number(),
      roles: Joi.array().items(Joi.string()),
    },
  }),
  usersController.update,
);

usersRouter.get(
  '/organization',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string(),
      cnpj: Joi.string(),
    },
  }),
  usersController.getOrganization,
);

// usersRouter.patch(
//   '/cpf',
//   celebrate({
//     [Segments.BODY]: {
//       cpf: Joi.string().required(),
//     },
//   }),
//   usersController.update,
// );

export default usersRouter;
