import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DealsController from '../controllers/DealsController';
import is from '@modules/users/infra/http/middlewares/permissions';
import uploadConfig from '@config/upload';
import multer from 'multer';

const dealsRouter = Router();
const dealsController = new DealsController();

dealsRouter.use(ensureAuthenticated);

dealsRouter.post(
  '/create',
  // celebrate(
  //   {
  //     [Segments.BODY]: {
  //       organization_id: Joi.string().required(),
  //       value: Joi.number().required(),
  //       bank: Joi.string()
  //         .valid('Travelex', 'OurInvest', 'Frente Corretora')
  //         .required(),
  //       contract: Joi.number().required(),
  //       currency: Joi.string()
  //         .valid('USD', 'EUR', 'GBP', 'JPY', 'CHF')
  //         .required(),
  //       direction: Joi.boolean().required(),
  //       flow: Joi.string()
  //         .valid(
  //           'D0/D0',
  //           'D0/D1',
  //           'D0/D2',
  //           'D1/D1',
  //           'D1/D2',
  //           'D2/D2',
  //           'D0',
  //           'D1',
  //           'D2',
  //         )
  //         .required(),
  //       operationType: Joi.string()
  //         .valid('import', 'export', 'disp', 'fin')
  //         .required(),
  //       partnerId: Joi.string(),
  //       advisorId: Joi.string(),
  //       spread: Joi.number().required(),
  //       iof: Joi.number(),
  //       ir: Joi.number(),
  //       ptax2: Joi.number(),
  //       darf: Joi.boolean(),
  //       otc: Joi.number().required(),
  //     },
  //   },
  //   {
  //     abortEarly: true,
  //     messages: {
  //       'number.base': 'o valor deve ser um número',
  //       'string.base': 'O valor de {#label} deve ser uma strig',
  //       'any.required': '{#label} é necessária',
  //     },
  //   },
  // ),
  dealsController.create,
);

dealsRouter.get(
  '/all',
  is(['ROLE_CONSELHO', 'ROLE_ADMIN']),
  dealsController.index,
);

dealsRouter.get('/user', dealsController.getUserDeals);

dealsRouter.get('/', dealsController.get);

dealsRouter.post(
  '/simulate',
  celebrate({
    [Segments.BODY]: {
      bank: Joi.string().valid('Travelex', 'OurInvest', 'Frente').required(),
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
      darf: Joi.boolean(),
    },
  }),
  dealsController.simulate,
);

const upload = multer(uploadConfig.multer);

dealsRouter.patch(
  '/update',
  upload.fields([
    { name: 'invoice', maxCount: 2 },
    { name: 'contractDocumment' },
    { name: 'swift' },
  ]),
  dealsController.update,
);

dealsRouter.get('/file/download', dealsController.getDownloadLink);

export default dealsRouter;
