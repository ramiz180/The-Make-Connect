const express = require("express");
const router = express.Router();
const { addServices } = require("../controllers/addServicesController");

router.post("/worker/add-services", addServices);

module.exports = router;
