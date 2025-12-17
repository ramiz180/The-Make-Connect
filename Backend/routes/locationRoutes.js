const router = require("express").Router();
const {
  saveLocation,
  getUserLocations,
} = require("../controllers/locationController");

router.post("/save", saveLocation);
router.get("/:userId", getUserLocations);

module.exports = router;
