const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validate = require('mongoose-validator');
const userTransformer = require('../transformers/user.transform');

const UserSchema = mongoose.Schema({
    device_tokens:{
        token: {type: String},
        status: {type: String}
    },
    auth_method: {type: String},
    name:{type:String},
    email:{type:String},
    phone:{
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isNumeric',
            arguments: [7, 20],
            message: 'Not a valid phone number.',
        })]
    },
    password:{type:String},
    is_phone_verified:{type:String},
    has_shop:{type:Boolean},
    shop_id:{type:String}
});

UserSchema.methods.getJWT = function () {
    let expiration_time = parseInt(process.env.JWT_EXPIRATION);
    let secret = Buffer.from(process.env.JWT_ENCRYPTION, 'base64');
    return jwt.sign(
        {
            user_id: this._id
        },
        secret,
        {
            expiresIn: expiration_time,
            algorithm: process.env.JWT_ALGORITHM,
            keyid: process.env.JWT_KEY_ID
        });
};

UserSchema.methods.toResponse = async function () {
    return await this.toJSON();
};

UserSchema.options.toJSON  = {
    transform: async function (doc, ret, options) {
        ret.age = doc.age;
        return await userTransformer.transform(ret)
    }
};

let User = module.exports = mongoose.model('User',UserSchema)