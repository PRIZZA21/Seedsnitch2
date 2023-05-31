const express = require("express");
const { createApplication, getAllApplications, getApplicationsByCreatorId, getApplicationsByIncubatorId, acceptApplication, rejectApplication, getApplicationDetailsById } = require("../controllers/Application_Controllers");
const { protect } = require("../middlewares/Authorization");
const router = express.Router();


router.get("/", getAllApplications);
router.get("/creator/:id",protect,getApplicationsByCreatorId );
router.get("/incubator/",protect,getApplicationsByIncubatorId);
router.post("/details", getApplicationDetailsById);
router.post("/create", protect, createApplication);
router.post("/accept/:id",protect, acceptApplication)
router.post("/reject/:id",protect, rejectApplication)


module.exports = router;