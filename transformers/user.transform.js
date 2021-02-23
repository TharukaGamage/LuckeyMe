var _ = require('lodash');

module.exports.transform = async function(ret){

    ret.device_tokens = ret.device_tokens=== undefined? null : ret.device_tokens;
    ret.auth_method = ret.auth_method === undefined ? null : ret.auth_method;
    ret.name = ret.name === undefined? null: ret.name;
    ret.email = ret.email === undefined? null : ret.email;
    ret.phone = ret.phone===undefined? null:ret.phone;
    ret.password  = ret.password===undefined? null:ret.password;
    ret.is_phone_verified = ret.is_phone_verified===undefined? null:ret.is_phone_verified;
    ret.has_shop=ret.has_shop=== undefined? null:ret.has_shop;
    ret.shop_id = ret.shop_id===undefined? null:ret.shop_id;

    // rename
    ret.id  = ret._id;

    // delete
    delete ret.password;
    delete ret.device_tokens;
    delete ret._id;
    delete ret.__v;

    return ret;

}