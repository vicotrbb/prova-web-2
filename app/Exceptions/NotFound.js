'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFound extends LogicalException {
    
    constructor(message='Not found', type='NotFound', details={}) {
        super(message, 404)
        this.type = type
        this.details = details
    }

}
  
module.exports = NotFound
