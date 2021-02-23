const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const CommercialSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    image_url: {type: String},
    publisher: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: {type: String},
    shop_intro: {type: String},
    caption: {type:String},
    likes:{
        liked_by:{type:String},
        count:{type:Number}
    },
    geo_fence: {
        radius:{type:Number},
        lat:{type:String},
        lng:{type:String},
        geo_fence_id:{type:String}
    }
});

CommercialSchema.plugin(paginate);

let Commercial = module.exports = mongoose.model('Commercial',CommercialSchema);

