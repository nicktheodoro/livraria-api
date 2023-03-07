const express = require("express");

const cursosRouter = require("./cursos");
const estudantesRouter = require("./estudantes");
const usuariosRouter = require("./usuarios");

const router = express.Router();

router.get("/", (req, res) => res.send("App online!"));

router.use(cursosRouter);
router.use(estudantesRouter);
router.use(usuariosRouter);

module.exports = router;
