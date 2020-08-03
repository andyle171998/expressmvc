import { Response, Request } from 'express';
import { Service, Inject } from 'typedi';
import { URL } from 'url';
import encodedId from 'helper/encodedId';
import PasswordService from 'helper/password';
import {
    IDoAuthorize,
    IDoSignnUp,
    IGetToken,
    IResendEmail,
    IVerifyEmail,
    ISendEmailResetPassword,
    IResetPassword,
    IDoResetPassword
} from './interfaces';
import jwt from 'helper/jwt';
import SendEmailService from 'services/send-email';
import moment from 'moment';
import {
    TypeVerifyCode
} from 'database/models/verify_codes';

@Service()
class OauthService {
    constructor(
        @Inject('usersModel') private usersModel: Models.Users,
        @Inject('domainsModel') private domainsModel: Models.Domains,
        @Inject('singleSignOnsModel') private singleSignOnsModel: Models.SingleSignOns,
        @Inject('verifyCodesModel') private verifyCodesModel: Models.VerifyCodes,
    ) {

    }
    async authorize(req: Request, res: Response) {
        try {
            let { redirect_uri } = req.query;
            if (!req.session) {
                return res.redirect('/');
            }
            if (!redirect_uri && req.session.returnTo) {
                redirect_uri = req.session.returnTo
            }
            if (!redirect_uri) {
                return res.redirect('/');
            }

            const url = new URL(redirect_uri as string);

            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })

