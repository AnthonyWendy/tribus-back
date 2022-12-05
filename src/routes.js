const express = require("express");
const router = express.Router();

const Auth = require("./middlewares/auth.js");

const AuthValidator = require("./validators/auth.js");


const AuthController = require("./controllers/auth.js");
const RotaController = require("./controllers/rota.js");
const LinhaController = require("./controllers/linha.js");
const ReferenciaController = require("./controllers/referencia.js");

router.get("/ping", (req, res) => {
    res.json({ pong: true });
});

//linha
router.get("/linha/", LinhaController.getList);
router.get("/linha/:id", LinhaController.getLinha);
router.post("/linha/new",  LinhaController.newLinha);
router.put("/linha/:id", LinhaController.updateLinha);

//rota
router.get("/rota/", RotaController.getList);
router.get("/rota/:id", RotaController.getRota);
router.post("/rota/new", RotaController.newRota);
router.put("/rota/:id", RotaController.updateRota);
router.get("/referenciassearch/:id", RotaController.getReferencias);

//referencia
router.post("/referencia/new",  ReferenciaController.newReferencia);
router.get("/referencia/:id", ReferenciaController.getReferencia);
router.post("/referencias/", ReferenciaController.getList);
router.put("/referencia/", ReferenciaController.updateReferencia);

// AUTH
router.post("/user/signin", AuthValidator.signin, AuthController.signin);
// CREATE
router.post(
    "/user/signup",
    AuthValidator.signup,
    AuthController.signup
);
// READ
router.get("/user/list", Auth.private, AuthController.getList);
// UPDATE
router.put(
    "/user/:id",
    Auth.private,
    AuthValidator.update,
    AuthController.update
);
// DELETE
router.post("/user/delete", Auth.private, AuthController.delete);




module.exports = router;
