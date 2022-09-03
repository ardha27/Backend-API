const { Router } = require('express')
const m$komen = require('../modules/komentar.modules')
const response = require('../helpers/response')

const KomentarController = Router()

/**
 * Komen
 */

KomentarController.get('/', async (req, res, next) => {
    const list = await m$komen.listKomen()

    response.sendResponse(res, list) 
})

KomentarController.get('/search', async (req, res, next) => {
    const detail = await m$komen.detailKomen(req.query.id)

    response.sendResponse(res, detail)
})

KomentarController.post('/', async (req, res, next) => {
    const add = await m$komen.addKomen(req.body)

    response.sendResponse(res, add)
})

KomentarController.put('/', async (req, res, next) => {
    const edit = await m$komen.editKomen(req.body)

    response.sendResponse(res, edit)
})

KomentarController.delete('/:id', async (req, res, next) => {
    const del = await m$komen.deleteKomen(req.params.id)

    response.sendResponse(res, del)
})

module.exports = KomentarController