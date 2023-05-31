const asyncHandler=require('express-async-handler');
const  Post  = require('../models/Post_Model');
const  Reply  = require('../models/Reply_Model');
const Joi = require("joi");
const Reply_Model = require('../models/Reply_Model');
const Post_Model = require('../models/Post_Model');


function validateReply(reply) {
    const schema = Joi.object({ comment: Joi.string().required().min(3).max(5000)});
    return schema.validate(reply);
};

  


/* 
    @description This route creates reply for a post
    @method Post
    @route /api/replies/create/:id
*/


exports.createReply = asyncHandler(async(req,res) => {
    try{

        // console.log(req.params.id);
        const post_try = await Post.findById(req.params.id);

        if (!post_try) return res.status(400).json({ error: "This post does not exist" });

        const { error } = validateReply(req.body);
        if (error) return res.status(400).json({error: error.details[0].message});
        
        const post = req.params.id;
        const author = req.user._id;
        const comment= req.body.comment;
        const reply = new Reply_Model({ post,comment,author })
        await reply.save();
        
        res.send("Reply sent succesfully");
    }


    catch(err){
        console.log(err);
        return res.status(400).json({error: "Please try again to create reply"})
    }
    
})




/* 
    @description This route gets all replies for a particuar post
    @method Get
    @route /api/replies/:id
*/


exports.getRepliesById = asyncHandler(async(req,res)=>{
    try{
        const post = await Post_Model.findById(req.params.id);
        if(!post) return res.status(400).json({ error: "This post does not exist" });
        const replies = await Reply_Model
        .find({post :req.params.id})
        .populate("author","name")
        .sort({createdAt: -1})
        res.status(200).send(replies);
    }
    catch(err){
        return res.status(400).json({error: "Unable to fetch replies try later"})
    }
})





/* 
    @description This route update the upvotes of a reply
    @method Put
    @route /api/replies/like/:id
*/

exports.likeReplyById = asyncHandler(async(req,res)=>{
    try {
        const reply = await Reply_Model.findById(req.params.id)
        if(!reply) return res.status(400).json({ error: "This reply does not exist" });

        const s1= reply.author.toString();
        const s2= req.user._id.toString();
        if (s1 === s2) return res.status(400).json({error:"You can't upvote your own reply"});

        const upvoteArray = reply.upvotes;
        const index = upvoteArray.indexOf(req.user._id);
        
        if (index === -1) upvoteArray.push(req.user._id);
        else upvoteArray.splice(index, 1);
        reply.upvotes = upvoteArray;
        const result = await reply.save();
        const reply_new = await Reply_Model.find({ _id: reply._id }).populate("author","name");
        res.send(reply_new);
    } 
    catch (error) {
        res.status(400).json({error:"Error in liking given reply. Retry Again"})
    }
})