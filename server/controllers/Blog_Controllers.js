const asyncHandler=require('express-async-handler');
const Blog_Model = require('../models/Blog_Model');


// /* 
//     @description This route gives all posts in database
//     @method Get
//     @route /api/posts/
// */

exports.getAllBlogs = asyncHandler(async(req,res) => {
    try {

        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1 
        const count = await Blog_Model.count()

        let all_blogs = await Blog_Model
        .find()
        .populate("author", "name -_id")
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1));

        
        res.status(200).json({all_blogs,page,pages: Math.ceil(count/pageSize)});
    } catch (error) {
        res.status(400).json({error:"Error in fetching all posts"})
    }
})



/* 
    @description This route gives a specific post in database
    @method Get
    @route /api/posts/:id
*/

exports.getBlogById = asyncHandler(async (req, res) => {
    try {
      const blog = await Blog_Model.find({ _id: req.params.id }).populate("author","name");
      res.send(blog[0]);
    } 
    catch (err) {
        res.status(400).json({error:"Error in fetching given blog. Retry Again"})
    }
})



/* 
    @description This route creates a specific post in database
    @method Post
    @route /api/posts/create
*/



exports.createBlog = asyncHandler(async (req, res) => {
  
    try {

        const blog = new Blog_Model({
            title: req.body.title,
            banner: req.body.image,
            content: req.body.content,
            author: req.user._id,
        });
    
        await blog.save();
        res.send(blog);
    } 
    
    catch (err) {
        console.log(err);
        res.status(400).json({error:"Error in creating given blog. Retry Again"})
    }

})


exports.getBlogdetails = asyncHandler(async(req,res)=>{

    try {
   
        const blog = await Blog_Model.findById(req.params.id)

        res.status(200).json({
            title:blog.title,
            banner: blog.banner,
            content: blog.content
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Blog Not Found"})
    }
    
})


exports.updateBlogdetails = asyncHandler(async(req,res) => {
  
    try {
        const blog = await Blog_Model.findById(req.params.id)

        blog.title = req.body.title || blog.title
        blog.banner= req.body.image || blog.banner
        blog.content= req.body.content || blog.content

        await blog.save()
        res.status(200).json({message: "Updated Succesfully"})   
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Blog Not Found"})
    }
   
})

// /* 
//     @description This route updtates the upvotes of a specific post
//     @method Put
//     @route /api/posts/like/:id
// */


// exports.likePost = asyncHandler(async(req,res)=> {

//     try {

//         const post = await Post_Model.findById(req.params.id);
//         if (!post) return res.status(400).send("Post doesn't exists");
        
//         const s1= post.author.toString();
//         const s2= req.user._id.toString();
 
//         if (s1 === s2) return res.status(400).json({error:"You can't upvote your own post"});
    
//         const upvoteArray = post.upvotes;
//         const index = upvoteArray.indexOf(req.user._id);
    
//         if (index === -1) upvoteArray.push(req.user._id);     
//         else  upvoteArray.splice(index, 1);
    
//         post.upvotes = upvoteArray;
//         await post.save();
    
//         const post_new = await Post.find({ _id: post._id }).populate("author","name");
//         res.send(post_new);
//     } 
    
//     catch (error) {
//         res.status(400).json({error:"Error in liking given post. Retry Again"})
//     }
   
// });




// exports.getPostByUserId = asyncHandler(async(req,res)=> {
//     try {
//         const all_posts = Post_Model.find({"author":req.params.id})
//         res.status(200).json(all_posts);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({error:"Error in Feting the user's posts. Retry Again"})
//     }
// })