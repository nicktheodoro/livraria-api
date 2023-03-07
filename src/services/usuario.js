const bcrypt = require("bcryptjs");
const { auth, encrypt, errors } = require("../helpers/index");

class UsuarioService {
  constructor(UsuarioModel) {
    this.usuario = UsuarioModel;
  }

  async get() {
    const usuarios = await this.usuario.findAll();

    return usuarios;
  }

  async create(usuarioDTO) {
    const { nome, email, senha } = usuarioDTO;

    const usuario = await this.usuario.findOne({
      where: {
        email: usuarioDTO.email
      }
    });

    if (usuario) {
      throw new Error("Já existe um usuário cadastrado com esse email!");
    }

    try {
      return await this.usuario.create({
        nome,
        email,
        senha: await encrypt.password(senha)
      });
    } catch (erro) {
      console.error(erro.message);
      throw erro;
    }
  }

  async login(loginDTO) {
    console.log("inside login");
    const { email, senha } = loginDTO;

    try {
      const usuario = await this.usuario.findOne({ where: { email } });

      if (!usuario) throw new Error("user not found");

      const isValid = await bcrypt.compare(senha, usuario.senha);

      if (!isValid) throw new Error("invalid password");

      usuario.senha = undefined;

      return {
        usuario,
        ...auth.generateTokens({
          id: usuario.id
        })
      };
    } catch (error) {
      const errorMsg = error.message;
      if (
        errorMsg.includes("user not found") ||
        errorMsg.includes("invalid password")
      ) {
        return errors.Unauthorized("Invalid user or password");
      }
      console.error(error);
      return errors.InternalServerError(errorMsg);
    }
  }
}

module.exports = UsuarioService;
