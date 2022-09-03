// Helper database yang dibuat
const mysql = require('../helpers/database')
// Validation input
const Joi = require('joi')

class _artikel {
    listArtikel = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM d_artikel',
                []
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('ListArtikel artikel module Error', error)

            return {
                status: false,
                error
            }
        }
    }

    // Detail Artikel
    detailArtikel = async (id) => {
        try {
            const schema = Joi.number().required()

            const validation = schema.validate(id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detailArtikel = await mysql.query (
                'SELECT id, judul, id_user, konten, created_at, updated_at FROM d_artikel WHERE id = ?',
                [id]
            )

            if (detailArtikel.length < 1) {
                return {
                    status: false,
                    code: 404,
                    error: 'Artikel not found'
                }
            }

            return {
                status: true,
                data: detailArtikel[0]
            }

        } catch (error) {
            console.error('DetailArtikel detail module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Create Artikel
    addArtikel = async (body) => {
        try {
            const schema = Joi.object ({
                judul: Joi.string().required(),
                id_user: Joi.number().required(),
                konten: Joi.string().required(),
                
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            const add = await mysql.query (
                'INSERT INTO d_artikel (judul, id_user, konten) VALUES (?, ?, ?)',
                [body.judul, body.id_user, body.konten]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('AddArtikel artikel module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Update Artikel
    editArtikel = async (body) => {
        try {
            const schema = Joi.object ({
                id: Joi.number().required(),
                judul: Joi.string(),
                konten: Joi.string()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }
            const edit = await mysql.query (
                'UPDATE d_artikel SET judul = ?, konten = ? WHERE id = ?',
                [body.judul, body.konten, body.id]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('EditArtikel artikel module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Delete Artikel
    deleteArtikel = async (id) => {
        try {
            const body = {id}
            const schema = Joi.object ({
                id: Joi.number().required(),
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await mysql.query (
                'DELETE FROM d_artikel WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }

        } catch (error) {
            console.error('DeleteArtikel artikel module Error', error)

            return {
                status: false,
                error
            }


        }
    }

}

module.exports = new _artikel()