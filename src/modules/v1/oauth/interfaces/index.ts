export interface IDoAuthorize {
    email: string;
    password: string;
}
export interface IDoSignnUp {
    name: string;
    email: string;
    password: string;
}

export interface IResendEmail{
    email: string;
}

export interface ISendEmailResetPassword{
    email: string;
}

export interface IResetPassword{
    token: string;
    redirect_uri: string;
}

export interface IVerifyEmail{
    token: string;
    redirect_uri: string;
}


export interface IDoResetPassword{
    token: string;
    password: string;
    confirm_password: string;
}


export interface IGetToken {
    grant_type: string;
    code: string;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
}