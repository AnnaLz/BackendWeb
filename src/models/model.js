// Model de Disciplina

module.exports = mongoose =>{
    var schema = mongoose.Schema(
        {
            codigo: String,
            nome: String,
            creditos: Number
        },
        {timestamps: true}
    );
    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Disciplina = mongoose.model("disciplina", schema);
    return Disciplina;
}

