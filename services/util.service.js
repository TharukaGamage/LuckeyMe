const {to} = require('await-to-js');
const pe = require('parse-error');

class ResponseCode { }

ResponseCode.SUCCESS_OK = 200;
ResponseCode.SUCCESS_ACCEPTED = 202;
ResponseCode.SUCCESS_CREATED = 201;

ResponseCode.SERVICE_NOT_AVAILABLE = 503;

module.exports.ResponseCode = ResponseCode;

module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if (err) return [pe(err)];

    return [null, res];
};


// response error
module.exports.ReE = function (res, err, code) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({ success: false, message: err });
};

module.exports.ReS = function (res, data, code) {
    let send_data = { success: true };

    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);
    }

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data);
};

module.exports.TE = function (err_message, is_log) {
    if (is_log === true) {
        console.log(err_message);
    }

    throw new Error(err_message);

};