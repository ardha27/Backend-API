// Helper database yang dibuat
const mysql = require('../helpers/database')
// Validation input
const Joi = require('joi')

class _komen {
    listKomen = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM d_komen',
                []
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('ListKomen Komen module Error', error)

            return {
                status: false,
                error
            }
        }
    }

    // Detail Komen
    detailKomen = async (id) => {
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

            const detailKomen = await mysql.query (
                'SELECT id, id_user, id_artikel, komen, created_at, updated_at FROM d_komen WHERE id = ?',
                [id]
            )

            if (detailKomen.length < 1) {
                return {
                    status: false,
                    code: 404,
                    error: 'Komen not found'
                }
            }

            return {
                status: true,
                data: detailKomen[0]
            }

        } catch (error) {
            console.error('DetailKomen detail module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Create Komen
    addKomen = async (body) => {
        try {
            const schema = Joi.object ({
                id_user: Joi.number().required(),
                id_artikel: Joi.number().required(),
                komen: Joi.string().required(),
                
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
                'INSERT INTO d_komen (id_user, id_artikel, komen) VALUES (?, ?, ?)',
                [body.id_user, body.id_artikel, body.komen]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('AddKomen Komen module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Update Komen
    editKomen = async (body) => {
        try {
            const schema = Joi.object ({
                id: Joi.number().required(),
                komen: Joi.string()
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
                'UPDATE d_komen SET komen = ? WHERE id = ?',
                [body.komen, body.id]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('EditKomen Komen module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Delete Komen
    deleteKomen = async (id) => {
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
                'DELETE FROM d_komen WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }

        } catch (error) {
            console.error('DeleteKomen Komen module Error', error)

            return {
                status: false,
                error
            }


        }
    }

}

module.exports = new _komen()