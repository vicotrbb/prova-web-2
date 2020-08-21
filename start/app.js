'use strict'

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  'adonis-mongoose-model/providers/MongooseProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  'adonis-swagger/providers/SwaggerProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
*/
const aliases = {}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
*/
const commands = []

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

// const namedMiddleware = {
//   auth: 'Adonis/Middleware/AuthInit'
// }

module.exports = { providers, aceProviders, aliases, commands }
