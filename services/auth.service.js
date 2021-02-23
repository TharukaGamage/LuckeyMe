const {User} = require('../models/index');
const {UserHelper} = require('../helpers/user.helper');
const {to,ReS,ReE,TE} = require('../services/util.service');
const validator = require('validator');

// Register new User 
const createUser = async function(userInfo){
    let unique_key,err;

    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key){
        TE("No phone number was enterd")
    }

    if(validator.isMobilePhone(unique_key,'any')){
        
        // userInfo.auth_method = UserHelper.AUTH_METHOD_PHONE;
        userInfo.phone = unique_key;
        
        [err,user] = await to(User.create(userInfo));
        if(err){
            TE("The phone number is Used")
        }

        return user;
    }
    else{
        TE("A valid phone number was not enterd");
    }
};
module.exports.createUser = createUser;

// get unique key from request body
const getUniqueKeyFromBody = function (body) {
    let unique_key = body.unique_key;
    if (typeof unique_key === 'undefined') {
        if (typeof body.phone != 'undefined') {
            unique_key = body.phone
        } else {
            unique_key = null;
        }
    }

    return unique_key;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;
