var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'Art';
    locals.painting;

    var Art = keystone.list('Art');
    var Category = keystone.list('ArtCategory');

    function getPaintingData(next, err, res) {
        //Base queries to use if category is "all"
        let countParam = {};
        let posParam = { _id: { $lt: req.params.id } };
        let currParam = { _id: req.params.id };
        let prevParam = { _id: { $lt: req.params.id } };
        let followingParam = { _id: { $gt: req.params.id } };

        //Modify the base queries to include filters if category is NOT all
        if (req.params.cat !== 'all') {
            countParam.grouping = res._id;
            posParam.grouping = res._id;
            currParam.grouping = res._id;
            prevParam.grouping = res._id;
            followingParam = res._id;
        }

        Promise.all([
            //Total
            Art.model.count(countParam),
            //Find "position" of current painting
            Art.model.find(posParam).count(),
            //Find current painting      
            Art.model.findOne(currParam),
            //Find previous painting for prev button
            Art.model.findOne(prevParam).sort({ _id: -1 }),
            //Find following painting for next button
            Art.model.findOne(followingParam).sort({ _id: 1 })
        ]).then(([total, position, current, previous, following], err) => {
            locals.painting = { total, position: position + 1, current, previous, following };
            locals.cat = res ? res.key : "all";        
            next();
        }).catch(function (err) {
            console.log(err.message);
        });
    }


    view.on('init', function (next) {
        if (req.params.cat !== 'all') {
            //Get the id of the category in the uri paramater
            var catQuery = Category.model.findOne({ key: req.params.cat }, '_id key');
            catQuery.exec(function (err, res) {
                getPaintingData(next,  err ,res)
            })
        } else {
            getPaintingData(next);
        }
    })


    view.render('painting');

};