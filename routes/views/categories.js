var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'category';
    locals.categories = [];

    var Category = keystone.list('ArtCategory');

    view.on('init', function (next) {
        var q = Category.model.find();
        q.exec(function (err, results) {
            //TODO can just asign the results array to locals
            results.forEach(res => {
                locals.categories.push(res)
            })
            console.log(locals.categories)
            next(err);
        })
    })

    view.render('categories');
};