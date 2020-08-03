import * as yup from 'yup';
import { Request } from 'express';

class OauthValidation {
    static validateAuthorize(req: Request) {
        console.log(req.getLocale());
        const schema = yup.object({
            email: yup.string()
                .email(req.__('error.pleaseEnterEmail'))
                .required(req.__('error.emailIsARequiredField')),
            password: yup.string()
                .required(req.__('error.passwordIsARequiredField'))
        })
        return schema.validateSync(req.body)
    }
    static validateSignUp(req: Request) {
        const schema = yup.object({
            name: yup.string()
                .required(req.__('error.nameIsARequiredField')),
            email: yup.string()
                .email(req.__('error.pleaseEnterEmail'))
                .required(req.__('error.emailIsARequiredField')),
            password: yup.string()
                .required(req.__('error.passwordIsARequiredField'))
        })
        return schema.validateSync(req.body)
    }
    static validateResendEmail(req: Request) {
        const schema = yup.object({
            email: yup.string()
                .email(req.__('error.pleaseEnterEmail'))
                .required(req.__('error.emailIsARequiredField')),
        })
        return schema.validateSync(req.body)
    }
    static validateVerifyEmail(req: Request) {
        const schema = yup.object({
            token: yup.string()
                .required(),
            redirect_uri: yup.string()
                .required(),
        })
        return schema.validateSync(req.query)
    }
    static validateSendEmailResetPassword(req: Request) {
        const schema = yup.object({
            email: yup.string()
                .email(req.__('error.pleaseEnterEmail'))
                .required(req.__('error.emailIsARequiredField')),
        })
        return schema.validateSync(req.body)
    }
    static validateResetPassword(req: Request) {
        const schema = yup.object({
            token: yup.string()
                .required(),
            redirect_uri: yup.string()
                .required(),
        })
        return schema.validateSync(req.query)
    }
    static validateDoResetPassword(req: Request) {
        const schema = yup.object({
            token: yup.string()
                .required(),
            password: yup.string()
                .required(req.__('error.passwordIsARequiredField')),
            confirm_password: yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                  [yup.ref("password")],
                  req.__('error.confirmPassword')
                )
                .required()
              })
              .required()
        })
        return schema.validateSync(req.body)
    }
    static validateGetToken(body: any) {
        const schema = yup.object({
            grant_type: yup.string()
                .required(),
            code: yup.string()
                .required(),
            redirect_uri: yup.string()
                .required(),
            client_id: yup.string()
                .required(),
            client_secret: yup.string()
                .required(),
        })
        return schema.validateSync(body)
    }
}

export default OauthValidation;