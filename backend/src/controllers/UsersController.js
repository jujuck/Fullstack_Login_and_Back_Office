const models = require("../models");
const { hashPass, verifyHash } = require("../services/auth");

const validateUser = (req, res) => {
  models.users
    .findOne(req.body)
    .then(async ([user]) => {
      if (user[0]) {
        if (await verifyHash(user[0].hashedpassword, req.body.password)) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  // if (req.body.email === user.email && req.body.password === user.password) {
  //   res
  //     .status(201)
  //     .cookie("access_token", "connexion validated", {
  //       httpOnly: true,
  //     })
  //     .json({ name: user.name, role: user.role, email: user.email });
  // } else {
  //   res.status(500).send("Wrongs credentials");
  // }
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
