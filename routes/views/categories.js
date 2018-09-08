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

            results.forEach(res => {
                console.log(res)
                locals.categories.push(res)
            })
            next(err);
        })
    })

    view.render('categories');
};