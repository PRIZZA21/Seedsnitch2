const express = require("express");
const { getAllApplications } = require("../controllers/Application_Controllers");
const { createBlog, getAllBlogs, getBlogdetails, updateBlogdetails, getBlogById } = require("../controllers/Blog_Controllers");
const { protect } = require("../middlewares/Authorization");
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/create", protect,createBlog);
router.route('/details/:id')
.get(getBlogdetails)
.put(updateBlogdetails)


// router.put("/like/:id", likePost);
// router.get("/post/:id", getPostById);
// router.get('/creator/:id',protect,getPostByUserId)
// router.get("/creator/", protect, getPostByUserId);
  

module.exports = router;