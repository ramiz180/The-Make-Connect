const express = require("express");
const router = express.Router();
const {
  getNearbyWorkers,
} = require("../controllers/customerController");

router.get("/nearby-workers", getNearbyWorkers);

module.exports = router;
