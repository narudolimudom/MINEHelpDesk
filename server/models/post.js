const mongoose = require('mongoose');

const postSchema =  mongoose.Schema({
    title:String,
    description:String,
    status:String,
    fullname:String,
    email:String,
    phone:String,

},{timestamps:true, versionKey: false})

module.exports = mongoose.model('Post', postSchema);