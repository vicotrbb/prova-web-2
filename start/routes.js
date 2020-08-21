'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//////////////////////////////////
////////       AUTH       ////////
//////////////////////////////////

Route.group(() => {
    Route.post('signin', 'UserController.login')
}).prefix('auth')

//////////////////////////////////
////////     COMANDAS     ////////
//////////////////////////////////

Route.group(() => {
    Route.get('comandas', 'ComandasController.getComandas')
    Route.get('comandas/:id', 'ComandasController.getComanda')
    Route.post('comandas', 'ComandasController.createComanda')
    Route.put('comandas/:id', 'ComandasController.appendComanda')
    Route.delete('comandas/:id', 'ComandasController.deleteComanda')
}).prefix('RestAPIFurb').middleware('auth')
