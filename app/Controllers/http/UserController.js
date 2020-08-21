'use strict'

const User = use('App/Models/User')
const Unauthorized = use('App/Exceptions/Unauthorized')

class UserController {

    /**
     * @swagger
     * /auth/signin:
     *   put:
     *     summary: Verifica o user
     *     tags:
     *       - auth
     *     parameters:
     *       - in: body
     *         name: payload
     *         required: true
     *         properties:
     *             username:
     *                 type: string
     *                 example: victor
     *             password:
     *                 type: string
     *                 example: 12345
     *     responses:
     *       200:
     *         description: O item foi adicionado
     *         schema:
     *           type: Object
     *           properties:
     *              token:
     *                  type: uuid
     *       404:
     *         description: O payload está incorreto
     */
    async login({ auth, request }) {
        const { username, password } = request.all()
        try {
            return await auth
                .attempt(username, password)
        }
        catch (e) {
            console.log(e)
            throw new Unauthorized()
        }
    }

}

module.exports = UserController
