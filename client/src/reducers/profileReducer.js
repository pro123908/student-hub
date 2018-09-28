import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_COURSES,
  COURSES_LOADING
} from "../actions/types";

const initialState = {
  profile: null,
  courses: null,
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
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
