const Referencia = require("../models/referencia");
const Linha = require("../models/linha");

module.exports = {
    newReferencia: async (req, res) => {
        let {nm_referencia, id_linha} = req.body;

        if(!nm_referencia){
            return res.status(400).json({
                error: "Nome da referência inválido!"
            })
        }

        const linhaExists = await Linha.findByPk(id_linha);

        if(!linhaExists){
            return res.status(404).json({
                error: "Linha não encontrada!"
            });
        }

        const referenciaNew = await Referencia.create({
            nm_referencia,
            id_linha: id_linha,
            flsituacao: true
        });

        return res.json({
            referenciaNew
        })

    },

    updateReferencia: async (req, res) => {
        let { id } = req.params;
        let { nm_referencia } = req.body;
        let { fl_situacao}  = req.body;
        let { id_linha }  = req.body;

        const exitsReferencia = await Referencia.findByPk(id);

        if(!exitsReferencia){
            return res.status(400).json({
                error: "Refencia não encontrada."
            });
        }

        const referenciaUp = await Referencia.update(
            {
                nm_referencia,
                fl_situacao,
                id_linha
            },
            {
                where: {id_referencia: id}
            }
        )

    },

    getReferencia: async (req, res) => {
        let {id} = req.params;

        if(!id){
            return res.status(404).json({
                error: "Referência não encontrada!"
            });
        }

        let referencia =  await Referencia.findByPk(id);

        if(!referencia){
            return res.status(404).json({
                error: "Referência não encontrada!"
            });
        }

        const linha = await Linha.findByPk(referencia.id_linha);

        if(!linha){
            return res.status(404).json({
                error: "Linha não encontrada!"
            });
        }

        referencia.nm_linha = linha.nm_linha;

        return res.json(
            referencia
        );
    },

    getList: async (req,res) => {
        let {id_linha} = req.body;
        console.log(id_linha)
        const referencias = await Referencia.findAll(
            {
                where: {id_linha}
            }
        );

        res.json({
            referencias
        });


    },
}