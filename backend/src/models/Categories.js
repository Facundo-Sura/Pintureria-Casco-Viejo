const { DataTypes } = require('sequelize');
const database = require('../db.js');

const Category = database.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
    tableName: "Categories",
    timestamps: false,
    }
);

module.exports = Category;