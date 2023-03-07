const express = require("express");
const cors = require("cors");

const routers = require("./src/api");
const middlewares = require("./src/middlewares");

const app = express();

app.use(cors());
app.use(express.json());
app.use(middlewares.authMiddleware);
app.use(routers);

const { sequelize } = require("./src/models");

sequelize.sync().then(() => console.log("conectado com o banco de dados."));

const port = 3000;
app.listen(port);
