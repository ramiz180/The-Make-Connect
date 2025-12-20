const express = require("express");
const router = express.Router();
const {
  getNearbyWorkers,
} = require("../controllers/customerWorkers.controller");

router.get("/nearby-workers", getNearbyWorkers);

module.exports = router;
