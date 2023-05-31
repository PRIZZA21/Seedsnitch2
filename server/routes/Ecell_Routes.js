const express = require("express");
const { getAllEcells, createEcell, updateEcelldetails, getEcelldetails, getTotalEcells } = require("../controllers/Ecell_Contollers");
const router = express.Router();

router.get("/", getAllEcells);
router.get("/all", getTotalEcells);
router.post("/create", createEcell);

router.route('/details/:id')
.get(getEcelldetails)
.put(updateEcelldetails)




module.exports = router;
