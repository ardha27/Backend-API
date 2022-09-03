const KomentarController = require('./controllers/KomentarController')


const _komen = [
    ['/komen', KomentarController]
]

const komen = (app) => {
    _komen.forEach((route) => {
        const [url, controller] = route
        app.use(`/api${url}`, controller)
    })
}

module.exports = komen