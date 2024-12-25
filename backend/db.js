// Connected to MongoDB
const mongoose = require('mongoose');

const MongoURI = "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongoose = () => {
    mongoose.connect("mongodb://localhost:27017", () => {
        console.log("Connected to Mongo");
    });
}
module.exports = connectToMongoose;

