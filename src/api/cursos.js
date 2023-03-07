const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");

const { curso } = require("../models");

const CursoService = require("../services/cursos");
const service = new CursoService(curso);

router.get("/cursos", async (req, res) => {
  const estudantes = await service.get();
  res.status(200).json(estudantes);
});

router.post(
  "/cursos",
  body(["nome", "descricao"]).not().isEmpty().trim().escape(),
  check("cargaHoraria")
    .not()
    .isEmpty()
    .matches(/\d/)
    .withMessage("Deve ser um número válido."),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const estudanteDTO = req.body;

    try {
      const response = await service.create(estudanteDTO);
      res.status(201).json(response);
    } catch (erro) {
      console.log("erro.message", erro.message);
      res.status(400).send({ message: erro.message });
    }
  }
);

module.exports = router;
