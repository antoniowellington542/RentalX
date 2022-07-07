import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController';

const specificationsRoutes = Router();

const specificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', specificationController.handle);

export { specificationsRoutes };
