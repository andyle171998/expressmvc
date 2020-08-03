import { BuildOptions, Model, Sequelize } from "sequelize";
import DataType from 'sequelize/types/lib/data-types';
import { DatabaseType } from '.';

export interface Domain extends Model {
    id: number;
    domain_name: string;
    domain_link: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export type DomainsStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Domain;
    associate?: Function;
};

export default (sequelize: Sequelize, DataTypes: typeof DataType): DomainsStatic => {
    const domains = <DomainsStatic>sequelize.define("domains", {
        domain_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        deleted_at: {
            type: DataTypes.DATE
        },
    }, {
        paranoid: true
    });
    domains.associate = (models: DatabaseType) => {
    }
    return domains;
}