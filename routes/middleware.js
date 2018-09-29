exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'About', key: 'about', href: '/about' },
		{ label: 'Paintings', key: 'category', href: '/categories' },
		{ label: 'Galleries', key: 'gallery', href: '/galleries' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.companyName = "Jane Doe Fine Art"
	next();
};