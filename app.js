const express = require('express')
const mongoose = require('mongoose')
const Vaga = require('./models/Vaga')
const cors = require('cors')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
app.use(cors())

const PORT = 3000 || process.env.PORT

const DB_USER = 'lbritogit'
const DB_PASSWORD = encodeURIComponent('gy70WF0w2n97ceOR')
// mongo password: gy70WF0w2n97ceOR
// mongo username: lbritogit
// mongodb+srv://lbritogit:gy70WF0w2n97ceOR@apivagas.gdn9c9j.mongodb.net/?retryWrites=true&w=majority

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apivagas.gdn9c9j.mongodb.net/vagasapi?retryWrites=true&w=majority`)
}

app.get("/api/vagas", (req, res, next) => {
  Vaga.find()
    .exec()
    .then(vagas => {
      console.log(vagas)
      const response = {
        count: vagas.length,
        vagas: vagas.map(vaga => {
          return vaga;
        })
      };
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

app.get("/api/vagas/:vagaID", (req, res) => {
    const id = req.params.vagaID;
    Vaga.findById(id)
        .then(vaga => {
        if (vaga) {
            res.status(200).json({
                vaga: vaga,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products'
                }
            })
        } else {
            res
            .status(404)
            .json({ message: "No valid entry found for provided ID" })
        }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

app.post("/api/vagas", (req, res) => {
    const vaga = new Vaga({
        _id: new mongoose.Types.ObjectId(),
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        horas: req.body.horas,
        professores: req.body.professores,
        categorias: req.body.categorias,
        vagasDisponiveis: req.body.vagasDisponiveis,
        bolsaDisponivel: req.body.bolsaDisponivel   
    })

    vaga
        .save()
        .then(result => {
            res.status(201).json({
                message: "new vaga Created sucessfully",
                requestInfo: {
                    createdVaga: result,
                    request: {
                        type: 'GET',
                        url: `http://localhost:${PORT}/api/vagas` + result._id
                    }
                }   
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

app.listen(PORT, () => {
    console.log(`Server listening to the port ${PORT}`)
})