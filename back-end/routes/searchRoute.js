const express = require("express");
const {
  countData,
  search,
  indexData,
  getAllLocations,
  getAllBenefits,
} = require("../controllers/searchController");

const router = express.Router();

router.post("/search/:keyWord", search);
router.get("/index", indexData);
router.get("/locations", getAllLocations);
router.get("/benefits", getAllBenefits);
module.exports = router;
