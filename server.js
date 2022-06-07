// Configuração para conexão
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());
app.use(cors(corsOptions));

// Para fazer o parse de json
app.use(express.json());

// Para fazer parse de url
app.use(express.urlencoded({extended: true}));

const db = require("./src/models");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Conectado ao banco");
    })
    .catch(err =>{
        console.log("Erro ao conectar ao banco!", err);
        process.exit();
    });

app.get("/", (req, res)=>{
    res.json({message: "Back funcionando"});
});



require("./src/routes/routes")(app);

// Define a porta

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log('Server rodando na porta ${PORT}');
})