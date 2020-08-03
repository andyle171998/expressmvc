import { Router } from 'express';
import passport from 'passport';
import UserController from './users.controller';

export const usersRouter = Router();

usersRouter
  .route('/me')
  .get(passport.authenticate('jwt', { session: false }), UserController.me)
  .put(passport.authenticate('jwt', { session: false }), UserController.updateProfile)

usersRouter
  .route('/me/profile-image')
  .put(passport.authenticate('jwt', { session: false }), UserController.updateProfileImage)

usersRouter
  .route('/admin/user')
  .post(UserController.createUser)
  .put(UserController.adminUpdate)
  