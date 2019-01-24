import * as actionTypes from "../constants";

export const setAppLoading = payload => ({
  type: actionTypes.ACTION_SET_LOADING,
  payload
});

export const loadDetailsData = payload => ({
  type: actionTypes.ACTION_LOAD_DETAILS,
  payload
});

export const updateDetails = payload => ({
  type: actionTypes.ACTION_UPDATE_DETAILS,
  payload
});

export const saveDetails = payload => ({
  type: actionTypes.ACTION_SAVE_DETAILS,
  payload
});

export const sendEmail = payload => ({
  type: actionTypes.ACTION_SEND_EMAIL,
  payload
});
