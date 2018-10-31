//Creating Router for users route
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const router = express.Router();

const keys = require("../config/keys");

//User Schema
const User = require("../models/User");

//Validation
const validateRegisterInputs = require("../validation/register");
const validateLoginInputs = require("../validation/login");

// @route POST /users/register
// @desc Registers a user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST /users/login
// @desc Login user
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInputs(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "User doesn't exist";
      return res.status(404).json(errors);
    } else {
      bcryptjs
        .compare(req.body.password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name
            };

            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Incorrect Password";

            return res.status(400).json(errors);
          }
        })
        .catch(err => console.log(err));
    }
  });
});

//Exporting the router
module.exports = router;
