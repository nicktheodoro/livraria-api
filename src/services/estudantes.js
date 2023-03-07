class EstudanteService {
  constructor(EstudanteModel) {
    this.estudante = EstudanteModel;
    this.models = require("../models");
  }

  async get() {
    const estudantes = await this.estudante.findAll({
      include: {
        model: this.models.curso
      },
    });

    return estudantes;
  }

  async create(estudanteDTO) {
    const estudante = await this.estudante.findOne({
      where: {
        email: estudanteDTO.email,
      },
    });

    if (estudante) {
      throw new Error("Já existe um estudante cadastrado com esse email!");
    }

    try {
      return await this.estudante.create(estudanteDTO);
    } catch (erro) {
      console.error(erro.message);
      throw erro;
    }
  }
}

module.exports = EstudanteService;
