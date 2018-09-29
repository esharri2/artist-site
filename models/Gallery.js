var keystone = require('keystone');
var Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery');

const states = "AL, AK, AZ, AR, CA, CO, CT, DC, DE, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY";

Gallery.add({
    name: { type: String, required: true, initial: true },
    streetAddress: { type: String, label: 'Street address' },
    streetAddress2: { type: String, label: 'Street address 2' },
    city: { type: String, default: "Charlotte" },
    state: { type: Types.Select, uppercase: true, options: states, default: "NC" },
    email: { type: Types.Email },
    phone: { type: String },
    website: { type: Types.Url }
}
);

//I think this defines what shows in the adminUI
Gallery.defaultColumns = 'showPlatformAs, address';
Gallery.register();
