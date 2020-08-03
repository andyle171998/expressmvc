import { Response, Request } from 'express';
import { Service, Inject } from 'typedi';
import {
    IUpdateProfile,
    IAdminUpdateProfile,
    IUpdateProfileImage,
    ICreateUser
} from './interfaces';
import SendEmailService from 'services/send-email';
import encodedId from 'helper/encodedId';
import PasswordService from 'helper/password';
import moment from 'moment';
import { Op } from 'sequelize';

@Service()
export default class UsersService {
    constructor(
        @Inject('usersModel') private userModel: Models.Users,
        @Inject('verifyCodesModel') private verifyCodesModel: Models.VerifyCodes,
    ) {
    }

    public async getMe(user_id: string, res: Response) {
        try {
            const user = await this.userModel.findByPk(user_id, {
                attributes: ['id', 'first_name', 'last_name',
                    'name', 'display_name', 'email', 'telephone', 'profile_image', 'last_login'],
            });
            if (!user) {
                return res.onError({
                    status: 404,
                    detail: "USER_NOT_FOUND"
                });
            }
            return res.onSuccess(user)
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            });
        }
    }

    async updateProfile(user_id: string, data: IUpdateProfile, req: Request, res: Response) {
        try {
            const user = await this.userModel.findByPk(user_id);
            if (!user) {
                return res.onError({
                    status: 404,
                    detail: "USER_NOT_FOUND"
                });
            }
            let dataUpdate: any = data;
            dataUpdate.name = data.first_name;
            dataUpdate.display_name = data.first_name;
            if (data.email && data.email !== user.email) {
                const userByEmal = await this.userModel.findOne({
                    where: {
                        email: data.email,
                        id: {
                            [Op.ne]: user_id
                        }
                    }
                });
                if(userByEmal){
                    return res.onError({
                        status: 400,
                        detail: "EMAIL_EXISTED"
                    })
                }
                dataUpdate.is_verify_email = false;
                const verifyCode = await this.verifyCodesModel.create({
                    user_id: user.id,
                    code: encodedId(),
                    expired_date: moment().add(process.env.MAXAGE_VERIFY_EMAIL_TOKEN, 'days').toDate()
                })
                const result = await SendEmailService.SendEmailVerify({
                    email: data.email,
                    token: verifyCode.code,
                    redirectUri: data.redirect_uri,
                    lang: data.lang || req.getLocale()
                });
                if (result.error) {
                    return res.onError({
                        status: 500,
                        detail: "SSO_ERROR"
                    })
                }
            }
            if (data.password) {
                const authenticted = PasswordService.comparePassword(data.password, user.password);
                if (authenticted) {
                    return res.onError({
                        status: 400,
                        detail: "PASSWORD_NOT_UPDATE"
                    })
                }
                const encryptPass = PasswordService.encryptPassword(data.password);
                dataUpdate.password2 = user.password;
                dataUpdate.password = encryptPass;
                if (data.email || user.email) {
                    const result = await SendEmailService.SendEmailResetPasswordSuccess({
                        email: (data.email || user.email) as string
                    })
                    if (result.error) {
                        return res.onError({
                            status: 500,
                            detail: "SSO_ERROR"
                        })
                    }
                }
            }
            await this.userModel.update(dataUpdate, {
                where: {
                    id: user_id
                }
            })
            return res.onSuccess(undefined, {
                message: "Update successfully"
            })
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            });
        }
    }

    async adminUpdate(data: IAdminUpdateProfile, res: Response) {
        try {
            const user = await this.userModel.findByPk(data.auth_id);
            if (!user) {
                return res.onError({
                    status: 404,
                    detail: "USER_NOT_FOUND"
                });
            }
            let dataUpdate: any = data;
            dataUpdate.name = data.first_name;
            dataUpdate.display_name = data.first_name; 
            if(data.password){
                const encryptPass = PasswordService.encryptPassword(data.password);
                dataUpdate.password2 = user.password;
                dataUpdate.password = encryptPass;
            }
            if(data.email){
                const userByEmal = await this.userModel.findOne({
                    where: {
                        email: data.email,
                        id: {
                            [Op.ne]: data.auth_id
                        }
                    }
                });
                if(userByEmal){
                    return res.onError({
                        status: 400,
                        detail: "EMAIL_EXISTED"
                    })
                }
                dataUpdate.is_verify_email = true;
            }
            await this.userModel.update(dataUpdate, {
                where: {
                    id: data.auth_id
                }
            })
            return res.onSuccess(undefined, {
                message: "Update successfully"
            })
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            });
        }
    }

    async createUser(data: ICreateUser, res: Response) { 
        try {
            if(data.email){
                const userByEmal = await this.userModel.findOne({
                    where: {
                        email: data.email
                    }
                });
                if(userByEmal){
                    return res.onSuccess({
                        user_id: userByEmal.id,
                        existed: true
                    });
                }
            }
            if(data.facebook_id){
                const userByFaceID = await this.userModel.findOne({
                    where: {
                        facebook_id: data.facebook_id
                    }
                });
                if(userByFaceID){
                    return res.onSuccess({
                        user_id: userByFaceID.id,
                        existed: true
                    });
                }
            }
            if(data.google_id){
                const userByGoogleID = await this.userModel.findOne({
                    where: {
                        google_id: data.google_id
                    }
                });
                if(userByGoogleID){
                    return res.onSuccess({
                        user_id: userByGoogleID.id,
                        existed: true
                    });
                }
            }
            let encryptPass = PasswordService.encryptPassword(encodedId());
            if(data.password){
                encryptPass = PasswordService.encryptPassword(data.password);
            }
            const user = await this.userModel.create({
                name: data.first_name,
                display_name: data.first_name,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                is_verify_email: data.is_verify_email,
                telephone: data.telephone,
                is_verify_phone: data.is_verify_phone,
                profile_image: data.profile_image,
                facebook_id: data.facebook_id,
                google_id: data.google_id,
                password: encryptPass,
                password2: encryptPass
            })
            return res.onSuccess({
                user_id: user.id,
                existed: false
            });
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            });
        }
    }

    async updateProfileImage(user_id: string, data: IUpdateProfileImage, res: Response){
        try {
            const user = await this.userModel.findByPk(user_id);
            if (!user) {
                return res.onError({
                    status: 404,
                    detail: "USER_NOT_FOUND"
                });
            }
            user.profile_image = data.url;
            await user.save();
            return res.onSuccess(undefined, {
                message: "Update successfully"
            })
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            });
        }
    }
}