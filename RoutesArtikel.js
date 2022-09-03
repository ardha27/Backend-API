const ArtikelController = require('./controllers/ArtikelController')


const _artikel = [
    ['/artikel', ArtikelController]
]

const artikel = (app) => {
    _artikel.forEach((route) => {
        const [url, controller] = route
        app.use(`/api${url}`, controller)
    })
}

module.exports = artikel