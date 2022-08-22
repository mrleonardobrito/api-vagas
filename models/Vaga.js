const mongoose = require('mongoose')

const VagaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    horas: { type: String, required: true },
    professores: { type: [String], required: true },
    categorias: { type: [String], required: true },
    vagasDisponiveis: { type: String, required: true },
    bolsaDisponivel: { type: String, required: true }
})

const Vaga = mongoose.model('Vaga', VagaSchema)

module.exports = Vaga