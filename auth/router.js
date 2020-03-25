const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken.js");
const router = require("express").Router();


const { jwtSecret } = require("../Config/secret.js");
const Users = require("../users/users-model.js");

function generateToken(user) {
    const payload = {
        username: user.username,
    }

    const options = {
        expiresIn: "1h"
    };
    return jwt.sign(payload, jwtSecret, options);

}



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

rrouter.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    Users.getBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            welcome: user.username,
            token
          });
        } else {
          res.status(401).json({ message: "invalid credentials!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error finding user", error: err });
      });
  });

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