const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Itinerario",
    {
        id_itinerario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nm_itinerario: {
            types: DataTypes.STRING,
            allowNull: false,
        },
        diasemana:{
            type: DataTypes.INTEGER,
            allowNullNull: false,
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        id_rota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Rota",
                key: "id_rota"
            }
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;
