var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {

    let category = req.params.category;
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'Art';

    var Art = keystone.list('Art');

    view.on('init', function (next) {
        var q = Art.model.find().populate("grouping");
        q.exec(function (err, results) {

            let filteredResults = [];
         
            if (req.params.category) {
                filteredResults = results.filter(result=> result.grouping.key === req.params.category);
            } else {
                filteredResults = results
            }

            const numOfColumns = 3;

            //To do - create these dynamically based on "numOfColumns"
            const columns = {
                col1: [],
                col2: [],
                col3: []
            }
            const col1 = [];
            const col2 = [];
            const col3 = [];

            const columnQuantity = filteredResults.length / numOfColumns;

            filteredResults.forEach((painting, index) => {
                if (index >= 0 && index < columnQuantity) {
                    columns.col1.push(painting)
                } else if (index >= columnQuantity && index < columnQuantity * 2) {
                    columns.col2.push(painting)
                } else {
                    columns.col3.push(painting)
                }
            })
            locals.paintings = columns;
            next(err);
        })
    })
    view.render('paintings');
};