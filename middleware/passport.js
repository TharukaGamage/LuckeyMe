const { to, ReE, ReS, ResponseCode } = require('../services/util.service');
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

let authenticate = async function (req, res, next) {
    let bearerToken = req.headers.authorization;
    if (bearerToken !== undefined) {
        let secret = Buffer.from(process.env.JWT_ENCRYPTION, "base64");
        let token = bearerToken.split(" ")[1];
        var err, user = null;

        try {
            let decoded = jwt.verify(token, secret);
            [err , user] = await to(User.findById(decoded.user_id));
            if(err) return ReE(res,"Invalid User", ResponseCode.SUCCESS_OK)
            req.user = user;
            next();
        } catch (error) {
            req.user = null;
            return ReE(res, "Invalid User", ResponseCode.SUCCESS_OK);
        }
    } else {
        req.user = null;
        return ReE(res, "Invalid User", ResponseCode.SUCCESS_OK);
    }
}

module.exports.authenticate = authenticate;
