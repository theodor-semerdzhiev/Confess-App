const mongoose = require('mongoose');
const joi = require('joi');

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        minlength:1,
        maxlength:100
    },
    message: {
        type: String,
        require: true,
        minlength:1,
        maxlength:1000
    },
    likes: {
        type:Number,
        min: 0
        
    },
    date:{
        type:Date,
        default:Date.now
    }
}));

function validateMessage(message){
    const schema = joi.object({
        title: joi.string().min(1).max(99).required(),
        message: joi.string().min(1).max(999).required(),
        likes: joi.number().min(0),
        date: joi.date()
    });
    return schema.validate(message);
}



module.exports.validateMessage=validateMessage;
module.exports.Post=Post;
