import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => {
  if (firebase.auth().currentUser === null) {
    return true;
  }
  return firebase.auth().currentUser.uid;
};

export default { getUid };
