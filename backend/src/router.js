const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/CarsControllers");

router.get("/cars", itemControllers.browse);
router.get("/cars/:id", itemControllers.read);

module.exports = router;
