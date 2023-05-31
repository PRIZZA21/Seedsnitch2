const express = require("express");
const { getAllPosts, getPostById, createPost, likePost, getPostByUserId } = require("../controllers/Post_Controllers");
const { protect } = require("../middlewares/Authorization");
const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", protect, createPost);
router.put("/like/:id", protect, likePost);
router.get("/post/:id", getPostById);
router.get('/creator/:id',protect,getPostByUserId)
// router.get("/creator/", protect, getPostByUserId);
  

module.exports = router;