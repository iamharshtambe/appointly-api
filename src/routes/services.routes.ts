import { Router } from 'express';
import { createService } from '../controllers/services.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { authorize } from '../middlewares/authorize.middleware';

export const servicesRouter = Router();

servicesRouter.post(
  '/services',
  authenticate,
  authorize('SERVICE_PROVIDER'),
  createService,
);
