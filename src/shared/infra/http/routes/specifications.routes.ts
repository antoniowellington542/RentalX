import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const specificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', specificationController.handle);

export { specificationsRoutes };
