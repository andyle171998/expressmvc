import { Router } from 'express';
import passport from 'passport';
import OauthController from './oauth.controller';

export const oauthRouter = Router();

oauthRouter
    .route('/authorize')
    .get(OauthController.authorize)
    .post(OauthController.doAuthorize)

oauthRouter
    .route('/signup')
    .get(OauthController.SignUp)
    .post(OauthController.DoSignUp)

oauthRouter
    .route('/verify/email')
    .get(OauthController.VerifyEmail)

oauthRouter
    .route('/resend-email')
    .post(OauthController.ResendEmail)

oauthRouter
    .route('/send-email-reset-password')
    .post(OauthController.SendEmailResetPassword)
oauthRouter
    .route('/reset-password')
    .get(OauthController.ResetPassword)
    .post(OauthController.DoResetPassword)

oauthRouter
    .route('/token')
    .post(OauthController.GetToken)

oauthRouter
    .route('/signout')
    .get(OauthController.SignOut);

oauthRouter
    .route('/facebook')
    .get(passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
oauthRouter
    .route('/facebook/callback')
    .get(passport.authenticate('facebook', { failureRedirect: '/v1.0/oauth/authorize', session: false }),
        OauthController.Facebook);

oauthRouter
    .route('/google')
    .get(passport.authenticate('google', { scope: ['email', 'profile'] }));
oauthRouter
    .route('/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/v1.0/oauth/authorize', session: false }),
        OauthController.Google);
