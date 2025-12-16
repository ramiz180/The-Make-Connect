const router = require("express").Router();
const { saveLocation } = require("../controllers/locationController");

router.post("/save", saveLocation);

module.exports = router;
