const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemon/:id', auth,  (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if (pokemon === null) {
                const message = `Le pokémon n'existe pas. Réessayez avec un autre identifiant.`
                return res.status(404).json({ message })
            }
            const message = `Le pokémon ${ pokemon.name } a bien été récupéré.`
            res.json({ message: message, data: pokemon })
        })
        .catch(error => {
            const message = `Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        })
    })
}