'use strict'

const Logger = use('Logger')
const NotFound = use('App/Exceptions/NotFound')
const payloadException = use('App/Exceptions/IncompletePayload')

const Comanda = use('App/Models/Comanda')

class ComandasController {

    /**
     * @swagger
     * /RestAPIFurb/comandas:
     *   get:
     *     summary: Lista comandas
     *     tags:
     *       - Comandas
     *     security:
     *       - ApiKey: []
     *     responses:
     *       200:
     *         description: Comandas cadastradas na base
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/getComandasResponse'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Nenhuma comanda encontrada
     */
    async getComandas({ }) {

        Logger.info('Retrieving all the comandas')
        const comandas = await Comanda.findAll()

        if (!comandas)
            throw new NotFound('Nenhuma comanda encontrada')

        return getComandasResponse.of(comandas)

    }

    /**
     * @swagger
     * /RestAPIFurb/comandas/{id}:
     *   get:
     *     summary: Retorna uma comanda especifica
     *     tags:
     *       - Comandas
     *     security:
     *       - ApiKey: []
     *     parameters:
     *       - in: path
     *         name: id
     *         description: >
     *           id da comanda
     *     responses:
     *       200:
     *         description: Retorna uma comanda em especifico
     *         schema:
     *           type: Object
     *           items:
     *             $ref: '#/definitions/getComandaResponse'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Nenhuma comanda encontrada
     */
    async getComanda({ params }) {

        Logger.info('Searching for comanda from user id: %s', params.id)
        const comanda = await Comanda.findByQuery({ idUser: params.id })

        if (!comanda)
            throw new NotFound('A comanda não foi encontrada')

        return getComandaResponse.of(comanda)

    }

    /**
     * @swagger
     * /RestAPIFurb/comandas:
     *   post:
     *     summary: Cria uma comanda
     *     tags:
     *       - Comandas
     *     security:
     *       - ApiKey: []
     *     parameters:
     *       - in: body
     *         name: payload
     *         required: true
     *         schema:
     *           $ref: '#/definitions/CreateComandaRequest'
     *     responses:
     *       200:
     *         description: Criada a comanda
     *         schema:
     *           type: Object
     *           items:
     *             $ref: '#/definitions/getComandaResponse'
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: O payload está incorreto
     */
    async createComanda({ request }) {

        const comanda = CreateComandaRequest.from(request.post())

        if (!comanda)
            throw new payloadException()

        Logger.info('Creating comanda:', comanda)
        await comanda.toComanda()

        return getComandaResponse.of(comanda)
    }

    /**
     * @swagger
     * /RestAPIFurb/comandas:
     *   put:
     *     summary: Adiciona um item a comanda
     *     tags:
     *       - Comandas
     *     security:
     *       - ApiKey: []
     *     parameters:
     *       - in: body
     *         name: payload
     *         required: true
     *         schema:
     *           $ref: '#/definitions/AppendComandaRequest'
     *     responses:
     *       200:
     *         description: O item foi adicionado
     *         schema:
     *           type: Object
     *           properties:
     *              success:
     *                  type: string
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: O payload está incorreto ou a comanda não existe
     */
    async appendComanda({ request, params }) {

        const product = AppendComandaRequest.from(request.post())

        if (!product)
            throw new payloadException()

        Logger.info('Appending product %s to comanda with id: %s', product, params.id)
        const appended = await Comanda.appendProduct(params.id, product)

        if (appended.n < 1)
            throw new NotFound('A comanda não foi encontrada')

        return { "success": { "text": "comanda atualizada" } }

    }
    
    /**
     * @swagger
     * /RestAPIFurb/comandas/{id}:
     *   delete:
     *     summary: Delete uma comanda
     *     tags:
     *       - Comandas
     *     security:
     *       - ApiKey: []
     *     parameters:
     *       - in: path
     *         name: id
     *         description: >
     *           id da comanda
     *     responses:
     *       200:
     *         description: O item foi deletado
     *         schema:
     *           type: Object
     *           properties:
     *              success:
     *              type: string
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: O payload está incorreto ou a comanda não existe
     */
    async deleteComanda({ params }) {

        if (!params.id)
            throw new payloadException('Query parameter faltando')

        const removed = await Comanda.delete(params.id)

        if (removed.n < 1)
            throw new NotFound('A comanda não foi encontrada')

        return { "success": { "text": "comanda removida" } }
    }

}

/**
* @swagger
* definitions:
*   AppendComandaRequest:
*     type: array
*     properties:
*       id:
*         type: number
*          example: 1
*       name:
*         type: string
*          example: Burger
*       price:
*         type: number
*         format: decimal
*          example: 10.2
*/
class AppendComandaRequest {

    static from(data) {
        if (!Array.isArray(data.produtos))
            throw new payloadException('Os produtos devem ser um array')

        const dto = []

        data.produtos.forEach(rec => {
            dto.push({
                id: rec.id,
                name: rec.nome,
                price: rec.preco
            })
        })

        return dto
    }

}

/**
* @swagger
* definitions:
*   CreateComandaRequest:
*     type: object
*      properties:
*        idUsuario:
*          type: string
*        nomeUsuario:
*          type: string
*        telefoneUsuario:
*          type: string
*        products:
*          type: array
*          $ref: '#/definitions/Products'
*
*   Products:
*     type: object
*     properties:
*       id:
*         type: number
*          example: 1
*       name:
*         type: string
*          example: Burger
*       price:
*         type: number
*         format: decimal
*          example: 10.2
*/
class CreateComandaRequest {

    static from(data) {
        const dto = new CreateComandaRequest()

        dto.idUser = data.idUsuario
        dto.name = data.nomeUsuario
        dto.phoneNr = data.telefoneUsuario
        dto.products = []
        data.produtos.forEach(rec => {
            dto.products.push({
                id: rec.id,
                name: rec.nome,
                price: rec.preco
            })
        })

        return dto
    }

    async toComanda() {

        await new Comanda(this).save()

        delete this.user
        return this
    }

}

/**
 * @swagger
 * definitions:
 *   getComandasResponse:
 *     type: object
 *     properties:
 *       idUsuario:
 *         type: number
 *         description: id do user
 *         example: 1
 *       nomeUsuario:
 *         type: string
 *         description: nome do usuario
 *         example: Victor
 *       telefoneUsuario:
 *         type: string
 *         description: telefone do usuario
 *         example: 47 988591570
 */
class getComandasResponse {

    static of(data) {
        const dto = []

        data.forEach(a => {
            dto.push({
                idUsuario: a.idUser,
                nomeUsuario: a.name,
                telefoneUsuario: a.phoneNr
            })
        })

        return dto
    }

}

/**
 * @swagger
 * definitions:
 *   getComandaResponse:
 *     type: object
*      properties:
*        idUser:
*          type: string
*          example: 1
*        name:
*          type: string
*          example: Victor
*        phoneNr:
*          type: string
*          example: 47 988591570
*        products:
*          type: array
*          $ref: '#/definitions/Products'
*
*   Products:
*     type: object
*     properties:
*       id:
*         type: number
*          example: 1
*       name:
*         type: string
*          example: Burger
*       price:
*         type: number
*         format: decimal
*          example: 10.2
*/
class getComandaResponse {

    static of(data) {
        const dto = new getComandaResponse()

        dto.idUsuario = data.idUser
        dto.nomeUsuario = data.name
        dto.telefoneUsuario = data.phoneNr
        dto.produtos = []
        data.products.forEach(rec => {
            dto.produtos.push({
                id: rec.id,
                nome: rec.name,
                preco: rec.price
            })
        })

        return dto
    }

}

module.exports = ComandasController
