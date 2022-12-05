const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Rota",
    {
        id_rota: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nm_rota: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        horario: {
            type: DataTypes.TIME,
            allowNull: true
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
        url_img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = modelSchema;
