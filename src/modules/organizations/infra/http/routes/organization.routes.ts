import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import OrganizationController from '../controllers/OrganizationController';

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.use(ensureAuthenticated);

organizationRouter.get(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string(),
      cnpj: Joi.string(),
    },
  }),
  organizationController.index,
);
export default organizationRouter;
