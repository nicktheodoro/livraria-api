const sequelize = require("../configs/sequelize");
const Sequelize = require("sequelize");

const Curso = require("./curso");
const Estudante = require("./estudante");
const Usuario = require("./usuario");

//  ********* ENTIDADES *********
const curso = Curso(sequelize, Sequelize.DataTypes);
const estudante = Estudante(sequelize, Sequelize.DataTypes);
const usuario = Usuario(sequelize, Sequelize.DataTypes);

//  ********* RELACIONAMENTOS *********
// ONE TO MANY
curso.hasMany(estudante);
estudante.belongsTo(curso);

// MANY TO MANY
// curso.belongsToMany(estudante, { through: "CursoEstudante" });
// estudante.belongsToMany(curso, { through: "CursoEstudante" });

const db = {
  curso,
  estudante,
  usuario,
  sequelize,
};

module.exports = db;
