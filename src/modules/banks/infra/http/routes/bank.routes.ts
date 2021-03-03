import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import BankController from '../controllers/BankController';

const bankRouter = Router();
const bankController = new BankController();

bankRouter.use(ensureAuthenticated);

bankRouter.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      bankNumber: Joi.string().required(),
      agency: Joi.string().required(),
      account: Joi.string().required(),
      iban: Joi.string().required(),
    },
  }),
  bankController.create,
);

export default bankRouter;
