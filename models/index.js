const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path')
const basename = path.basename(__filename);
const models = {};

// mongo DB connection

if(process.env.MONGO_ATLAS_USERNAME!==''){

    let files = fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        var filename = file.split('.')[0];
        var model_name = filename.charAt(0).toUpperCase() + filename.slice(1);
        models[model_name] = require('./' + file);
    });

mongoose.Promise = global.Promise; //set mongo up to use promises

    mongoose.connect('mongodb+srv://LuckeyMeDB:'
    + process.env.MONGO_ATLAS_PW
    + '@luckeymecluster.s4u9p.mongodb.net/' + process.env.MONGO_ATLAS_USERNAME
    + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch((err)=>{
    console.log("couldnt connect to the Mongodb");
});
}

module.exports = models;