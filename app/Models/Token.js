'use strict'

const TokenMongoose = use('AdonisMongoose/Src/Token')

const { ObjectId } = use('mongoose').Schema.Types

class Token extends TokenMongoose {

    static expires () {
        
        return 1   // 1 hour
    }

    static get schema () {

        return {
            uid: { type: ObjectId, ref: 'Users' },
            token: { type: String, required: true },
            type: { type: String, required: true },
            expires: { type: Date, default: () => DateUtils.nowAddDays(this.expires()) }
        }
    }

    static get schemaOptions() {

        return {
           collection: 'tokens',
        }
  }

    static getUserFields (type) {

        return 'username password'
    }
}

module.exports = Token.buildModel('Token')