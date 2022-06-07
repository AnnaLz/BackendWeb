// Model de aluno

const { Schema } = require("mongoose");

module.exports = mongoose=> {
    var schema = mongoose.Schema(
        {
            nro_matricula:{
                type: String,
                required : true
            }, 
            nome:{
                type: String,
                required: true
            },
            disciplinas:[
                {type: Schema.Types.Mixed, ref: 'disciplina'},
                {required: false}
            ]
        },
        {timestamps: true}
    );
    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Aluno  = mongoose.model("aluno", schema);
    return Aluno;
    
}