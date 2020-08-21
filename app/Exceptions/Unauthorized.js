'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class Unauthorized extends LogicalException {
  
    constructor(account, message='Usuário não autorizado.') {
        super(message, 401)
        this.type = 'Unauthorized'
    }

}

module.exports = Unauthorized
