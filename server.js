const express = require("express"); /* this allows us to run our server */
const router = require("./routes/users"); /* this allows us to use all the GET,POST,PUSH and DELETES we set up in users.js */
const cors = require("cors"); // Import the CORS middleware

const app = express(); /*this runs the express function  */
const PORT = process.env.PORT || 3001; /* setting the name port to be at 3001 */
app.use(cors()); // use cors middleware
app.use(express.json()); /* helping the express understand json */

app.use(`/users`, router); /* getting the /users from our users.js file */
app.use(`/:id`, router); /* getting our/:id from our users.js file */
app.use(`/`, router);

app.listen(PORT, () => {
  /* the server will run at port 3001 on at localhost:3001 */
  console.log(`Server is running on port ${PORT}`); /* we will get a log in our console letting us know if its running or not */
});
