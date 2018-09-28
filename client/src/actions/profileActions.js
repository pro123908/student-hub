import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING, GET_COURSES } from "./types";
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

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
