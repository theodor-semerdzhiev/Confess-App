const express = require('express');
const router = express.Router();
const {Post, validateMessage} = require('./models/post');
const _ = require('lodash');

//gets all messages for the home page
router.get('/', async (req,res) => {

    console.log('getting GET request at /api/')
    const messages = await Post.find().sort({date: -1}).limit(20).exec();
    if(!messages) return res.status(404).send("Currently no Posts");

    const arr=[];

    messages.forEach(element => {
        arr.push(_.pick(element, ['title','message','likes', 'date', '_id']));
    });

    res.send(arr);

});

//modify messages on the home page (for example like)
router.put('/:id', async (req,res) => {
    console.log('getting PUT request at /api/')
    const post = await Post.findByIdAndUpdate(req.params.id, {$inc: {"likes": 1}});
    if(!post) return res.status(400).send('Something went wrong');

    res.status(200).send(post);
});


module.exports= router;