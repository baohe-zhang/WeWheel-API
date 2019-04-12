/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    
    var user = require('../routes/usersController')
    //User functions
    app.route('/api/users/register')
      .post(user.create_a_user)
    app.route('/api/users/login')
      .post(user.auth_a_user)
    app.route('/api/users/:userId')
      .get(user.read_a_user)
      .put(user.update_a_user)
      
    

};
