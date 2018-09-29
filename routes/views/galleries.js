var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'gallery';
 
    var Gallery = keystone.list('Gallery');

    view.on('init', function (next) {
        var q = Gallery.model.find();
        q.exec(function(err, results){
            locals.galleries = results;
            next(err);
        })
      })

    view.render('galleries');
  };