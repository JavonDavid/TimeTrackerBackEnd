const express = require(`express`); /* calling in express so we can use it in post man */
const verifyToken = require("../middleware/auth"); /* this is a route from the middleware folder called auth that we can npw use in here */
const bcrypt = require("bcrypt"); /* help up keep our passwords safe */
const router =
  express.Router(); /* setting up the router so we can use things from other js files */
const jwt = require("jsonwebtoken"); /* call in the jsonwebtoken lirbrary for authentication */
const SECRET_KEY =
  "mySecretKey"; /* we need this to allow our users to sign there token so we know its them */

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
  res.json(
    users
  ); /* its taking the data from users converts it into json and sends it as a responce to the client */
});
/* searching for users at their id  */
router.get(`/:id`, (req, res) => {
  let id_to_search = req.params.id; /* sets id_to_search to id requested */
  let found_user = null; /* sets found_user to null */
  for (let i = 0; i < users.length; i++) {
    /* run there the users id.checking if the id of the user id is the same*/
    if (users[i].id == id_to_search) {
      /* chekcing if the id in users is the same as the one in id_to_search */
      found_user =
        users[
          i
        ]; /* found_user is equal to users[if the number equals the same i will be stored in found_users] */
    }
  }
  res.json(
    found_user
  ); /* converting the data of found_user and converts it into json and sends it as a responce to the client  */
});
/* updates the an old user */
router.put("/:id", (req, res) => {
  const userId = parseInt(
    req.params.id
  ); /* converts the first argument to and string and the ncnages it to and integer or NaN and the req.prams.id allows me to capture dynamic values from the URL path*/
  const userIndex = users.findIndex(
    (u) => u.id === userId
  ); /* it returns the index of that element stops going threw the array and than compares it exactly to the u.id io userId */
  if (userIndex !== -1) {
    /* checking if the userIndex is not exactly equal to -1 */
    users[userIndex] = {
      id: userId,
      ...req.body,
    }; /* its making users at userIndex equal the id of the updating user*/
    res.json(users[userIndex]); /* sends this responce back to the user */
  }
  elseres
    .status(404)
    .send(
      `User not found`
    ); /*If the id is wrong the user will get send a error  */
});
// Adding a new user
router.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  }; /* make the number of user increase by 1 */
  users.push(newUser); /* adding the user into the array of users */
  res
    .status(201)
    .json(
      newUser
    ); /* Sending back 201 means something has been created. Sending a json formatted responce to the client */
});
/* delete a user by the id but you need a token to beable to do that */
router.delete("/delete/:id", verifyToken, (req, res) => {
  let updatedusers = users.filter(
    (u) => u.id !== parseInt(req.params.id)
  ); /* this is getting all users and is going to filter out the id given/delete*/
  users.length = 0; /* making users length 0 */
  users.push(...updatedusers); /* pushing the users to updated users */
  res.status(204).send(); /* sets status to 204 and sends nothing back */
});
/* authenication for when a user logs in */
router.post(`/login`, async (req, res) => {
  try {
    email = req.body.email; /* this is requesting the email from the body  */
    password =
      req.body.password; /* this is requesting the password from the body */
    const foundUser = users.find(
      /* finding if the user that login is in the system */
      (user) =>
        user.password == password &&
        user.email ==
          email /* checking if the password and email are the same as any user in our system */
    );
    if (!foundUser) {
      /* and if no user is found send them this massahe */
      res.status(401).send({ message: "Wrong username and password" });
    }
    // make the token
    const payload = { email: foundUser.email }; /* who the token is for*/
    const token = jwt.sign(
      payload,
      SECRET_KEY
    ); /* this is creating the token so we know they are verfied */
    // sending back the token
    res.status(201).send({ token: token }); /* this is sending the token back */
  } catch {
    res.status(500).send(); /* this will catch errors and send back nothing */
  }
});
module.exports = router; /* the export for all our routes */
