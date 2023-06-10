const express = require("express");
const {
  countData,
  search,
  indexData,
  getAllLocations,
  getAllBenefits,
  getAllSkill,
  getAllCategory,
  getAllLevel,
} = require("../controllers/searchController");

const router = express.Router();

router.post("/search/:keyWord", search);
router.get("/index", indexData);
router.get("/locations", getAllLocations);
router.get("/benefits", getAllBenefits);
router.get("/skill", getAllSkill);
router.get("/category", getAllCategory);
router.get("/level", getAllLevel);
module.exports = router;
