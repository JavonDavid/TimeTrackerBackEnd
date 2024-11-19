const express = require(`express`);
const router = express.Router();

let users = [
    
];
/* get all users */
router.get("/", (req, res) => {
    res.json(users);
});

router.get("/id:", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = user.find((u) => u.id === userId);
    if (user) res.json(user);
    else res.status(404).send(`User not found`);
});




router.post("/", (req, res) => {
    const newUser = { id: users.length + 1, ...req.body }
    users.push(newUser);
    res.status(201), json(newUser);

});
/* DELETE a user  */
router.delete("/id:", (req, res) => {
    users = filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});