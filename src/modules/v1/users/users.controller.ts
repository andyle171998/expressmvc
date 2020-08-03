import { Request, Response } from 'express';
import { Container } from 'typedi';
import UserService from './users.service';
import UserValidation from './users.validation';

export default class UserController {
    static me(req: Request, res: Response) {
        try {
            if (req.user) {
                const UserServiceInstance = Container.get(UserService);
                UserServiceInstance.getMe(req.user.id, res);
            } else {
                return res.onError({
                    status: 401,
                    detail: "USER_NOT_FOUND"
                });
            }
        } catch (error) {
            return res.onError({
                status: 500,
                detail: error
            });
        }
    }
    static updateProfile(req: Request, res: Response) {
        try {
            if (req.user) {
                const value = UserValidation.update(req.body);
                const UserServiceInstance = Container.get(UserService);
                UserServiceInstance.updateProfile(req.user.id, value, req, res);
            } else {
                return res.onError({
                    status: 401,
                    detail: "USER_NOT_FOUND"
                });
            }
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
    static updateProfileImage(req: Request, res: Response) {
        try {
            if (req.user) {
                const value = UserValidation.updateProfileImage(req.body);
                const UserServiceInstance = Container.get(UserService);
                UserServiceInstance.updateProfileImage(req.user.id, value, res);
            } else {
                return res.onError({
                    status: 401,
                    detail: "USER_NOT_FOUND"
                });
            }
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
    
    static createUser(req: Request, res: Response) {
        try {
            const value = UserValidation.createUser(req.body);
            const UserServiceInstance = Container.get(UserService);
            UserServiceInstance.createUser(value, res);
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
    static adminUpdate(req: Request, res: Response) {
        try {
            const value = UserValidation.adminUpdate(req.body);
            const UserServiceInstance = Container.get(UserService);
            UserServiceInstance.adminUpdate(value, res);
        } catch (error) {
            return res.onError({
                status: error.name === "ValidationError" ? 400 : 500,
                detail: error
            });
        }
    }
};

