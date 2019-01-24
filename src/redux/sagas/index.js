import { takeEvery } from "redux-saga";
import * as actionTypes from "../constants";
import { fetchDetails, saveDetails, sendEmail } from "./app";

export default function* root() {
  yield [
    takeEvery(actionTypes.ACTION_LOAD_DETAILS, fetchDetails),
    takeEvery(actionTypes.ACTION_SAVE_DETAILS, saveDetails),
    takeEvery(actionTypes.ACTION_SEND_EMAIL, sendEmail)
  ];
}
