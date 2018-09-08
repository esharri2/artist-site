exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'About', key: 'about', href: '/about' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
		{ label: 'Paintings', key: 'category', href: '/categories' },
	];
	res.locals.companyName = "Jane Doe Fine Art"
	res.locals.user = req.user;
	next();
};