            if (domain) {
                req.session.returnTo = redirect_uri;
                if (req.session.globalSessionID) {
                    const singleSignOnExit = await this.singleSignOnsModel.findOne({
                        where: {
                            global_session_id: req.session.globalSessionID
                        },
                        paranoid: false
                    });
                    if (!singleSignOnExit) {
                        delete req.session.globalSessionID;
                        return res.render("pages/login");
                    }
                    const singleSignOn = await this.singleSignOnsModel.create({
                        global_session_id: req.session.globalSessionID,
                        redirect_uri: redirect_uri,
                        sso_token: encodedId(),
                        user_id: singleSignOnExit.user_id,
                        client_ip: req.clientIp
                    });
                    delete req.session.returnTo;
                    return res.redirect(`${redirect_uri}?code=${singleSignOn.sso_token}`);
                }
                return res.render("pages/login");
            }
            return res.redirect('/');
        } catch (error) {
            console.log(error, '===error===');
            return res.redirect('/');
        }
    }
    async doAuthorize(data: IDoAuthorize, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.render("pages/login", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
            const redirectUri = req.session.returnTo;
            if (!redirectUri) {
                return res.render("pages/login", {
                    error: req.__('error.domainNotAllowed')
                });
            }
            const url = new URL(redirectUri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                if (req.session.globalSessionID) {
                    const singleSignOnExit = await this.singleSignOnsModel.findOne({
                        where: {
                            global_session_id: req.session.globalSessionID
                        },
                        paranoid: false
                    });
                    if (singleSignOnExit) {
                        const singleSignOn = await this.singleSignOnsModel.create({
                            global_session_id: req.session.globalSessionID,
                            redirect_uri: redirectUri,
                            sso_token: encodedId(),
                            user_id: singleSignOnExit.user_id,
                            client_ip: req.clientIp
                        });
                        delete req.session.returnTo;
                        return res.redirect(`${redirectUri}?code=${singleSignOn.sso_token}`);
                    } else {
                        delete req.session.globalSessionID;
                    }
                }
                const user = await this.usersModel.findOne({ where: { email: data.email } });
                if (!user) {
                    return res.render("pages/login", {
                        error: req.__('error.wrongEmailOrPassword')
                    });
                }
                const authenticted = PasswordService.comparePassword(data.password, user.password);
                if (!authenticted) {
                    return res.render("pages/login", {
                        error: req.__('error.wrongEmailOrPassword')
                    });
                }
                if (!user.is_verify_email && !user.facebook_id) {
                    return res.render("pages/login", {
                        not_verify: true,
                    });
                }
                const globalSessionID = encodedId();
                const singleSignOn = await this.singleSignOnsModel.create({
                    global_session_id: globalSessionID,
                    redirect_uri: redirectUri,
                    sso_token: encodedId(),
                    user_id: user.id,
                    client_ip: req.clientIp
                });
                req.session.globalSessionID = globalSessionID;
                delete req.session.returnTo;
                return res.redirect(`${redirectUri}?code=${singleSignOn.sso_token}`);
            }
            return res.render("pages/login", {
                error: req.__('error.domainNotAllowed')
            });
        } catch (error) {
            console.log(error, '===error===');
            return res.render("pages/login", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
    }
    async SignUp(req: Request, res: Response) {
        try {
            let { redirect_uri } = req.query;
            if (!req.session) {
                return res.redirect('/');
            }
            if (!redirect_uri && req.session.returnTo) {
                redirect_uri = req.session.returnTo
            }
            if (!redirect_uri) {
                return res.redirect('/');
            }
            const url = new URL(redirect_uri as string);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                req.session.returnTo = redirect_uri;
                if (req.session.globalSessionID) {
                    const singleSignOnExit = await this.singleSignOnsModel.findOne({
                        where: {
                            global_session_id: req.session.globalSessionID
                        },
                        paranoid: false
                    });
                    if (!singleSignOnExit) {
                        delete req.session.globalSessionID;
                        return res.render("pages/register");
                    }
                    const singleSignOn = await this.singleSignOnsModel.create({
                        global_session_id: req.session.globalSessionID,
                        redirect_uri: redirect_uri,
                        sso_token: encodedId(),
                        user_id: singleSignOnExit.user_id,
                        client_ip: req.clientIp
                    });
                    delete req.session.returnTo;
                    return res.redirect(`${redirect_uri}?code=${singleSignOn.sso_token}`);
                }
                return res.render("pages/register");
            }
            return res.redirect('/');
        } catch (error) {
            console.log(error, '===error===');
            return res.redirect('/');
        }
    }
    async DoSignUp(data: IDoSignnUp, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.render("pages/login", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
            const redirectUri = req.session.returnTo;
            const url = new URL(redirectUri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                if (req.session.globalSessionID) {
                    const singleSignOnExit = await this.singleSignOnsModel.findOne({
                        where: {
                            global_session_id: req.session.globalSessionID
                        },
                        paranoid: false
                    });
                    if (singleSignOnExit) {
                        const singleSignOn = await this.singleSignOnsModel.create({
                            global_session_id: req.session.globalSessionID,
                            redirect_uri: redirectUri,
                            sso_token: encodedId(),
                            user_id: singleSignOnExit.user_id,
                            client_ip: req.clientIp
                        });
                        if (!singleSignOn) {
                            return res.render("pages/register", {
                                error: req.__('error.pleaseTryAgainLater'),
                                ...req.body
                            });
                        } else {
                            delete req.session.returnTo;
                            return res.redirect(`${redirectUri}?code=${singleSignOn.sso_token}`);
                        }
                    } else {
                        delete req.session.globalSessionID;
                    }
                }
                const user = await this.usersModel.findOne({
                    where: {
                        email: data.email
                    }
                });
                if (user) {
                    return res.render("pages/register", {
                        error: req.__('error.emailAddressAlreadyExists'),
                        ...req.body
                    });
                }
                const encryptPass = PasswordService.encryptPassword(data.password);
                const userNew = await this.usersModel.create({
                    name: data.name,
                    display_name: data.name,
                    first_name: data.name,
                    email: data.email,
                    password: encryptPass,
                    password2: encryptPass,
                });
                const verifyCode = await this.verifyCodesModel.create({
                    user_id: userNew.id,
                    code: encodedId(),
                    expired_date: moment().add(process.env.MAXAGE_VERIFY_EMAIL_TOKEN, 'days').toDate()
                })
                const result = await SendEmailService.SendEmailVerify({
                    email: data.email,
                    token: verifyCode.code,
                    redirectUri: redirectUri,
                    lang: req.getLocale()
                });
                if (result.error) {
                    return res.render("pages/register", {
                        error: req.__('error.pleaseTryAgainLater'),
                        ...req.body
                    });
                }
                return res.render("pages/register", {
                    verify: true,
                    ...req.body
                });
            }
            return res.render("pages/register", {
                error: req.__('error.domainNotAllowed')
            });
        } catch (error) {
            console.log(error, '===error===');
            return res.render("pages/register", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
    }
    async ResendEmail(data: IResendEmail, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.onError({
                    status: 500,
                    detail: req.__('error.pleaseTryAgainLater')
                })
            }
            const redirectUri = req.session.returnTo;
            const url = new URL(redirectUri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                const user = await this.usersModel.findOne({
                    where: {
                        email: data.email
                    }
                });
                if (!user) {
                    return res.onError({
                        status: 404,
                        detail: req.__('error.notFoundUserByEmail')
                    })
                }
                if (user.is_verify_email) {
                    return res.onError({
                        status: 400,
                        detail: req.__('register.yourAccountHasBeenVerified')
                    })
                }
                const verifyCode = await this.verifyCodesModel.create({
                    user_id: user.id,
                    code: encodedId(),
                    expired_date: moment().add(process.env.MAXAGE_VERIFY_EMAIL_TOKEN, 'days').toDate()
                })
                const result = await SendEmailService.SendEmailVerify({
                    email: data.email,
                    token: verifyCode.code,
                    redirectUri: redirectUri,
                    lang: req.getLocale()
                });
                if (result.error) {
                    return res.onError({
                        status: 500,
                        detail: req.__('error.pleaseTryAgainLater')
                    })
                }
                return res.onSuccess(result)
            }
            return res.onError({
                status: 401,
                detail: req.__('error.domainNotAllowed')
            })
        } catch (error) {
            console.log(error, '===error===');
            return res.onError({
                status: 500,
                detail: req.__('error.pleaseTryAgainLater')
            })
        }
    }
    async VerifyEmail(data: IVerifyEmail, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.render("pages/register", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
            const url = new URL(data.redirect_uri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                req.session.returnTo = data.redirect_uri;
                if (req.session.globalSessionID) {
                    const singleSignOnExit = await this.singleSignOnsModel.findOne({
                        where: {
                            global_session_id: req.session.globalSessionID
                        },
                        paranoid: false
                    });
                    if(singleSignOnExit) {
                        const singleSignOn = await this.singleSignOnsModel.create({
                            global_session_id: req.session.globalSessionID,
                            redirect_uri: data.redirect_uri,
                            sso_token: encodedId(),
                            user_id: singleSignOnExit.user_id,
                            client_ip: req.clientIp
                        });
                        delete req.session.returnTo;
                        return res.redirect(`${data.redirect_uri}?code=${singleSignOn.sso_token}`);
                    } else {
                        delete req.session.globalSessionID;
                    }
                }
                const verify_code = await this.verifyCodesModel.findOne({
                    where: {
                        code: data.token,
                        type: TypeVerifyCode.VerifyEmail
                    }
                })
                if (!verify_code) {
                    return res.render("pages/register", {
                        request_is_invalid: true
                    });
                }
                if(verify_code.expired_date < moment().toDate()){
                    return res.render("pages/register", {
                        verify_code_expired: true
                    });
                }
                const user = await this.usersModel.findByPk(verify_code.user_id);
                if(!user){
                    return res.render("pages/register", {
                        error: req.__('error.pleaseTryAgainLater')
                    });
                }
                user.is_verify_email = true;
                await user.save();
                await verify_code.destroy();
                const globalSessionID = encodedId();
                const singleSignOn = await this.singleSignOnsModel.create({
                    global_session_id: globalSessionID,
                    redirect_uri: data.redirect_uri,
                    sso_token: encodedId(),
                    user_id: user.id,
                    client_ip: req.clientIp
                });
                delete req.session.returnTo;
                req.session.globalSessionID = globalSessionID;
                return res.redirect(`${data.redirect_uri}?code=${singleSignOn.sso_token}`);
            }
            return res.render("pages/register", {
                error: req.__('error.domainNotAllowed')
            });
        } catch (error) {
            console.log(error, '===error===');
            return res.render("pages/register", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
    }
    private hideEmail(email: string){
        return email.replace(/(.{2})(.*)(?=@)/,
        function(gp1, gp2, gp3) { 
          for(let i = 0; i < gp3.length; i++) { 
            gp2+= "*"; 
          } return gp2; 
        });
    }
    async SendEmailResetPassword(data: ISendEmailResetPassword, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.onError({
                    status: 500,
                    detail: req.__('error.pleaseTryAgainLater')
                })
            }
            const redirectUri = req.session.returnTo;
            const url = new URL(redirectUri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                const user = await this.usersModel.findOne({
                    where: {
                        email: data.email
                    }
                });
                if (!user) {
                    return res.onError({
                        status: 404,
                        detail: req.__('error.notFoundUserByEmail')
                    })
                }
                const verifyCode = await this.verifyCodesModel.create({
                    type: TypeVerifyCode.ResetPassword,
                    user_id: user.id,
                    code: encodedId(),
                    expired_date: moment().add(process.env.MAXAGE_RESET_PASSWORD_EMAIL_TOKEN, 'days').toDate()
                })
                const result = await SendEmailService.SendEmailResetPassword({
                    name: user.display_name,
                    email: data.email,
                    token: verifyCode.code,
                    redirectUri: redirectUri,
                    lang: req.getLocale()
                });
                if (result.error) {
                    return res.onError({
                        status: 500,
                        detail: req.__('error.pleaseTryAgainLater')
                    })
                }
                return res.onSuccess({
                    message: req.__('resetPassword.messgeSendEmailSuccess', {email: this.hideEmail(data.email)})
                })
            }
            return res.onError({
                status: 401,
                detail: req.__('error.domainNotAllowed')
            })
        } catch (error) {
            console.log(error, '===error===');
            return res.onError({
                status: 500,
                detail: req.__('error.pleaseTryAgainLater')
            })
        }
    }
    async ResetPassword(data: IResetPassword, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.render("pages/reset_password", {
                    error: req.__('error.pleaseTryAgainLater'),
                });
            }
            const url = new URL(data.redirect_uri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                req.session.returnTo = data.redirect_uri;
                const verify_code = await this.verifyCodesModel.findOne({
                    where: {
                        code: data.token,
                        type: TypeVerifyCode.ResetPassword
                    }
                })
                if (!verify_code) {
                    return res.render("pages/reset_password", {
                        request_is_invalid: true,
                    });
                }
                if(verify_code.expired_date < moment().toDate()){
                    return res.render("pages/reset_password", {
                        verify_code_expired: true,
                    });
                }
                const user = await this.usersModel.findByPk(verify_code.user_id);
                if(!user){
                    return res.render("pages/reset_password", {
                        error: req.__('error.pleaseTryAgainLater')
                    });
                }
                return res.render("pages/reset_password");
            }
            return res.render("pages/reset_password", {
                error: req.__('error.domainNotAllowed')
            });
        } catch (error) {
            console.log(error, '===error===');
            return res.render("pages/reset_password", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
    }
    async DoResetPassword(data: IDoResetPassword, req: Request, res: Response) {
        try {
            if (!req.session) {
                return res.render("pages/reset_password", {
                    error: req.__('error.pleaseTryAgainLater'),
                    token: data.token
                });
            }
            const redirectUri = req.session.returnTo;
            const url = new URL(redirectUri);
            const domain = await this.domainsModel.findOne({
                where: {
                    domain_link: url.origin,
                    is_active: true
                }
            })
            if (domain) {
                const verify_code = await this.verifyCodesModel.findOne({
                    where: {
                        code: data.token,
                        type: TypeVerifyCode.ResetPassword
                    }
                })
                if (!verify_code) {
                    return res.render("pages/reset_password", {
                        request_is_invalid: true,
                        token: data.token
                    });
                }
                if(verify_code.expired_date < moment().toDate()){
                    return res.render("pages/reset_password", {
                        verify_code_expired: true,
                        token: data.token
                    });
                }
                const user = await this.usersModel.findByPk(verify_code.user_id);
                if(!user){
                    return res.render("pages/reset_password", {
                        error: req.__('error.pleaseTryAgainLater'),
                        token: data.token
                    });
                }
                const encryptPass = PasswordService.encryptPassword(data.password);
                user.password2 = user.password;
                user.password = encryptPass;
                const result = await SendEmailService.SendEmailResetPasswordSuccess({
                    email: user.email as string
                })
                if (result.error) {
                    return res.render("pages/reset_password", {
                        error: req.__('error.pleaseTryAgainLater'),
                        token: data.token
                    });
                }
                await user.save();
                await verify_code.destroy();
                return res.redirect(`/v1.0/oauth/authorize?redirect_uri=${redirectUri}&lang=${req.getLocale()}`);
            }
            return res.render("pages/reset_password", {
                error: req.__('error.domainNotAllowed'),
                token: data.token
            });
        } catch (error) {
            console.log(error, '===error===');
            return res.render("pages/reset_password", {
                error: req.__('error.pleaseTryAgainLater'),
                token: data.token
            });
        }
    }
    async GetToken(data: IGetToken, res: Response) {
        try {
            if (
                data.client_id !== process.env.AUTH_CLIENT_ID ||
                data.client_secret !== process.env.AUTH_CLIENT_SECRET
            ) {
                return res.onError({
                    status: 401,
                    detail: 'Unauthorized'
                })
            }
            const singleSignOn = await this.singleSignOnsModel.findOne({
                where: {
                    sso_token: data.code,
                },
            });
            if (singleSignOn) {
                const url = new URL(singleSignOn.redirect_uri);
                const domain = await this.domainsModel.findOne({
                    where: {
                        domain_link: url.origin,
                        is_active: true
                    }
                })
                if (domain) {
                    const user = await this.usersModel.findByPk(singleSignOn.user_id);
                    if (user) {
                        const token = jwt.issue({ id: user.id });
                        await this.singleSignOnsModel.destroy({
                            where: {
                                id: singleSignOn.id
                            }
                        });
                        user.last_login = new Date();
                        await user.save();
                        return res.onSuccess({
                            access_token: token,
                            expires_in: process.env.MAXAGE_JWT_TOKEN,
                            scope: [],
                            token_type: "Bearer"
                        })
                    }
                }
            }
            return res.onError({
                status: 401,
                detail: 'Unauthorized'
            })
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            })
        }
    }
    async SignOut(redirect_uri: string, req: Request, res: Response) {
        const url = new URL(redirect_uri);
        const domain = await this.domainsModel.findOne({
            where: {
                domain_link: url.origin,
                is_active: true
            }
        })
        if (domain) {
            if (req.session && req.session.globalSessionID) {
                delete req.session.globalSessionID;
            }
            return res.redirect(redirect_uri);
        }
        return res.redirect('/');
    }
    async Facebook(user_id: string, req: Request, res: Response) {
        if (!req.session) {
            return res.render("pages/login", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
        const redirectUri = req.session.returnTo;
        if (!redirectUri) {
            return res.render("pages/login", {
                error: req.__('error.domainNotAllowed')
            });
        }
        const url = new URL(redirectUri);
        const domain = await this.domainsModel.findOne({
            where: {
                domain_link: url.origin,
                is_active: true
            }
        })
        if (domain) {
            const globalSessionID = encodedId();
            const singleSignOn = await this.singleSignOnsModel.create({
                global_session_id: globalSessionID,
                redirect_uri: redirectUri,
                sso_token: encodedId(),
                user_id: user_id,
                client_ip: req.clientIp
            });
            if (!singleSignOn) {
                return res.render("pages/login", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
            req.session.globalSessionID = globalSessionID;
            delete req.session.returnTo;
            return res.redirect(`${redirectUri}?code=${singleSignOn.sso_token}&facebookappendedhash=`);
        }
        return res.render("pages/login", {
            error: req.__('error.domainNotAllowed')
        });
    }
    async Google(user_id: string, req: Request, res: Response) {
        if (!req.session) {
            return res.render("pages/login", {
                error: req.__('error.pleaseTryAgainLater')
            });
        }
        const redirectUri = req.session.returnTo;
        if (!redirectUri) {
            return res.render("pages/login", {
                error: req.__('error.domainNotAllowed')
            });
        }
        const url = new URL(redirectUri);
        const domain = await this.domainsModel.findOne({
            where: {
                domain_link: url.origin,
                is_active: true
            }
        })
        if (domain) {
            const globalSessionID = encodedId();
            const singleSignOn = await this.singleSignOnsModel.create({
                global_session_id: globalSessionID,
                redirect_uri: redirectUri,
                sso_token: encodedId(),
                user_id: user_id,
                client_ip: req.clientIp
            });
            if (!singleSignOn) {
                return res.render("pages/login", {
                    error: req.__('error.pleaseTryAgainLater')
                });
            }
            req.session.globalSessionID = globalSessionID;
            delete req.session.returnTo;
            return res.redirect(`${redirectUri}?code=${singleSignOn.sso_token}`);
        }
        return res.render("pages/login", {
            error: req.__('error.domainNotAllowed')
        });
    }
}

export default OauthService;

