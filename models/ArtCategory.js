var keystone = require('keystone');
var Types = keystone.Field.Types;

var ArtCategory = new keystone.List('ArtCategory', {
    autokey: { from: 'name', path: 'key', unique: true },
});

ArtCategory.add({
    name: { type: String, required: true },
    description: { type: String },
    thumb: { type: Types.CloudinaryImage }
});

ArtCategory.relationship({ ref: 'Art', refPath: 'grouping' });

ArtCategory.register();
