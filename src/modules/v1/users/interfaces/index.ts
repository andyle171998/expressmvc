export interface IVerifyEmail{
    token: string;
    redirect_uri: string;
}

export interface IUpdateProfile {
    first_name: string;
    last_name: string | undefined;
    email: string | undefined;
    telephone: string | undefined;
    password: string | undefined;
    redirect_uri: string;
    lang: string | undefined;
}
export interface IAdminUpdateProfile {
    AUTH_CLIENT_ID: string;
    AUTH_CLIENT_SECRET: string;
    AUTH_TOKEN_MASTER: string;
    auth_id: string;
    first_name: string;
    last_name: string | undefined;
    email: string | undefined;
    telephone: string | undefined;
    password: string | undefined;
}

export interface IUpdateProfileImage {
    url: string;
}

export interface ICreateUser {
    AUTH_CLIENT_ID: string;
    AUTH_CLIENT_SECRET: string;
    AUTH_TOKEN_MASTER: string;
    first_name: string;
    last_name: string | undefined;
    email: string | undefined;
    is_verify_email: boolean;
    telephone: string | undefined;
    is_verify_phone: boolean;
    profile_image: string | undefined;
    facebook_id: string | undefined;
    google_id: string | undefined;
    password: string | undefined;
}