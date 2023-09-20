const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemon/:id', auth, (req, res) => {
     Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if (!pokemon) {
                const message = `Le pokémon demandé n'existe pas. Réessayez avec un identifiant valide.`
                return res.status(404).json({ message })
            }
            const pokemonDeleted = pokemon
            return Pokemon.destroy({ 
                where : { id: pokemon.id }
            })
            .then(_ => {
                const message = `Le pokémon ${ pokemonDeleted.name } a bien été supprimé.`
                res.json({ message, pokemonDeleted })
            })
        })
        .catch(error => {
            const message = `Le pokémon n'a pas pu être trouvé. Réessayez dans quelques instants.`
            res.status(500).json({ message })
        })
    })
}