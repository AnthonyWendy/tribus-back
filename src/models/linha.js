const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Linha",
    {
        id_linha: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nm_linha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flsituacao: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;
