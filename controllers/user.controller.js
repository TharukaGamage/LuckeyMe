const mongoose = require('mongoose');
const User = require('../models/index');
const { to, ReE, ReS, TE, ResponseCode } = require('../services/util.service');
const err_messages = require('../messages/error.json');
const success_messages = require('../messages/success.json');
const authService = require('../services/auth.service');


const signUp = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    delete body['device_tokens'];

    if (!body.unique_key && !body.phone) {
        return ReE(res, err_messages["messages.error.empty_phone_number"]);
    }
    else if (!body.password) {
        return ReE(res, err_messages["messages.error.empty_password"]);
    }
    else {
        let err, user;

        [err, user] = await to(authService.createUser(body));
        if (err) {
            return ReE(res, err, ResponseCode.SUCCESS_ACCEPTED)
        }



        return ReS(res, {
            token: user.getJWT(),
            message: success_messages["messages.success.new_user_created"],
            user: await user.toResponse()
        }, ResponseCode.SUCCESS_CREATEDS);
    }
}

module.exports.signUp = signUp;

// update user
const updateUser = async function (req, res) {
    let err, user
    user = req.user;

    console.log(user);
    user.set(req.body);

    [err, user] = await to(user.save());
    if (err) {
        if(err.message.includes('E11000')){
            if(err.message.includes('phone')){
                err = err_messages["messages.error.phone_number_is_already_in_use"]
            }else if(err.message.includes('email')){
                err = err_messages["messages.error.email_already_in_use"]
            }else{
                err = err_messages["messages.error.duplicate_key_entry"]
            }
        }

        return ReE(res,err.message,ResponseCode.SUCCESS_ACCEPTED);
    }
    return ReS(res,{message: success_messages["messages.success.user_updated"]},ResponseCode.SUCCESS_OK);
}

module.exports.updateUser = updateUser; 