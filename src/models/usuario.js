const curso = (sequelize, DataTypes) => {
  return sequelize.define(
    "usuario",
    {
      nome: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      senha: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: "usuarios",
      createdAt: "criadoEm",
      updatedAt: "atualizadoEm"
    }
  );
};

module.exports = curso;
