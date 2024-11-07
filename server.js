const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, function () {
    console.log(`App is listening at ${PORT}`);
})
//This is a post request to creat a new user
app.post(`/post`, function (req,res){
const user = {id: 1};
const token = jwt.sign(`my_secret_key`);
res.json({
    token: token
})
})
