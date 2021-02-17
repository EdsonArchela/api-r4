import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
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

usersRouter.use(ensureAuthenticated);

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
