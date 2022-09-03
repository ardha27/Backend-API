const UserController = require('./controllers/UserController')

// Define url API in Here
const _user = [
    ['/user', UserController]
]


// http://localhost:5001/api/user

const user = (app) => {
    _user.forEach((route) => {
        const [url, controller] = route
        app.use(`/api${url}`, controller)
    })
}

module.exports = user