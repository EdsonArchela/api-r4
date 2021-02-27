import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DealsController from '../controllers/DealsController';

const dealsRouter = Router();
const dealsController = new DealsController();

dealsRouter.use(ensureAuthenticated);

dealsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      organization_id: Joi.string().required(),
      value: Joi.number().required(),
      bank: Joi.string().valid('Travelex', 'OuroInvest', 'Frente').required(),
      cet: Joi.number().required(),
      contract: Joi.number().required(),
      currency: Joi.string()
        .valid('USD', 'EUR', 'GBP', 'JPY', 'CHF')
        .required(),
      direction: Joi.string().valid('Entrada', 'Saída').required(),
      flow: Joi.string()
        .valid(
          'D0/D0',
          'D0/D1',
          'D0/D2',
          'D1/D1',
          'D1/D2',
          'D2/D2',
          'D0',
          'D1',
          'D2',
        )
        .required(),
      operationType: Joi.string()
        .valid('Importação', 'Exportação', 'Disponibilidade', 'Financeiro')
        .required(),
      partnerId: Joi.string(),
      advisorId: Joi.string(),
      spread: Joi.number().required(),
      iof: Joi.number(),
      ir: Joi.number(),
      ptax2: Joi.number(),
      darf: Joi.boolean(),
      otc: Joi.number().required(),
    },
  }),
  dealsController.create,
);

dealsRouter.post(
  '/simulate',
  celebrate({
    [Segments.BODY]: {
      bank: Joi.string().valid('Travelex', 'OuroInvest', 'Frente').required(),
      currency: Joi.string()
        .valid('USD', 'EUR', 'GBP', 'JPY', 'CHF')
        .required(),
      direction: Joi.boolean().required(),
      value: Joi.number().required(),
      otc: Joi.number().required(),
      spread: Joi.number().required(),
      iof: Joi.number(),
      ptax2: Joi.number(),
      ir: Joi.number(),
      flow: Joi.string()
        .valid(
          'D0/D0',
          'D0/D1',
          'D0/D2',
          'D1/D1',
          'D1/D2',
          'D2/D2',
          'D0',
          'D1',
          'D2',
        )
        .required(),
    },
  }),
  dealsController.simulate,
);
export default dealsRouter;
