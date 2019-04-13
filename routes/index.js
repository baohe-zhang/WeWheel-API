/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router, passport) {
  app.use('/api', require('./home.js')(router));

  var user = require('../routes/usersController')

  //User functions
  app.route('/api/users/register')
    .post(user.create_a_user)
  app.route('/api/users/login')
    .get(passport.authenticate('local'), user.auth_a_user)
  app.route('/api/users/logout')
    .post(user.log_out_user)
  app.route('/api/users/:userId')
    .post(user.update_a_user)





};