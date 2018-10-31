import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  COURSE_LOADING,
  COURSES_LOADING,
  GET_COURSES,
  GET_COURSE,
  OVERALL_ATTENDANCE,
  SEMESTER_ATTENDANCE
} from "./types";
import axios from "axios";

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/profile", profileData)
    .then(res => {
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
    .then(() => history.push("/profile/courses"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editCourse = (courseData, id, history) => dispatch => {
  axios
    .post(`/profile/courses/edit/${id}`, courseData)
    .then(() => history.push("/profile/courses"))
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

export const getCourse = id => dispatch => {
  dispatch(setCourseLoading());
  axios
    .get(`/profile/courses/${id}`)
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

export const updateCourseAttendance = (
  attendanceData,
  courseID
) => dispatch => {
  dispatch(setCourseLoading());
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

export const deleteCourseAttendance = courseID => dispatch => {
  axios
    .delete(`/profile/courses/attendance/${courseID}`)
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

export const deleteSemesterAttendance = semester => dispatch => {
  axios
    .delete(`/profile/courses/attendance/semester/${semester}`)
    .then(res =>
      dispatch({
        type: SEMESTER_ATTENDANCE,
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

export const getSemesterAttendance = semester => dispatch => {
  dispatch(setCourseLoading());
  axios
    .get(`/profile/courses/attendance/semester/${semester}`)
    .then(res =>
      dispatch({
        type: SEMESTER_ATTENDANCE,
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
