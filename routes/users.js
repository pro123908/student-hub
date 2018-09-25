//Creating Router for users route
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const keys = require("../config/keys");

//User Schema
const User = require("../models/User");

//Validation
const validateRegisterInputs = require("../validation/register");
const validateLoginInputs = require("../validation/login");
const validateUserInfoInputs = require("../validation/userInfo");

router.get("/", (req, res) => res.send("Inside users"));

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
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
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

// @route POST /users/info/update
// @desc Updating user info
// @access Private
router.post(
  "/info/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateUserInfoInputs(req.body);

    const userInfo = {};
    if (req.body.university) userInfo.university = req.body.university;
    if (req.body.department) userInfo.department = req.body.department;
    if (req.body.year) userInfo.year = req.body.year;
    if (req.body.semester) userInfo.semester = req.body.semester;
    if (req.body.phone) userInfo.phone = req.body.phone;

    User.findOneAndUpdate(
      { email: req.user.email },
      { $set: userInfo },
      { new: true }
    )
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  }
);

// @route GET /users/info
// @desc Get user info
// @access Private
router.get(
  "/info",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.user.email })
      .then(user => {
        const userInfo = {
          name: user.name,
          email: user.email,
          university: user.university,
          department: user.department,
          year: user.year,
          semester: user.semester,
          phone: user.phone
        };
        res.json(userInfo);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/protect",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Protected Route");
  }
);

//Exporting the router
module.exports = router;
