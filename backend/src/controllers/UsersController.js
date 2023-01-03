const models = require("../models");
const { hashPass } = require("../services/auth");

const user = {
  email: "john@wildcodeschool.com",
  password: "WildCodeSchool2022",
  name: "John Smith",
  role: "admin",
};

const validateUser = (req, res) => {
  if (req.body.email === user.email && req.body.password === user.password) {
    res
      .status(201)
      .cookie("access_token", "connexion validated", {
        httpOnly: true,
      })
      .json({ name: user.name, role: user.role, email: user.email });
  } else {
    res.status(500).send("Wrongs credentials");
  }
};

const createUser = async (req, res) => {
  const hashedPassword = await hashPass(req.body.password);

  models.users
    .insert({ ...req.body, hashedPassword })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports = { validateUser, createUser };
