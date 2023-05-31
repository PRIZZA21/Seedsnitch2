const express = require("express");
const router = express.Router();
const { createIncubator, getAllIncubators, toggleIncubator } = require("../controllers/Incubator_Controllers");

router.get("/", getAllIncubators);
router.post("/create", createIncubator);
router.put("/toggleincubator/:id", toggleIncubator);


module.exports = router;
