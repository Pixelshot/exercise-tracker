const router = require("express").Router();

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find() // this is a Promised based mongoose method
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error:", error));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
