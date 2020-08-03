require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    debug: true,
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_unicode_ci'
      },
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    seederStorage: "sequelize",
    seederStorageTableName: "seeder",
    migrationStorage: "sequelize",
    migrationStorageTableName: "migration",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_unicode_ci'
      },
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    seederStorage: "sequelize",
    seederStorageTableName: "seeder",
    migrationStorage: "sequelize",
    migrationStorageTableName: "migration",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    debug: true,
    dialectOptions: {
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_unicode_ci'
      },
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    seederStorage: "sequelize",
    seederStorageTableName: "seeder",
    migrationStorage: "sequelize",
    migrationStorageTableName: "migration",
  }
}

module.exports = config[process.env.NODE_ENV];