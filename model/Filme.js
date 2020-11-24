//cSpell: Ignore descricao, codigobarra, preco
const mongoose = require('mongoose')

const FilmesSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    sinopse: {
        type: String,
        required: true,
    },
    diretor: {
        type: String,
        required: false,
    },
    codigobarra: {
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Filmes', FilmesSchema)