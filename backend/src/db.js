require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

module.exports =  database;