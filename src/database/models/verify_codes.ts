import { BuildOptions, Model, Sequelize } from "sequelize";
import DataType from 'sequelize/types/lib/data-types';
import { DatabaseType } from '.';

export interface VerifyCode extends Model {
    id: number;
    user_id: string;
    code: string;
    expired_date: Date;
    type: number;
    created_at: Date;
    updated_at: Date;
}

export enum TypeVerifyCode {
    'VerifyEmail' = 1,
    'ResetPassword' = 2
}

export type VerifyCodesStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): VerifyCode;
    associate?: Function;
};

export default (sequelize: Sequelize, DataTypes: typeof DataType): VerifyCodesStatic => {
    const verify_codes = <VerifyCodesStatic>sequelize.define("verify_codes", {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        expired_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: TypeVerifyCode.VerifyEmail
        }
    }, {
    });
    verify_codes.associate = (models: DatabaseType) => {
    }
    return verify_codes;
}