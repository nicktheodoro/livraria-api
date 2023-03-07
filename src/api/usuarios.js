const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");

const { usuario } = require("../models");

const UsuarioService = require("../services/usuario");
const usuarioService = new UsuarioService(usuario);

router.get("/usuarios", async (req, res) => {
  const usuarios = await usuarioService.get();
  res.status(200).json(usuarios);
});

router.post(
  "/usuarios",
  body(["nome", "email", "senha"]).not().isEmpty().trim().escape(),
  check("email")
    .not()
    .isEmpty()
    .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .withMessage("Deve ser um email válido."),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const estudanteDTO = req.body;

    try {
      const response = await usuarioService.create(estudanteDTO);
      res.status(201).json(response);
    } catch (erro) {
      console.log("erro.message", erro.message);
      res.status(400).send({ message: erro.message });
    }
  }
);

router.post(
  "/login",
  body(["email", "senha"]).not().isEmpty().trim().escape(),
  check("email")
    .not()
    .isEmpty()
    .matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .withMessage("Deve ser um email válido."),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usuarioDTO = req.body;

    try {
      const response = await usuarioService.login(usuarioDTO);
      res.status(200).json(response);
    } catch (erro) {
      console.log("erro.message", erro.message);
      res.status(400).send({ message: erro.message });
    }
  }
);

module.exports = router;
