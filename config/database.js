'use strict'

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | MongoDB
  |--------------------------------------------------------------------------
  | web2@rHYbay2NAgKwZwzx
  */
  mongodb: {
    connectionString: 'mongodb+srv://web2:rHYbay2NAgKwZwzx@cluster0.7x3sp.mongodb.net/Cluster0?retryWrites=true&w=majority',
    connection: {
      options: {
        // All options can be found at http://mongoosejs.com/docs/connections.html
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
      debug: false
    }
  }

}
