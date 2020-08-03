import { Router } from 'express';
import { v1Router } from 'modules/v1';

export const restRouter = Router(); 

restRouter.use('/v1.0', v1Router)