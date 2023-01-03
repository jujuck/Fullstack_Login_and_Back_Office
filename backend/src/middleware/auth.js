const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  if (req.cookies) {
    jwt.verify(
      req.cookies.access_token,
      process.env.JWT_AUTH_SECRET,
      (err, decode) => {
        if (err) {
          res.sendStatus(401);
        } else {
          req.auth = decode;
          next();
        }
      }
    );
  } else {
    res.sendStatus(401);
  }
};

module.exports = checkAuth;
