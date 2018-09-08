var keystone = require('keystone');
var Types = keystone.Field.Types;

var Art = new keystone.List('Art', {
    map: { name: 'title' },
    label: "Paintings",
    singular:"Painting",
    plural: "Paintings"
});

Art.add({
	title: { type: String, required: true, initial:true },
    medium: { type: String},
    dimensions: {type: String},
    image:{ type: Types.CloudinaryImage },
    grouping: { type: Types.Relationship, ref: 'ArtCategory', many: false },
});

Art.defaultColumns = 'title';
Art.register();
