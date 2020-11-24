
const Filme = require('../model/Filme')
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')

/**
 * Lista todos os filmes
 * localhost:4000/filmes 
 */
router.get("/", async(req, res) => {
    try{
        const filmes = await Filme.find().sort({nome:1})
        res.json(filmes)
    } catch (e){
        res.send({error: `Erro ao obter os dados dos filmes: ${e.message}`})
    }
})

 /* Insere um novo filme */

router.post("/", [
    check("nome","Informe o nome do filme").not().isEmpty(),
    check("codigobarra","Informe um código de barras no formato EAN13")
    .isNumeric()
    .isLength({min:13, max:13}),
    check("sinopse","Informe a sinopse do filme").not().isEmpty(),
    check("preco","Informe um preço válido").isFloat({min:0})
], async(req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {nome, sinopse, diretor, codigobarra, preco} = req.body
    try{
        let filme = new Filme({nome, sinopse, diretor, codigobarra, preco})
        await filme.save()
        res.send(filme)
    }catch(err){
        return res.status(500).json({
            errors : `Erro ao salvar o filme: ${err.message}`
        })
    }
})


  /* Lista um único filme pelo ID */

router.get("/:id", async(req, res) => {
    await Filme.findById(req.params.id)
    .then(filme => {
        res.send(filme)
    }).catch(err => {
        return res.status(400).send({
            message: `Erro ao obter o filme com o id ${req.params.id}`
        })
    })
})

/*Apaga um determinado filme pelo ID */

router.delete("/:id", async(req, res) => {
    await Filme.findByIdAndRemove(req.params.id)
    .then(filme => {
        res.send({message: 'Filme removido com sucesso!'})
    }).catch( err => {
        return res.status(400).send({
        message: `Não foi possível remover o filme com o id ${req.params.id}`
    })
  })
})


/* Edita o filme informado*/

router.put("/",
[
    check("nome","Informe o nome do filme").not().isEmpty(),
    check("codigobarra","Informe um código de barras no formato EAN13")
    .isNumeric()
    .isLength({min:13, max:13}),
    check("sinopse","Informe a sinopse do filme").not().isEmpty(),
    check("preco","Informe um preço válido").isFloat({min:0})
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Filme.findByIdAndUpdate(req.body._id, {
        $set: dados
    },{new: true},
        function(err, result){
            if(err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    })

module.exports = router