import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD3ROBKONN2Aqzva_k3Em9gI_XNgp0pAyM",
  databaseURL: "https://beyo-8f9ec.firebaseio.com",
  projectId: "beyo-8f9ec"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
