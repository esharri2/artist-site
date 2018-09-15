var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'Art';
    locals.painting;

    console.log(req.params);

    var Art = keystone.list('Art');  

    view.on('init', function (next) {


        var q = Art.model.find();
        // var q = Art.model.find({'grouping.name': 'Trees'}).populate("grouping").where({'grouping.name': 'Trees'});

        q.exec(function(err,results){
            console.log(results);
        })


        // Promise.all([
        //     // Art.model.countDocuments({name:'Trees'}),
        //     Art.model.findOne({ _id: req.params.id }).populate("grouping"),
        //     Art.model.findOne({ _id: { $lt: req.params.id } }).sort({ _id: -1 }).populate("grouping"),
        //     Art.model.findOne({ _id: { $gt: req.params.id } }).sort({ _id: 1 }).populate("grouping")
        // ]).then(([current, previous, following]) => {                    
        //     locals.painting = {current, previous, following };
        //     next();
        // }).catch(function (err) {
        //     console.log(err.message);
        // });
    })

    view.render('painting');

};