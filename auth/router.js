const bcrypt = require('bcryptjs');

const router = require("express").Router();
const Users = require("../users/users-model.js");



router.post("/register", (req, res) => {
    const body = req.body;
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(body.password, ROUNDS);

    body.password = hash;

    Users
        .add(body)
        .then(user => {
            console.log('userINFO', body);
            res.status(200).json(user);
        })
        .catch(err => res.send({errorMessage: err.message}))
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    Users
        .findBy({ username })
        .then(([ user ]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                };
                res.status(200).json({ hello: "dude"});
            } else {
                res.status(401).json({ message: 'invalid credentials'})
            }
        })
        .catch(err => {
            // console.log('error',req.session.user)
            res.status(500).json({ 
                errorMessage: 'error finding user',
                error: err,
            })
        })
})

router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          res
            .status(500)
            .json({
              message:
                "you can checkout any time you like, but you can never leave....",
            });
        } else {
          res.status(200).json({ message: "logged out successful" });
        }
      });
    } else {
      res.status(200).json({ message: "I don't know you" });
    }
  });


module.exports = router;