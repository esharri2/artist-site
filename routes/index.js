var keystone = require('keystone');
var importRoutes = keystone.importer(__dirname);
var middleware = require('./middleware');

//Sets up navLinks object for default template
keystone.pre('routes', middleware.initLocals);

//Import route controllers
var routes = {
  views: importRoutes('./views'),
};

//Setup route bindings
exports = module.exports = function (app) {
  app.get('/', routes.views.index);
  app.get('/about', routes.views.about);
  app.get('/contact', routes.views.contact);
  app.get('/categories', routes.views.categories);
  app.get('/galleries', routes.views.galleries);
  app.get('/paintings/:category', routes.views.paintings);
  app.get('/paintings/painting/:cat/:id', routes.views.painting)
};