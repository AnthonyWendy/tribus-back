const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Rotareferencia",
    {
        id_rotareferencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_rota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Rota",
                key: "id_rota"
            }
        },
        id_referencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Referencia",
                key: "id_referencia"
            }
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;
