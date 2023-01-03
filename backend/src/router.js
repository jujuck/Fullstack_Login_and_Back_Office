const express = require("express");

const router = express.Router();

const carsControllers = require("./controllers/CarsControllers");
const usersControllers = require("./controllers/UsersController");

const checkUser = require("./services/users");

router.get("/cars", carsControllers.browse);
router.get("/cars/:id", carsControllers.read);
router.post("/cars", carsControllers.add);
router.delete("/cars/:id", carsControllers.deleteOne);

router.post("/login", checkUser, usersControllers.validateUser);
router.post("/signup", checkUser, usersControllers.createUser);

module.exports = router;
