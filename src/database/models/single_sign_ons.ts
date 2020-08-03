import { BuildOptions, Model, Sequelize } from "sequelize";
import DataType from 'sequelize/types/lib/data-types';
import { DatabaseType } from '.';

export interface SingleSignOn extends Model {
    id: number;
    global_session_id: string;
    sso_token: string;
    user_id: string;
    redirect_uri: string;
    client_ip: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type SingleSignOnsStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): SingleSignOn;
    associate?: Function;
};

export default (sequelize: Sequelize, DataTypes: typeof DataType): SingleSignOnsStatic => {
    const single_sign_ons = <SingleSignOnsStatic>sequelize.define("single_sign_ons", {
        global_session_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sso_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        redirect_uri: {
            type: DataTypes.STRING,
            allowNull: false
        },
        client_ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted_at: {
            type: DataTypes.DATE
        },
    }, {
        paranoid: true
    });
    single_sign_ons.associate = (models: DatabaseType) => {
    }
    return single_sign_ons;
}