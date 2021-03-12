/* eslint-disable no-empty-pattern */
import firebase from "@/plugins/firebase";
import "firebase/firestore";

const firestore = firebase.firestore();
const actions = {
  createUser: async ({}, payload) => {
    const userData = payload.userData;
    const uid = payload.user.uid;
    const username = userData.profile.username;
    const email = userData.profile.email;
    userData["profile"] = { username, email };

    return await firestore
      .collection("users")
      .doc(uid)
      .set(userData, { merge: true })
      .then(() => {
        return { status: "success" };
      })
      .catch(error => {
        return { status: "fail", errorMessage: error };
      });
  }
};
export default { namespaced: true, actions };
