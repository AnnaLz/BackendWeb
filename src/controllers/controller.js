// Implementação dos controllers de rotas da Disciplina

const db = require("../models");
const Disciplina = db.disciplina;

// Adiciona uma nova disciplina
exports.addDisciplina = (req, res) =>{
    // Valida a requisicao
    if(!req.body.codigo){
        res.status(400).send({message:"Codigo não pode ser vazio!"})
        return; 
    }
    // Cria uma disciplina
    const newDisciplina = new Disciplina({
        codigo : req.body.codigo,
        nome: req.body.nome,
        creditos: req.body.creditos
    });

    // Salva a disciplina no banco
    newDisciplina
        .save(newDisciplina)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message ||"Erro na criação do objeto disciplina!"
            });
        });
};

// Deleta uma disciplina 
exports.delDisciplina = (req, res)=>{
    const codigo = req.params.id;

    Disciplina.findByIdAndRemove(codigo, {useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: "Nao encontrei disciplina com este id"
                });
            }else{
                res.send({
                    message: "Disciplina deletada"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Nao consegui deletar a disciplina"
            });
        });
};

// Atualiza uma disciplina
exports.attDisciplina = (req, res) =>{
    if(!req.body){
        return res.status(400).send({
            message: "Faltam dados para atualizacao"
        });
    }
    
    const id = req.params.id;

    Disciplina.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: 'Nao foi possivel atualizar a disciplina'
                });
            }else res.send({message: "Disciplina atualizada com sucesso"});
        })
        .catch(err=>{
            res.status(500).send({
                message: "Erro ao atualizar a disciplina"
            });
        });
};

// Consulta uma disciplina
exports.findDisciplina = (req, res) =>{
    const id = req.params.id;

    Disciplina.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message:"Disciplina nao encontrada"});
            else res.send(data);
        })
        .catch(err =>{
            res
                .status(500)
                .send({message: "Erro ao encontrar a disciplina"});
        });
};

// Retorna todas as disciplinas
exports.findTodas = (req, res)=>{
    Disciplina.find({}, (err, data) => {
        if (err) {
        res.status(500).send({ message: "Algo deu errado. Tente novamente." });
        }
        res.status(200).json(data);
        });
};