import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  COURSE_LOADING,
  COURSES_LOADING,
  GET_COURSES,
  GET_COURSE,
  OVERALL_ATTENDANCE
} from "./types";
import axios from "axios";

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/profile", profileData)
    .then(res => {
      console.log(res.data);
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const addCourse = (courseData, history) => dispatch => {
  axios
    .post("/profile/course/add", courseData)
    .then(res => history.push("/profile/courses"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCourses = () => dispatch => {
  dispatch(setCoursesLoading());
  axios
    .get("/profile/courses")
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES,
        payload: null
      })
    );
};

export const getCourseAttendance = courseID => dispatch => {
  dispatch(setCourseLoading());
  axios
    .get(`/profile/courses/attendance/${courseID}`)
    .then(res =>
      dispatch({
        type: GET_COURSE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateCourseAttendance = (
  attendanceData,
  courseID
) => dispatch => {
  axios
    .post(`/profile/courses/attendance/${courseID}`, attendanceData)
    .then(res =>
      dispatch({
        type: GET_COURSE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getOverallAttendance = () => dispatch => {
  dispatch(setCourseLoading());
  axios
    .get("/profile/courses/all/attendance")
    .then(res =>
      dispatch({
        type: OVERALL_ATTENDANCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteCourse = id => dispatch => {
  axios
    .delete(`/profile/courses/${id}`)
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const setCoursesLoading = () => {
  return {
    type: COURSES_LOADING
  };
};

export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING
  };
};
