const curso = (sequelize, DataTypes) => {
  return sequelize.define(
    "estudante",
    {
      nome: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      cpf: {
        type: DataTypes.STRING
      },
      dataNascimento: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: "estudantes",
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm"
    }
  );
};

module.exports = curso;
