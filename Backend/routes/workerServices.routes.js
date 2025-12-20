const express = require("express");
const router = express.Router();
const {
  addOrUpdateServices,
  getMyServices,
} = require("../controllers/workerServices.controller");

router.post("/add-services", addOrUpdateServices);
router.get("/my-services", getMyServices);

module.exports = router;
