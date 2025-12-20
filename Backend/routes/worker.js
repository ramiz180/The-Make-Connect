const express = require("express");
const router = express.Router();
const { saveWorkerLocation } = require("../controllers/workerController");

router.post("/save-location", saveWorkerLocation);

module.exports = router;
