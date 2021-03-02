import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import PeopleController from '../controllers/PeopleController';

const peopleRouter = Router();
const peopleController = new PeopleController();

peopleRouter.use(ensureAuthenticated);

peopleRouter.get(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string(),
      cpf: Joi.string(),
    },
  }),
  peopleController.index,
);

export default peopleRouter;
