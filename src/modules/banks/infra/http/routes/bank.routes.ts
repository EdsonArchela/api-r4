import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import BankController from '../controllers/BankController';

const bankRouter = Router();
const bankController = new BankController();

bankRouter.use(ensureAuthenticated);

bankRouter.post(
  '/',

  bankController.create,
);

bankRouter.get('/', bankController.read);

export default bankRouter;
