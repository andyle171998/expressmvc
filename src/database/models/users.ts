import { BuildOptions, Model, Sequelize } from "sequelize";
import DataType from 'sequelize/types/lib/data-types';
import { DatabaseType } from '.';

export interface User extends Model {
    id: string;
    name: string;
    display_name: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    telephone: string | null;
    profile_image: string | null;
    last_login: Date;
    is_verify_email: boolean;
    is_verify_phone: boolean;
    facebook_id: string | null;
    google_id: string | null;
    password: string;
    password2: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type UsersStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): User;
    associate?: Function;
};

export default (sequelize: Sequelize, DataTypes: typeof DataType): UsersStatic => {
    const users = <UsersStatic>sequelize.define("users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        telephone: {
            type: DataTypes.STRING,
        },
        profile_image: {
            type: DataTypes.STRING,
        },
        last_login: {
            type: DataTypes.DATE,
        },
        is_verify_email: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        is_verify_phone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        facebook_id: {
            type: DataTypes.STRING,
        },
        google_id: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted_at: {
            type: DataTypes.DATE
        },
    }, {
        paranoid: true
    });
    users.associate = (models: DatabaseType) => {
    }
    return users;
}