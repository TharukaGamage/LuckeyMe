const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    shop_id:mongoose.Schema.Types.ObjectId,
    shop_name:{type:String},
    shop_intro:{type:String},
    catagory:{type:String ,enum:['food','clothing']},
    geo_fence:{
        radius:{type:Number},
        lat:{type:Number},
        lng:{type:Number},
        geofence_id:{type:Number}
    }
});

let Shop = module.exports = mongoose.model("Shop", ShopSchema);