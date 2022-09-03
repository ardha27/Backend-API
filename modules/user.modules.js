// Helper database yang dibuat
const mysql = require('../helpers/database')
// Validation input
const Joi = require('joi')

class _user {
    listUser = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM d_user',
                []
            )

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('ListUser user module Error', error)

            return {
                status: false,
                error
            }
        }
    }

    // Detail User
    detailUser = async (id) => {
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

            const detailUser = await mysql.query (
                'SELECT id, nama, username, password, created_at, updated_at FROM d_user WHERE id = ?',
                [id]
            )

            if (detailUser.length < 1) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            return {
                status: true,
                data: detailUser[0]
            }

        } catch (error) {
            console.error('DetailUser detail module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Create User
    addUser = async (body) => {
        try {
            const schema = Joi.object ({
                nama: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
                
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
                'INSERT INTO d_user (nama, username, password) VALUES (?, ?, ?)',
                [body.nama, body.username, body.password]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('AddUser user module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Update User
    editUser = async (body) => {
        try {
            const schema = Joi.object ({
                id: Joi.number().required(),
                nama: Joi.string(),
                username: Joi.string(),
                password: Joi.string()
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
                'UPDATE d_user SET nama = ?, username = ?, password = ? WHERE id = ?',
                [body.nama, body.username, body.password, body.id]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('EditUser user module Error', error)

            return {
                status: false,
                error
            }

        }
    }

    // Delete User
    deleteUser = async (id) => {
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
                'DELETE FROM d_user WHERE id = ?',
                [id]
            )

            return {
                status: true,
                data: del
            }

        } catch (error) {
            console.error('DeleteUser user module Error', error)

            return {
                status: false,
                error
            }


        }
    }

}





module.exports = new _user()