const asyncHandler=require('express-async-handler');
const Post_Model = require('../models/Post_Model');
const {  validatePost } = require('../models/Post_Model');
const User_Model = require('../models/User_Model');




/* 
    @description This route gives all posts in database
    @method Get
    @route /api/posts/
*/

exports.getAllPosts = asyncHandler(async(req,res) => {
    try {
        const pageSize = 5
        const page = Number(req.query.pageNumber) || 1 
        const count = await Post_Model.count()

        let all_posts = await Post_Model
        .find()
        .populate("author","name _id")
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1));
        
        res.status(200).json({all_posts,page,pages: Math.ceil(count/pageSize)});

    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error in fetching all posts"})
    }
})



/* 
    @description This route gives a specific post in database
    @method Get
    @route /api/posts/:id
*/

exports.getPostById = asyncHandler(async (req, res) => {
    try {
        // console.log('aaya');
        const post = await Post_Model.find({ _id: req.params.id }).populate("author","name");
        res.status(200).send(post[0]);
    } 
    catch (err) {
        res.status(400).json({error:"Error in fetching given post. Retry Again"})
    }
})



/* 
    @description This route creates a specific post in database
    @method Post
    @route /api/posts/create
*/



exports.createPost = asyncHandler(async (req, res) => {
  
    try {

        const post = new Post_Model({
            title: req.body.title,
            description: req.body.description,
            author: req.user._id,
        });

     
        await post.save();
        res.send(post);
    } 
    
    catch (err) {
        console.log(err);
    
        res.status(400).json({error:"Error in creating given post. Retry Again"})
    }

})



/* 
    @description This route updtates the upvotes of a specific post
    @method Put
    @route /api/posts/like/:id
*/


exports.likePost = asyncHandler(async(req,res)=> {

    try {

        const post = await Post_Model.findById(req.params.id);
        if (!post) return res.status(400).send("Post doesn't exists");
        
        const s1= post.author.toString();
        const s2= req.user._id.toString();
 
        if (s1 === s2) return res.status(400).json({error:"You can't upvote your own post"});
    
        const upvoteArray = post.upvotes;
        const index = upvoteArray.indexOf(req.user._id);
    
        if (index === -1) upvoteArray.push(req.user._id);     
        else  upvoteArray.splice(index, 1);
    
        post.upvotes = upvoteArray;
        await post.save();
    
        const post_new = await Post.find({ _id: post._id }).populate("author","name");
        res.send(post_new);
    } 
    
    catch (error) {
        res.status(400).json({error:"Error in liking given post. Retry Again"})
    }
   
});




exports.getPostByUserId = asyncHandler(async(req,res)=> {
    try {

        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1 
        const count = await Post_Model.count({"author":req.params.id})


        const all_posts = await Post_Model
        .find({"author":req.params.id})
        .populate("author", "name _id")
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1));
        
        res.status(200).json({all_posts,page,pages: Math.ceil(count/pageSize)});

    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error in Feting the user's posts. Retry Again"})
    }
})