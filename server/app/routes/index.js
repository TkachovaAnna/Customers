const customerRoutes = require('./customer_routes');
const noteRoutes = require('./note_routes');

module.exports = function (app, db) {
  customerRoutes(app, db);
  noteRoutes(app, db);
};