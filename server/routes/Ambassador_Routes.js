const express = require("express");
const { send_mail } = require("../controllers/Ambassador_Controllers");
const router = express.Router();


router.post("/amb-mail", send_mail)


module.exports = router