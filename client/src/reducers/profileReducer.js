import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_COURSES,
  GET_COURSE,
  COURSES_LOADING,
  COURSE_LOADING,
  OVERALL_ATTENDANCE
} from "../actions/types";

const initialState = {
  profile: null,
  courses: null,
  course: null,
  allAttendance: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case COURSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case COURSE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false
      };
    case OVERALL_ATTENDANCE:
      return {
        ...state,
        allAttendance: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
