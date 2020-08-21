'use strict'

const BaseModel = use('MongooseModel')

const { Schema } = use('mongoose')

class User extends BaseModel {

    static boot ({ schema }) {

        // Hashes customer password before persisting
        this.addHook('preSave', 'UserHook.hashPassword')
    }

    static get schema() {
        return {

            username: {
                type: String,
                required: true,
                trim: true
            },

            password: {
                type: String,
                required: true
            }

        }

    }

    static get schemaOptions() {
        return { collection: 'Users' }
    }

}

module.exports = User.buildModel('User')
