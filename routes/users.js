const express = require(`express`);
const verifyToken = require("../middleware/auth");
/* calling in the bcrypt lirbrary */
const bcrypt = require("bcrypt");
const router = express.Router();
/* call in the jsonwebtoken lirbrary for authentication */
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySecretKey";

/* making users in the api */
const users = [
  /* A container to hold all my users */
  { id: 1, email: `javon1792@gmail.com`, password: `smallman123` },
  { id: 2, email: `timmythegod123@gmail.com`, password: `randmonman123` },
  { id: 3, email: `lebron3921@gmail.com`, password: `oneofthegoats` },
  { id: 4, email: `derrick251@gmail.com`, password: `yallluckyhewashurt` },
];
/* prints out the users that are in the posts container */
router.get(`/`, (req, res) => {
  /* its taking the data from users converts it into json and sends it as a responce to the client */
  res.json(users);
});
/* searching for users at their id  */
router.get(`/:id`, (req, res) => {
  let id_to_search = req.params.id;
  let found_user = null;
  /* checking if the id of the user id is the same*/
  for (let i = 0; i < users.length; i++) {
    /* checking if the user id is equal to id_to_search*/
    if (users[i].id == id_to_search) {
      /* found_user is equal to users[if the number equals the same i will be stored in users] */
      found_user = users[i];
    }
  }
  /* converting the data of found_user and converts it into json and sends it as a responce to the client  */
  res.json(found_user);
});
/* updates the an old user */
router.put("/:id", (req, res) => {
  /*  converts the first argument to and string and the ncnages it to and integer or NaN
    and the req.prams.id allows me to capture dynamic values from the URL path*/
  const userId = parseInt(req.params.id);
  /* it returns the index of that element stops going threw the array and than compares it exactly to the u.it io userId */
  const userIndex = users.findIndex((u) => u.id === userId);
  /* checking if the userIndex is not exactly equal to -1 */
  if (userIndex !== -1) {
    /* its making users at userIndex equal the id of the updating user*/
    users[userIndex] = { id: userId, ...req.body };
    /* sends this responce back to the user */
    res.json(users[userIndex]);
    /*If the id is wrong the user will get send a error  */
  } else res.status(404).send(`User not found`);
});
// Adding a new user
router.post("/", (req, res) => {
  /* make the number of user increase by 1 */
  const newUser = { id: users.length + 1, ...req.body };
  /* adding the user into the array of users */
  users.push(newUser);
  /* Sending back 201 means something has been created.
  Sending a json formatted responce to the client */
  res.status(201).json(newUser);
});
router.delete("/:id", verifyToken, (req, res) => {
  let updatedusers = users.filter((u) => u.id !== parseInt(req.params.id));
  users.length = 0;
  users.push(...updatedusers);
  res.status(204).send();
});
/* authenication for when a user logs in */
router.get(`/login`, async (req, res) => {
  try {
    email = req.body.email;
    password = req.body.password;
    const foundUser = users.find(
      (user) => user.password == password && user.email == email
    );
    if (!foundUser) {
      res.status(401).send({ message: "Wrong username and password" });
    }
    const payload = { email: foundUser.email };
    const token = jwt.sign(payload, SECRET_KEY);
    res.status(201).send({ token: token });
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
