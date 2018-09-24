const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");
const Profile = require("../models/Profile");

// @route POST /profile/
// @desc creates profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.university) profileFields.university = req.body.university;
    if (req.body.department) profileFields.department = req.body.department;
    if (req.body.year) profileFields.year = req.body.year;
    if (req.body.semester) profileFields.semester = req.body.semester;
    if (req.body.phone) profileFields.phone = req.body.phone;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            return res.status(400).json({ handle: "Handle Already Exists" });
          }

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route GET /profile/
// @desc Get user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (profile) {
          const userProfile = {
            name: profile.user.name,
            handle: profile.handle,
            university: profile.university,
            department: profile.department,
            year: profile.year,
            semester: profile.semester,
            phone: profile.phone
          };
          res.json(userProfile);
        } else {
          res.json({ noprofile: "Profile doesn't exist" });
        }
      });
  }
);

// @route POST profile/course/add
// @desc Add a course
// @access Private
router.post(
  "/course/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newCourse = {
          name: req.body.name,
          code: req.body.code,
          ch: req.body.ch,
          teacher: req.body.teacher
        };

        profile.courses.unshift(newCourse);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route GET profile/course/:courseID
// @desc Get course by ID
// @access Private
router.get(
  "/course/:courseID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const course = profile.courses.filter(
        item => item.id === req.params.courseID
      );
      res.json(course);
    });
  }
);

// @route POST profile/course/:courseID/attendance
// @desc Update Attendance
// @access Private
router.post(
  "/course/:courseID/attendance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const course = profile.courses.filter(
        item => item.id === req.params.courseID
      );

      const attendance = {};
      attendance.classesHeld = req.body.held;
      attendance.classesTaken = req.body.taken;
      attendance.classesLeft = req.body.left;

      const courseIndex = profile.courses
        .map(item => item.id)
        .indexOf(req.params.courseID);

      profile.courses[courseIndex].attendance = attendance;
      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
