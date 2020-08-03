import * as yup from 'yup';

class UserValidation {
    static update(body: any) {
        const schema = yup.object({
            first_name: yup.string()
                .required(),
            last_name: yup.string()
                .notRequired(),
            email: yup.string()
                .email()
                .notRequired(),
            telephone: yup.string()
                .notRequired(),
            password: yup.string()
                .notRequired(),
            redirect_uri: yup.string()
                .required(),
            lang: yup.string()
                .notRequired()
        });
        return schema.validateSync(body)
    }
    static adminUpdate(body: any) {
        const schema = yup.object({
            AUTH_CLIENT_ID: yup.string()
                .oneOf([process.env.AUTH_CLIENT_ID as string], 'AUTH_CLIENT_ID invalid')
                .required(),
            AUTH_CLIENT_SECRET: yup.string()
                .oneOf([process.env.AUTH_CLIENT_SECRET as string], 'AUTH_CLIENT_SECRET invalid')
                .required(),
            AUTH_TOKEN_MASTER: yup.string()
                .oneOf([process.env.AUTH_TOKEN_MASTER as string], 'AUTH_TOKEN_MASTER invalid')
                .required(),
            auth_id: yup.string()
                .required(),
            first_name: yup.string()
                .required(),
            last_name: yup.string()
                .notRequired(),
            email: yup.string()
                .email()
                .notRequired(),
            telephone: yup.string()
                .notRequired(),
            password: yup.string()
                .notRequired(),
        });
        return schema.validateSync(body)
    }
    static createUser(body: any) {
        const schema = yup.object({
            AUTH_CLIENT_ID: yup.string()
                .oneOf([process.env.AUTH_CLIENT_ID as string], 'AUTH_CLIENT_ID invalid')
                .required(),
            AUTH_CLIENT_SECRET: yup.string()
                .oneOf([process.env.AUTH_CLIENT_SECRET as string], 'AUTH_CLIENT_SECRET invalid')
                .required(),
            AUTH_TOKEN_MASTER: yup.string()
                .oneOf([process.env.AUTH_TOKEN_MASTER as string], 'AUTH_TOKEN_MASTER invalid')
                .required(),
            first_name: yup.string()
                .required(),
            last_name: yup.string()
                .notRequired(),
            email: yup.string()
                .email()
                .notRequired(),
            is_verify_email: yup.boolean()
                .when("email", {
                    is: (val) => !!val,
                    then: yup.boolean().default(true),
                    otherwise: yup.boolean().default(false),
                })
                .default(false),
            telephone: yup.string()
                .notRequired(),
            is_verify_phone: yup.boolean()
                .when("telephone", {
                    is: (val) => !!val,
                    then: yup.boolean().default(true),
                    otherwise: yup.boolean().default(false),
                })
                .default(false),
            profile_image: yup.string()
                .notRequired(),
            facebook_id: yup.string()
                .notRequired(),
            google_id: yup.string()
                .notRequired(),
            password: yup.string()
                .notRequired(),
        });
        return schema.validateSync(body)
    }
    static updateProfileImage(body: any) {
        const schema = yup.object({
            url: yup.string()
                .required()
        });
        return schema.validateSync(body)
    }
}

export default UserValidation;