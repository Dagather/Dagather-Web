import firebase from 'firebase/app';
import 'firebase/database';

const ENV = process.env;

const firebaseConfig = {
  apiKey: ENV.REACT_APP_FB_API_KEY,
  authDomain: ENV.REACT_APP_FB_AUTH_DOMAIN,
  projectId: ENV.REACT_APP_FB_PROJECT_ID,
  storageBucket: ENV.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: ENV.REACT_APP_FB_MSG_SEND_ID,
  appId: ENV.REACT_APP_FB_APP_ID,
  measurementId: ENV.REACT_APP_FB_MEASUEMENT_ID,
};

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  firebase.database();
};
