const express = require("express");
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express();
const port = process.env.PORT || 8000;

app
    .use(favicon(__dirname + '/pikachu.ico'))
    .use(bodyParser.json())

    sequelize.initDb()
    app.get('/', (req, res) => {
        res.json('Hello, Heroku 😍🤣🤣🤣🤣🤣😘⛔🙅🙅🙅🙅')
    })
    require('./src/routes/findAllPokemons')(app)
    require('./src/routes/findPokemonByPk')(app)
    require('./src/routes/createPokemon')(app)
    require('./src/routes/updatePokemon')(app)
    require('./src/routes/deletePokemon')(app)
    require('./src/routes/login')(app)

    app.use(({ res }) => {
        const message = `Impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL.`
        res.status(404).json({ message })
    })

app.listen(port, () => console.log('connexion au serveur correctement effectuée'))