class CursoService {
  constructor(CursoModel) {
    this.curso = CursoModel;
    this.models = require("../models");
  }

  async get() {
    const cursos = await this.curso.findAll({
      include: {
        model: this.models.estudante,
        attributes: ["id", "nome", "email"],
      },
    });

    return cursos;
  }

  async create(cursoDTO) {
    const curso = await this.curso.findOne({
      where: {
        nome: cursoDTO.nome,
      },
    });

    if (curso) {
      throw new Error("Já existe um curso cadastrado com esse nome!");
    }

    try {
      return await this.curso.create(cursoDTO);
    } catch (erro) {
      console.error(erro.message);
      throw erro;
    }
  }
}

module.exports = CursoService;
