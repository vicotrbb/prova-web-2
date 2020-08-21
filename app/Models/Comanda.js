'use strict'

const BaseModel = use('MongooseModel')

const { Schema } = use('mongoose')

/** 
*  @swagger
*  definitions:
*    Comanda:
*      type: object
*      properties:
*        idUser:
*          type: string
*        name:
*          type: string
*        phoneNr:
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
*       name:
*         type: string
*       price:
*         type: number
*         format: decimal
*/
class Comanda extends BaseModel {

    static boot({ schema }) {
        Comanda._setupStatics(schema)
    }

    static get schema() {
        return {

            idUser: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true,
                trim: true
            },

            phoneNr: {
                type: String,
                required: true,
                trim: true
            },

            products: [
                {
                    id: Number,
                    name: String,
                    price: Schema.Types.Decimal
                }
            ]

        }

    }

    static get schemaOptions() {
        return { collection: 'Comandas' }
    }

    static _setupStatics(schema) {

        /**
         * Returns the comanda on query based search
         *
         * @param { Object } query - query
         * @returns { Comandas } comanda
         */
        schema.statics.findByQuery = function (query) {

            return this.findOne(query)
        }

        /**
         * Return all
         *
         * @returns { [Comandas] } comanda list
         */
        schema.statics.findAll = function () {

            return this.find({})
        }

        /**
         * Updates comanda
         *
         * @param { Object } product - product
         */
        schema.statics.appendProduct = function (idUser, product) {

            return this.updateOne(
                { idUser },
                { $push: { products: product } }
            )
            
        }

        /**
         * Removes comanda
         *
         * @param { Object } id - comanda ID
         */
        schema.statics.delete = function (idUser) {

            return this.remove({
                idUser
            })
        }
    }

}

module.exports = Comanda.buildModel('Comanda')
