//Configuração e invocacao do model

const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.disciplina = require("./model")(mongoose);
db.aluno = require("./modelAluno")(mongoose);
module.exports = db;