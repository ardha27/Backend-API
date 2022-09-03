const { Router } = require('express')
const m$artikel = require('../modules/artikel.modules')
const response = require('../helpers/response')

const ArtikelController = Router()

/**
 * Artikel
 */

ArtikelController.get('/', async (req, res, next) => {
    const list = await m$artikel.listArtikel()

    response.sendResponse(res, list) 
})

ArtikelController.get('/search', async (req, res, next) => {
    const detail = await m$artikel.detailArtikel(req.query.id)

    response.sendResponse(res, detail)
})

ArtikelController.post('/', async (req, res, next) => {
    const add = await m$artikel.addArtikel(req.body)

    response.sendResponse(res, add)
})

ArtikelController.put('/', async (req, res, next) => {
    const edit = await m$artikel.editArtikel(req.body)

    response.sendResponse(res, edit)
})

ArtikelController.delete('/:id', async (req, res, next) => {
    const del = await m$artikel.deleteArtikel(req.params.id)

    response.sendResponse(res, del)
})

module.exports = ArtikelController