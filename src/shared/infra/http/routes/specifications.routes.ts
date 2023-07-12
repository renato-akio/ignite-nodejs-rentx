import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRouter = Router();
const createSpecificationController = new CreateSpecificationController();

// utilizando o use, o middleware é consumido para todas as rotas, posterior a linha de código
//specificationsRouter.use(ensureAuthenticated)

specificationsRouter.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRouter } 