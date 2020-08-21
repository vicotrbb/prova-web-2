'use strict'

const Logger = use('Logger')
const Hash = use('Hash')

const UserHook = exports = module.exports = {}

UserHook.hashPassword = async (user) => {
    Logger.debug("Hashing customer password '%s'", user.id);
    user.password = await Hash.make(user.password);
}
