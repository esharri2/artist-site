var keystone = require('keystone');
var async = require('async');

module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'contact';
    locals.contacts = [];

    var Contact = keystone.list('Contact');

    view.on('init', function (next) {
        var q = Contact.model.find();
        q.exec(function (err, results) {
            results.forEach(res => {
                let iconName;
                const platform = res.platform.toLowerCase();

                switch (platform) {
                    case 'email':
                        iconName = "fas fa-envelope";
                        break;
                    case 'twitter':
                        iconName = "fab fa-twitter";
                        break;
                    case 'facebook':
                        iconName = "fab fa-facebook";
                        break;
                    case 'instagram':
                        iconName = "fab fa-instagram";
                        break;
                }
                res.icon = iconName;
                locals.contacts.push(res)
            })
            next(err);
        })
    })

    view.render('contact');
};