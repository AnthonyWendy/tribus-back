const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Referencia",
    {
        id_referencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nm_referencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_linha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Linha",
                key: "id_linha"
            }
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
