const express = require(`express`);
const router = express.Router();

let users = [
    { id: 1, username: `javon1792@gmail.com`, password: `smallman123`},
    { id: 2, username: `timmythegod123@gmail.com`, password: `randmonman123`,},
    { id: 3, username: `lebron3921@gmail.com`, password:`oneofthegoats`},
    { id: 4, username: `derrick251@gmail.com`, password:`yallluckyhewashurt`}

];
/* get all users */
router.get("/", (req, res) => {
    res.json(users);
});
function users() {
    router.get("/id:", (req, res) => {
        const userId = parseInt(req.params.id);
        const user = user.find((u) => u.id === userId);
        if (user) res.json(user);
        else res.status(404).send(`User not found`);
    });
    /* POST a new user  */

}

router.post("/", (req, res => {
    const newUser = { id: users.length + 1, ...req.body }
    users.push(newUser);
    res.status(201), json(newUser);

}));

/* PUT to update the user by id  */

router.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndext((u) => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { id: userId, ...req.body }
        res.json(user[userIndex]);
    } else {
        res.status(404).send(`User not found`);
    }
})
/* DELETE a user  */
router.delete("/id:", (req, res => {
    users = filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
}));