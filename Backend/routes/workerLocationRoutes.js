const express = require("express");
const router = express.Router();

const {
  saveWorkerLocation,
  getWorkerLocation,
} = require("../controllers/workerLocationController");

// POST → Save worker location
router.post("/save", saveWorkerLocation);

// GET → Fetch worker location
router.get("/:userId", getWorkerLocation);

module.exports = router;
