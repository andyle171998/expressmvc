import { Router } from 'express';
import { oauthRouter } from './oauth';
import { usersRouter } from './users';

export const v1Router = Router();

v1Router.use('/oauth', oauthRouter);
v1Router.use('/user', usersRouter);