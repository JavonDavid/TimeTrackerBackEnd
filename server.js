/* this pulls in the express  library*/
const express = require("express");
/*this runs the express function  */
const app = express();
/* setting the name port to be at 3000 */
const PORT = process.env.PORT || 3000;
/* call in the jsonwebtoken lirbrary for authentication */
const jsw = require(`jsonwebtoken`);
/* helping the express understand json */
app.use(express.json());
/* making users in the api */
const posts = [
/* first user in posts */ 
{ id: 1, username: `javon1792@gmail.com`, password: `smallman123` },
{ id: 2, username: `timmythegod123@gmail.com`, password: `randmonman123`, },
{ id: 3, username: `lebron3921@gmail.com`, password: `oneofthegoats` },
{ id: 4, username: `derrick251@gmail.com`, password: `yallluckyhewashurt` }

]

/* prints out the users that are in the posts container */
app.get(`/posts`, (req, res) => {
 /* its taking the data from post convers it into json and sends it as a responce to the client */
    res.json(posts)
})
/* looking for the responce in the body of the username */
app.post("/login", (req, res) => {
    const username = res.body.username
})

/* the server will run at port 3000 on at localhost:3000 */
app.listen(PORT)


