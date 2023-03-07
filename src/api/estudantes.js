const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");

const { estudante } = require("../models");

const EstudanteService = require("../services/estudantes");
const estudanteService = new EstudanteService(estudante);

router.get("/estudantes", async (req, res) => {
  const estudantes = await estudanteService.get();
  res.status(200).json(estudantes);
});

router.post(
  "/estudantes",
  body(["nome", "cpf", "dataNascimento"]).not().isEmpty().trim().escape(),
  check("email")
    .not()
    .isEmpty()
    .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .withMessage("Deve ser um email válido."),
  check("cpf")
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
      const response = await estudanteService.create(estudanteDTO);
      res.status(201).json(response);
    } catch (erro) {
      console.log("erro.message", erro.message);
      res.status(400).send({ message: erro.message });
    }
  }
);

module.exports = router;
