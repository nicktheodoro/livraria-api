const curso = (sequelize, DataTypes) => {
  return sequelize.define(
    "curso",
    {
      nome: {
        type: DataTypes.STRING
      },
      descricao: {
        type: DataTypes.STRING
      },
      cargaHoraria: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: "cursos",
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm"
    }
  );
};

module.exports = curso;
