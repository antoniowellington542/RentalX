import { Router } from 'express';

import { AuthenticateController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post('/section', authenticateController.handle);

export { authenticateRoutes };
