'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class IncompletePayload extends LogicalException {
  
    constructor(msg='Payload incompleto') {
        super(msg, 400)
        this.type = 'IncompletePayload'
    }
}

module.exports = IncompletePayload
