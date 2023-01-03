const express = require("express");

const router = express.Router();

const carsControllers = require("./controllers/CarsControllers");
const usersControllers = require("./controllers/UsersController");

const checkUser = require("./services/users");
const checkAuth = require("./middleware/auth");

router.get("/cars", carsControllers.browse);
router.get("/cars/:id", carsControllers.read);
router.post("/cars", checkAuth, carsControllers.add);
router.delete("/cars/:id", checkAuth, carsControllers.deleteOne);

router.post("/login", checkUser, usersControllers.validateUser);
router.post("/signup", checkUser, usersControllers.createUser);

module.exports = router;
