import { ACTION_SET_LOADING, ACTION_UPDATE_DETAILS } from "../constants";

export default (state = { loading: false, details: undefined }, action) => {
  switch (action.type) {
    case ACTION_SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_UPDATE_DETAILS:
      return { ...state, details: action.payload, loading: false };
    default:
      return state;
  }
};
