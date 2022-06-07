// Implementação dos controllers das rotas de Aluno

const db = require("../models");
const Aluno = db.aluno;

// Adiciona novo aluno
exports.addAluno = (req, res)=>{
    // Valida requisicao
    if(!req.body.nro_matricula){
        res.status(400).send({
            message: "Nao foi possivel cadastrar o aluno!"
        })
        return ;
    }
    // Cria um objeto aluno
    const newAluno = new Aluno({
        nro_matricula :req.body.nro_matricula,
        nome : req.body.nome, 
        disciplinas : req.body.disciplinas
    });

    newAluno
        .save(newAluno)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message: 
                    err.message || "Erro ao criar o objeto aluno"
            });
        });
};

// Consulta Aluno por id
exports.findAluno = (req, res)=>{
    const id = req.params.id;

    Aluno.findById(id)
        .then(data =>{
            if(!data)
                res.status(404).send({message: "Aluno não encontrado"})
            else res.send(data);
        })
        .catch(err=>{
            res
                .status(500)
                .send({
                    message: "Algo deu errado ao tentar encontrar o aluno"
                });
        });
};

// Retorna todo os alunos
exports.findAllAluno = (req, res)=>{
    const nro_matricula = req.query.nro_matricula;
    var condition = nro_matricula?{nro_matricula:{ $regex : new RegExp(nro_matricula), $options: "i"}}:{};


    Aluno.find(condition)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res
                .status(500)
                .send({
                    message: "Erro ao pesquisar os alunos"
                });
        });
};

// Atualiza Aluno
exports.attAluno = (req, res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "Dados de atualização não podem ser vazios"
        });
    }

    const id = req.params.id;

    Aluno.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message: "Nao foi possivel atualizar o aluno"
                });
            }else res.send({message: "Aluno atualizado com suecsso"});
        })
        .catch(err=>{
            res.status(500).send({
                message: "Erro ao atualizar o aluno"
            });
        });
};

// Deleta Aluno
exports.delAluno = (req, res)=>{
    const id = req.params.id;

    Aluno.findByIdAndDelete(id, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message: "Aluno não encontrado"
                });
            }else res.send({message:"Aluno deletado com sucessso"});
        })
        .catch(err=>{
            res.status(500).send({
                message:"Erro ao deletar aluno"
            });
        });
};
