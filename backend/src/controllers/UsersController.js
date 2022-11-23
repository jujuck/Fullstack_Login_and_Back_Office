const Joi = require("joi");

const user = {
  email: "trainer@wildcodeschool.com",
  password: "WildCodeSchool2022",
  name: "John Smith",
  role: "admin",
};

const validateUser = (req, res) => {
  const { error } = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    }),
    password: Joi.string().min(8).max(25).required(),
  }).validate(req.body, { abortEarly: false });
  console.error(error);
  console.error(user);
  res.send("OK");
};

module.exports = { validateUser };
