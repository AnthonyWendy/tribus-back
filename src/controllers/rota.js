const { v4: uuidv4 } = require("uuid");
const jimp = require("jimp");
const { validationResult, matchedData } = require("express-validator");
const { Op } = require("sequelize");
const idRegex = /[0-9]+/;

const Rota = require("../models/rota");
const Images = require("../models/images.js");
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

const pushImg = async (img, product, isDefault = false) => {
    let url = await addImage(img.data);

    console.log("URL   ", url);
    let imgObj = await Images.create({
        url,
        default: isDefault,
        product: product.id_produto,
    });

    return;
};

module.exports = {
    newRota: async (req, res) => {
        let {nm_rota, id_linha} = req.body;
        let { referencias } = req.body;

        if(!nm_rota || !id_linha ){
            return res.json({ 
                error: "Informações inválidas!"
            });
        }

        const linhaExists = await Linha.findByPk(id_linha);
        
        if(!linhaExists){
            return res.status(400).json({
                error: "Linha não encontrada!"
            });
        }
        console.log(nm_rota)
        const rotaNew = await Rota.create({
            nm_rota,
            id_linha,
            flsituacao: true,
        });

        // if(referencias){
        //     referencias = JSON.parse(referencias);
        //     for(const referencia of referencias){
        //         const referenciaExists = await Referencia.findByPk(referencia);

        //         if(!referenciaExists){
        //             return res.status(400).json({
        //                 error: "Referencia não existe!"
        //             });
        //         }

        //         await Rotareferencia.create({
        //             id_rota: rotaNew.id_rota,
        //             id_linha: referenciaExists.id_referencia
        //         })
        //     }
        // }

        // if (!req.files || !req.files.img) {
        //     return res.json({ rotaNew });
        // }
        // if (req.files.img.length == undefined) {
        //     if (isValidMimetype(req.files.img.mimetype))
        //         await pushImg(req.files.img, rotaNew, true);
        // } else {
        //     for (let i in req.files.img)
        //         if (isValidMimetype(req.files.img[i].mimetype))
        //             await pushImg(req.files.img[i], rotaNew, i === 0);
        // }

        return res.json({
            rotaNew,
        });
    }
}