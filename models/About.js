var keystone = require('keystone');
var Types = keystone.Field.Types;

var About = new keystone.List('About',
	{
		nocreate: true,
		nodelete: true,
		label: "About",
		path: "about",
		sortable:false,
		map: { name: 'title' }
	});

About.track = {
	updatedAt: true,
	updatedBy: true,
}

About.add({
	title: { type: String, initial:true },
	content:{ type: Types.Html, wysiwyg: true },
});

About.register();
