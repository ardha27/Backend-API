const express = require('express')
const RoutesUser = require('./RoutesUser')
const RoutesArtikel = require('./RoutesArtikel')
const RoutesKomen = require('./RoutesKomen')
const response = require('./helpers/response')
const cors = require('cors')
const app = express()

// This is the route the API will call
const port = process.env.PORT || 5001

// Handle Cors
app.use(cors())

// Serialize dan Deserialize Input
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Welcome API
app.get('/', async (req, res, next) => {
    res.status(200).send({
        message: 'Welcome to My Blog API' 
    })
})

// Routes
RoutesUser(app)
RoutesArtikel(app)
RoutesKomen(app)

// Error handlers
app.use(response.errorHandler)

// App Listen
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})