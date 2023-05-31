const express = require("express");
const { createReply, getRepliesById, likeReplyById } = require("../controllers/Reply_Controllers");
const { protect } = require("../middlewares/Authorization");
const router = express.Router();

router.post('/create/:id',protect,createReply)
router.get("/:id",getRepliesById );
router.put("/like/:id",protect,likeReplyById)


module.exports = router;