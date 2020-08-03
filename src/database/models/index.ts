'use strict';
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize'
import config from 'config/database';

export interface DatabaseType {
    [key: string]: any
}
const basename = path.basename(__filename);

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

const database: DatabaseType = {
    sequelize,
    Sequelize
};

fs
    .readdirSync(__dirname)
    .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && ((file.slice(-3) === '.ts') || (file.slice(-3) === '.js'));
    })
    .forEach((file: string)=> {
        const model = sequelize['import'](path.join(__dirname, file));
        database[model.name] = model;
    });

    Object.keys(database).forEach((modelName: string) => {
        if (database[modelName].associate) {
            database[modelName].associate(database);
        }
    });

export default database;

