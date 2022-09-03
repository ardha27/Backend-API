const { Router } = require('express')
const m$user = require('../modules/user.modules')
const response = require('../helpers/response')

const UserController = Router()

/**
 * User
 */

UserController.get('/', async (req, res, next) => {
    const list = await m$user.listUser()

    response.sendResponse(res, list) 
})

UserController.get('/search', async (req, res, next) => {
    const detail = await m$user.detailUser(req.query.id)

    response.sendResponse(res, detail)
})

UserController.post('/', async (req, res, next) => {
    const add = await m$user.addUser(req.body)

    response.sendResponse(res, add)
})

UserController.put('/', async (req, res, next) => {
    const edit = await m$user.editUser(req.body)

    response.sendResponse(res, edit)
})

UserController.delete('/:id', async (req, res, next) => {
    const del = await m$user.deleteUser(req.params.id)

    response.sendResponse(res, del)
})

module.exports = UserController