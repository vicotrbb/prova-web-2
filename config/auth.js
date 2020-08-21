'use strict'

const Env = use('Env')

module.exports = {

  authenticator: 'jwt',

  jwt: {
    serializer: 'mongoose',
    model: 'App/Models/User',
    scheme: 'jwt',
    uid: 'username',
    password: 'password',
    options: {
      secret: Env.get('APP_KEY')
    }
  }

}
