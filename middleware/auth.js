const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey";

const verifyToken = (req, res, next) => {
  const authHeader = req.header["Authorization"];
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
