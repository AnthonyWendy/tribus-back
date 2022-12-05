const { v4: uuidv4 } = require("uuid");
const jimp = require("jimp");
const { validationResult, matchedData } = require("express-validator");
const { Op } = require("sequelize");
const idRegex = /[0-9]+/;

const Rota = require("../models/rota");
const Linha = require("../models/linha.js");
const Referencia = require("../models/referencia.js");
const Rotareferencia = require("../models/rotareferencia.js");


const addImage = async (buffer) => {
    const newName = `${uuidv4()}.jpg`;
    const tmpImg = await jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
    return newName;
};

const isValidMimetype = (mimetype) => {
    const mimetypes = ["image/jpeg", "image/jpg", "image/png"];

    if (mimetypes.includes(mimetype)) return true;

    return false;
};

module.exports = {
    newRota: async (req, res) => {
        let { nm_rota, linha, horario } = req.body;
        let { referencias } = req.body;

        console.log(req.body)

        if (!nm_rota || !linha) {
            return res.json({
                error: "Informações inválidas!"
            });
        }

        const linhaExists = await Linha.findByPk(linha);

        if (!linhaExists) {
            return res.status(400).json({
                error: "Linha não encontrada!"
            });
        }

        if (!req.files || !req.files.img || !isValidMimetype(req.files.img.mimetype)) {
            return res.status(400).json({
                error: "Imagem inválida."
            });
        }

        const url = await addImage(req.files.img.data);

        const rotaNew = await Rota.create({
            nm_rota,
            id_linha: linha,
            horario,
            flsituacao: true,
            url_img: url
        })


        if (referencias) {
            console.log("anthony")
            referencias = JSON.parse(referencias);

            rotaNew.dataValues.referencias = []

            for (const referencia of referencias) {
                const referenciaExists = await Referencia.findByPk(referencia);

                if (!referenciaExists) {
                    return res.status(400).json({
                        error: "Referencia não existe!"
                    });
                }

                const referenciasNew = await Rotareferencia.create({
                    id_rota: rotaNew.id_rota,
                    id_referencia: referenciaExists.id_referencia
                })
                rotaNew.dataValues.referencias.push(referenciasNew);
            }
        }

        return res.json({
            rotaNew,
        });
    },

    updateRota: async (req, res) => {
        let { id } = req.params;
        let { name_rota, linha } = req.body;

        if (!id) {
            return res.status(400).json({
                error: "Rota inválida"
            })
        }

        const rota = await Rota.findByPk(id);

        if (!rota) {
            return res.status(400).json({
                error: "Rota não existe",
            });
        }

        let updates = {};

        if (name_rota != rota.nm_rota) updates.nm_rota = name_rota;
        if (linha != rota.id_linha) updates.linha = linha;

        if (req.files && req.files.img) {
            if (
                ["image/jpeg", "image/jpg", "image/png"].includes(
                    req.files.img.mimetype
                )
            ) {
                let url = await addImage(req.files.img.data);
                updates.url_img = url
            }
        }

        console.log(updates);
        await rota.update(updates);
        return res.json({ rota });
    },

    getRota: async (req, res) => {
        let { id } = req.params;

        const rota = await Rota.findByPk(id);

        const referenciasRota = await Rotareferencia.findAll({
            where: {
                id_rota: id
            }
        });

        return res.json({
            rota
        });
    },

    getList: async (req, res) => {

        let rotas = [];
        let refe = [];


        rotas = await Rota.findAll();

        for (const rota of rotas) {

            const referenciasSearch = await Rotareferencia.findAll({
                where: {
                    id_rota: rota.id_rota
                }
            });

        }

        return res.json({
            rotas
        });
    },

    getReferencias: async (req, res) => {
        let { id } = req.params;
        let refe = [];

        const referenciasSearch = await Rotareferencia.findAll({
            where: {
                id_rota: id
            }
        });

        for (const encontradas of referenciasSearch) {
            const value = await Referencia.findByPk(encontradas.id_referencia);
            refe.push(value)
        }

        return res.json(
            refe
        );
    }


}