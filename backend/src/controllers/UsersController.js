const user = {
  email: "trainer@wildcodeschool.com",
  password: "WildCodeSchool2022",
  name: "John Smith",
  role: "admin",
};

const validateUser = (req, res) => {
  console.error(user);
  res.send("OK");
};

module.exports = { validateUser };
