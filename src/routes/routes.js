// Declaração das rotas

module.exports = app =>{
    // Instanciação de controllers
    const disciplina_control = require("../controllers/controller.js");
    const aluno_control = require("../controllers/controller_aluno.js")
    
    // Instancia um objeto para fazer controle de rota
    var router = require("express").Router();
    var cors = require("cors")

    app.use(cors());
    // ---------------- Rotas de Disciplina ---------------
    // Adiciona uma disciplina
    app.post("/addDiscip", disciplina_control.addDisciplina);
    // router.post("/", disciplina_control.addDisciplina);

     // Retorna todas disciplinas
     app.get("/disciplina", disciplina_control.findTodas);

    // Consulta uma disciplina
    app.get("/disciplina/:id", disciplina_control.findDisciplina);
    // router.get("/:id", disciplina_control.findDisciplina);

   
    // Edita uma disciplina
    app.put("/editar/:id", disciplina_control.attDisciplina);
    // router.put("/:id", disciplina_control.attDisciplina);

    // Delete uma disciplina
    app.delete("/deletar/:id", disciplina_control.delDisciplina);
    // router.delete("/:id", disciplina_control.attDisciplina);

    // ------------------ Rotas de aluno ------------------
    // Adiciona uma aluno
    app.post('/addAluno', aluno_control.addAluno, function (req, res, next) {})

    // app.post("/addAluno", aluno_control.addAluno);

    // Consulta um aluno
    app.get("/aluno/:id", aluno_control.findAluno);

    // Atualiza um aluno
    app.put("/editarAluno/:id",aluno_control.attAluno);

    // Deleta um aluno
    app.delete("/deletarAluno/:id", aluno_control.delAluno);

    // Encontra todos alunos
    app.get("/aluno", aluno_control.findAllAluno);

    app.use("/api/aluno_control", router);
    app.use("/api/disciplina_control", router);
}