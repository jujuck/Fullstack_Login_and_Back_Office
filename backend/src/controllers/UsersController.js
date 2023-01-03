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

const createUser = (req, res) => {
  res.sendStatus(200);
};

module.exports = { validateUser, createUser };
