const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../models/Profile");

//For validating inputs
const validateProfileInputs = require("../validation/profile");
const validateCourseInputs = require("../validation/course");

// @route POST /profile/
// @desc creates/updates profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Making profile object and adding properties in it
    profileFields = {};
    // ID of current user
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.university) profileFields.university = req.body.university;
    if (req.body.department) profileFields.department = req.body.department;
    if (req.body.year) profileFields.year = req.body.year;
    if (req.body.semester) profileFields.semester = req.body.semester;
    if (req.body.phone) profileFields.phone = req.body.phone;

    
    Profile.findOne({ user: req.user.id }).then(profile => {
      // If profile already exists then just update it
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields }, // All the fields
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Checking if handle is already booked?
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle Already Exists";
            return res.status(400).json(errors);
          }

          //Creating new profile with all the properties
          new Profile(profileFields).save().then(() => res.json({success:true}));
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
      .populate("user", ["name", "avatar", "email"]) // Adding properties
      .then(profile => {
        if (profile) {
         
          //Calculating the CGPA
          const CGPA = getCGPA(profile.courses);
        

          // Making the profile object with all the required info to send as a response
          const userProfile = {
            name: profile.user.name,
            email: profile.user.email,
            avatar: profile.user.avatar,
            handle: profile.handle,
            university: profile.university,
            department: profile.department,
            year: profile.year,
            semester: profile.semester,
            phone: profile.phone,
            CGPA 
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
    const { errors, isValid } = validateCourseInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newCourse = {
          name: req.body.name,
          code: req.body.code,
          ch: req.body.ch,
          teacher: req.body.teacher,
          semester: req.body.semester,
          GPA: req.body.gpa ? req.body.gpa : 0
        };

        profile.courses.unshift(newCourse);

        profile
          .save()
          .then(() => res.json({success:true}))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route POST profile/courses/edit/:courseID
// @desc edit a course
// @access Private
router.post(
  "/courses/edit/:courseID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInputs(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const course = profile.courses
          .map(course => course.id)
          .indexOf(req.params.courseID);

        profile.courses[course].name = req.body.name;
        profile.courses[course].code = req.body.code;
        profile.courses[course].ch = req.body.ch;
        profile.courses[course].teacher = req.body.teacher;
        profile.courses[course].semester = req.body.semester;
        if (req.body.gpa) profile.courses[course].GPA = req.body.gpa;

        profile.save().then(() => res.json({success:true}));
      })
      .catch(err => res.json(err));
  }
);


// @route DELETE /profile/courses/:courseID
// @desc deletes a course
// @access Private
router.delete(
  "/courses/:courseID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.courses
        .map(course => course.id)
        .indexOf(req.params.courseID);

      profile.courses.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile.courses));
    });
  }
);

// @route GET profile/courses/:courseID
// @desc Get course by ID
// @access Private
router.get(
  "/courses/:courseID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const course = profile.courses.filter(
        item => item.id === req.params.courseID
      );
      res.json(course[0]);
    });
  }
);

// @route GET profile/courses/
// @desc Get all courses
// @access Private
router.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile.courses) {
          errors.courses = "No Course Added";
          return res.status(404).json(errors);
        }
        res.json(profile.courses);
      })
      .catch(err => res.status(400).json({ noprofile: "No Profile" }));
  }
);



// @route POST profile/courses/attendance/:courseID
// @desc Update Attendance
// @access Private
router.post(
  "/courses/attendance/:courseID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const courseIndex = profile.courses
        .map(item => item.id)
        .indexOf(req.params.courseID);

      let record = profile.courses[courseIndex].attendance;

      const attendance = {};

      if (record.classesHeld) {
        attendance.classesHeld = record.classesHeld + Number(req.body.held);
        attendance.classesTaken = record.classesTaken + Number(req.body.taken);
        attendance.classesLeft = record.classesLeft + Number(req.body.left);
        attendance.date = Date.now();
      } else {
        attendance.classesHeld = Number(req.body.held);
        attendance.classesTaken = Number(req.body.taken);
        attendance.classesLeft = Number(req.body.left);
        attendance.date = Date.now();
      }

      profile.courses[courseIndex].attendance = attendance;
      profile.save().then(profile => res.json(profile.courses[courseIndex]));
    });
  }
);

