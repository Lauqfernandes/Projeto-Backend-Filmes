//cSpell: Ignore MONGOURI

const mongoose = require('mongoose')

//string conexão

const MONGOURI = process.env.MONGODB_URL

const InicializaMongoServer = async() => {
    try{
        await mongoose.connect(MONGOURI, { 
            useNewUrlParser: true, 
            useCreateIndex: true, 
            useFindAndModify: false, 
            useUnifiedTopology: true 
        })
        console.log('Conectado ao MongoDB')
    } catch(e){
        console.error('Não foi possível conectar ao MongoDB')
        console.error(e)
        throw e
    }
}
module.exports = InicializaMongoServer