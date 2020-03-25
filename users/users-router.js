const router = require('express').Router();
const Users = require('./users-model.js');

router.get("/", (req, res) => {
    Users
        .find()
        .then(user => {
            res.status(200).json({currentUsers: user});
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

module.exports = router;