/* this pulls in the express  library*/
const express = require("express");
const userRouter = require("./routes/users");
// Import the CORS middleware
const cors = require("cors");

/*this runs the express function  */
const app = express();

/* setting the name port to be at 3001 */
const PORT = process.env.PORT || 3001;

// use cors middleware
app.use(cors());
/* helping the express understand json */
app.use(express.json());

app.route("/users", userRouter);

/* the server will run at port 3000 on at localhost:3001 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
