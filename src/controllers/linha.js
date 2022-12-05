const Linha = require("../models/linha.js");

module.exports = {
    
    newLinha: async (req, res) => {
        let { name } = req.body;
        
        if(!name){
            return res.status(400).json({
                error: "Nome inválido",
            });
        }

        console.log(name)

        const linha = await Linha.create({
            nm_linha: name,
            flsituacao: true
        })

        return res.json({
            linha
        })
    },

    getLinha: async (req, res) => {
        let { id } = req.params;

        if(!id){
            return res.status(400).json({
                erro:"Linha inválida"
            })
        }

        let linha = await Linha.findByPk(id);

        if(!linha){
            return res.json({
                error: "linha não encontrado"
            });
        } 

        return res.json({
            linha
        });
    },

    getList: async (req, res) => {

        const listLinha = await Linha.findAll({
            order: [["nm_linha", "desc"]],
        });

         res.json(
            listLinha
        );
    },

    updateLinha: async (req, res) => {
        let { id } = req.params;
        let { nm_linha, situacao} = req.body;

        if(!nm_linha){
            return res.status(400).json({
                error: "Nome inválido",
            });
        }
  

        const linha = await Linha.findByPk(id);

        if(!linha){
            return res.status(400).json({
                error: "Linha não existe",
            });
        }
        const linhaUp = await linha.update(
            {
                nm_linha: nm_linha,
                flsituacao: situacao
            },
            {
                where: {id_linha: id}
            }
        )

        return res.json(linhaUp);
    }
};