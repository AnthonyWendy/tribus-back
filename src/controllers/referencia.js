const Referencia = require("../models/referencia");
const Linha = require("../models/linha");

module.exports = {
    newReferencia: async (req, res) => {
        let {nm_referencia, linha} = req.body;

        if(!nm_referencia){
            return res.status(400).json({
                error: "Nome da referência inválido!"
            })
        }

        const linhaExists = await Linha.findByPk(linha);

        if(!linhaExists){
            return res.status(400).json({
                error: "Linha não encontrada!"
            });
        }

        const referenciaNew = await Referencia.create({
            nm_referencia,
            id_linha: linha,
            flsituacao: true
        });

        return res.json({
            referenciaNew
        })

    },

    updateReferencia: async (req, res) => {

    }

    
}