// @route DELETE /profile/courses/attendance/:courseID
// @desc Deletes course attendance
// @access Private
router.delete(
  "/courses/attendance/:courseID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const courseIndex = profile.courses
        .map(course => course.id)
        .indexOf(req.params.courseID);

      profile.courses[courseIndex].attendance = {
        classesHeld: 0,
        classesTaken: 0,
        classesLeft: 0
      };

      profile.save().then(profile => res.json(profile.courses[courseIndex]));
    });
  }
);


// @route GET profile/courses/attendance/semester/:semester
// @desc Get Semester attendance
// @access Private
router.get(
  "/courses/attendance/semester/:semester",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        let coursesAttendance = profile.courses
          .filter(course => course.semester === req.params.semester)
          .map(course => course.attendance);

        let allAttendance = coursesAttendance.reduce((acc, nextVal) => {
          return {
            classesHeld: acc.classesHeld + nextVal.classesHeld,
            classesTaken: acc.classesTaken + nextVal.classesTaken,
            classesLeft: acc.classesLeft + nextVal.classesLeft
          };
        });

        res.json(allAttendance);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route DELETE profile/courses/attendance/semester/:semester
// @desc Deletes Semester attendance
// @access Private
router.delete(
  "/courses/attendance/semester/:semester",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const semester = profile.courses.filter(
          course => course.semester === req.params.semester
        );

        for (i = 0; i < semester.length; i++) {
          semester[i].attendance = {
            classesHeld: 0,
            classesTaken: 0,
            classesLeft: 0
          };
        }
        const updatedSemester = {
          classesHeld: 0,
          classesTaken: 0,
          classesLeft: 0
        };

        profile.save().then(() => res.json(updatedSemester));
      })
      .catch(err => res.status(400).json(err));
  }
);



// @route GET profile/courses/attendance
// @desc Get overall attendance
// @access Private
router.get(
  "/courses/all/attendance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        let coursesAttendance = profile.courses.map(
          course => course.attendance
        );

        let allAttendance = coursesAttendance.reduce((acc, nextVal) => {
          return {
            classesHeld: acc.classesHeld + nextVal.classesHeld,
            classesTaken: acc.classesTaken + nextVal.classesTaken,
            classesLeft: acc.classesLeft + nextVal.classesLeft
          };
        });

        res.json(allAttendance);
      })
      .catch(err => res.status(400).json(err));
  }
);


// @route GET /profile/courses/results/semester
// @desc Get semester wise result
// @access Private
router.get(
  "/courses/results/semester",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      let semester = profile.courses.filter(
        course => course.semester === "Fourth"
      );

      res.json(semester);
    });
  }
);

function getCGPA(courses){ // Calculating CGPA to display on profile
  let CGPA = 0;
  // if profile has any courses?
  if (Object.keys(courses).length > 0) {
    //Filtering the courses to find those which have GPA 
    const gpaCourses = courses.filter(
      course => course.GPA !== 0
    );
    if (gpaCourses.length > 0) {
      // Calling the function if there are any GPA courses
      CGPA = calculateCGPA(gpaCourses);
      return CGPA;
    }
  }
}

function calculateCGPA(course) {
  let GPAs = course.map(course => course.GPA);
  let creditHours = course.map(course => course.ch);

  GPAs = GPAs.map((GPA, index) => {
    return GPA * creditHours[index];
  });

  creditHours = creditHours.reduce((acc, nextVal) => {
    return acc + nextVal;
  });

  GPAs = GPAs.reduce((acc, nextVal) => {
    return acc + nextVal;
  });

  return (GPAs / creditHours).toFixed(2);
}

module.exports = router;
