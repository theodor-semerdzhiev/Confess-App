const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {validateMessage, Post} = require('./models/post');

router.post('/', async (req,res) => {
    console.log('getting request at POST /api/confess')
    const {error} = validateMessage(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let post = new Post({
        title: req.body.title,
        message: req.body.message,
        likes:0,
    })

    post = await post.save();
    
    res.send(_.pick(post, ['title','message','likes', 'date', '_id']));

});

module.exports=router;
