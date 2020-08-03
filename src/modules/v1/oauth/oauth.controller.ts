import { Request, Response } from 'express';
import { Container } from 'typedi';
import OauthService from './oauth.service';
import OauthValidation from './oauth.validation';

class OauthController {
    static async authorize(req: Request, res: Response) {
        try {
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.authorize(req, res);
        } catch (err) {
            return res.redirect('/');
        }
    }
    static async doAuthorize(req: Request, res: Response) {
        try {
            const value = OauthValidation.validateAuthorize(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.doAuthorize(value, req, res);
        } catch (err) {
            return res.render("pages/login", {
                error: err
            });
        }
    }
    static async SignUp(req: Request, res: Response){
        try {
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.SignUp(req, res);
        } catch (error) {
            return res.redirect('/');
        }
    }
    static async DoSignUp(req: Request, res: Response){
        try {
            const value = OauthValidation.validateSignUp(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.DoSignUp(value, req, res);
        } catch (error) {
            return res.render("pages/register", {
                error: error
            });
        }
    }
    static async ResendEmail(req: Request, res: Response){
        try {
            const value = OauthValidation.validateResendEmail(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.ResendEmail(value, req, res);
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
    static async VerifyEmail(req: Request, res: Response){
        try {
            const value = OauthValidation.validateVerifyEmail(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.VerifyEmail(value, req, res);
        } catch (error) {
            return res.render("pages/register", {
                request_is_invalid: true
            });
        }
    }
    static async SendEmailResetPassword(req: Request, res: Response){
        try {
            const value = OauthValidation.validateSendEmailResetPassword(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.SendEmailResetPassword(value, req, res);
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
    static async ResetPassword(req: Request, res: Response){
        try {
            const value = OauthValidation.validateResetPassword(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.ResetPassword(value, req, res);
        } catch (error) {
            return res.render("pages/reset_password", {
                request_is_invalid: true
            });
        }
    }
    static async DoResetPassword(req: Request, res: Response){
        try {
            const value = OauthValidation.validateDoResetPassword(req)
            const OauthServiceInstance = Container.get(OauthService);
            await OauthServiceInstance.DoResetPassword(value, req, res);
        } catch (error) {
            const { token } = req.body;
            return res.render("pages/reset_password", {
                error: error,
                token: token
            });
        }
    }
    static GetToken(req: Request, res: Response){
        try {
            const value = OauthValidation.validateGetToken(req.body);
            const OauthServiceInstance = Container.get(OauthService);
            OauthServiceInstance.GetToken(value, res);
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
    static async SignOut(req: Request, res: Response) {
        try {
            const { redirect_uri } = req.query;
            if(redirect_uri) {
                const OauthServiceInstance = Container.get(OauthService);
                await OauthServiceInstance.SignOut(redirect_uri as string, req, res);
            }else{
                return res.redirect('/');
            }
        } catch (err) {
            return res.redirect('/');
        }
    }
    static async Facebook(req: Request, res: Response) {
        try {
            if(req.user){
                const OauthServiceInstance = Container.get(OauthService);
                await OauthServiceInstance.Facebook(req.user.id, req, res);
            }else{
                return res.render("pages/login", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
        } catch (err) {
            return res.render("pages/login", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
    }
    static async Google(req: Request, res: Response){
        try {
            if(req.user){
                const OauthServiceInstance = Container.get(OauthService);
                await OauthServiceInstance.Google(req.user.id, req, res);
            }else{
                return res.render("pages/login", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
        } catch (err) {
            return res.render("pages/login", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
    }
}

export default OauthController;