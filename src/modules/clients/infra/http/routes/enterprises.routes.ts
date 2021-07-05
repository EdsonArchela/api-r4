import { Router } from 'express';
import EnterprisesController from '../controllers/EnterprisesController';

const enterprisesRouter = Router();
const enterprisesController = new EnterprisesController();

enterprisesRouter.post('/', enterprisesController.create);

enterprisesRouter.post('/authenticate', enterprisesController.authorize);

export default enterprisesRouter;
