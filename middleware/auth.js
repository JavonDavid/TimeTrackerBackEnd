const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey";

const verifyToken = (req, res, next) => {
  const authHeader = req.header["Authorization"];/* this is accessing the header and extracts the value of authorization from imcoming http request  */
  const token = authHeader.split(" ")[1];/* this is spliting the token so we only get tthe token */
  try {
    jwt.verify(token, SECRET_KEY);/* this is verifying the token and signing it with the SECRET_KEY */
    next();/*  gives control to the next route handler*/
  } catch {
    res.status(401).send({ message: "Invalid Token" });/* if there is and error run send this massage */
  }
};

module.exports = verifyToken; /* so we can use this in other JavaScripts in this folder */
