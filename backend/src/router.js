const express = require("express");

const router = express.Router();

const carsControllers = require("./controllers/CarsControllers");
const usersControllers = require("./controllers/UsersController");

router.get("/cars", carsControllers.browse);
router.get("/cars/:id", carsControllers.read);
router.post("/cars", carsControllers.add);

router.post("/login", usersControllers.validateUser);

module.exports = router;
