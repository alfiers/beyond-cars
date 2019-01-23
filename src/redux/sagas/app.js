import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { firestore } from "../../firebase";

import { updateDetails, setAppLoading } from "../actions/app";

import { SENDGRID_TEMPLATEIDS } from "../../config";

import { sendGridEmail, getSendGridTemplate } from "../../services/api";

export function* saveDetails(action) {
  const { id, details } = action.payload;
  yield put(setAppLoading(true));
  yield call(storeDetails, id, details);
  yield put(setAppLoading(false));
}

const storeDetails = (id, details) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("carSellListings")
      .doc(id)
      .set(details)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export function* fetchDetails(action) {
  const id = action.payload;
  const channel = yield call(detailsChannel, id);
  yield put(setAppLoading(true));
  while (true) {
    const { details } = yield take(channel);

    yield put(updateDetails(details));
    if (details === null) {
      break;
    }
  }
}

function detailsChannel(uid) {
  return eventChannel(emit =>
    firestore
      .collection("carSellListings")
      .doc(uid)
      .onSnapshot(async matched => {
        const details = matched.data();
        if (!details) {
          return emit({ details: null });
        }
        emit({ details });
      })
  );
}

export function* sendEmail(action) {
  console.log(action);
  const { details, language } = action.payload;
  yield put(setAppLoading(true));
  try {
    const response = yield call(getSendGridTemplate, SENDGRID_TEMPLATEIDS[0]);
    console.log(response);
    yield call(sendGridEmail, { emailTo: details.email });
    yield put(setAppLoading(false));
  } catch (error) {
    yield put(setAppLoading(false));
  }
}
