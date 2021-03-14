/* eslint-disable no-empty-pattern */
import firebase from "@/plugins/firebase";
import "firebase/firestore";

const firestore = firebase.firestore();
const actions = {
  createUser: async ({ dispatch }, payload) => {
    const userData = payload.userData;
    const uid = payload.user.uid;
    const username = userData.profile.username;
    const email = userData.profile.email;
    userData["profile"] = { username, email };

    return await dispatch("setWithMerge", {
      collectionId: "users",
      docId: uid,
      data: userData
    });
  },
  updateUserInfo: async ({ dispatch }, payload) => {
    const data = payload.data;
    const uid = payload.uid;
    return await dispatch("setWithMerge", {
      collectionId: "users",
      docId: uid,
      data: data
    });
  },
  getUserInfo: async ({}, payload) => {
    const userId = payload.uid;
    const ref = firestore.collection("users").doc(userId);
    const doc = await ref.get();
    if (!doc.exists) {
      return { status: "fail", errorMessage: "No such document!" };
    } else {
      return { status: "success", data: doc.data() };
    }
  },
  setWithMerge: async ({}, payload) => {
    const collectionId = payload.collectionId;
    const docId = payload.docId;
    const data = payload.data;
    const docRef = firestore.collection(collectionId).doc(docId);
    return await docRef
      .set(data, { merge: true })
      .then(() => {
        return { status: "success" };
      })
      .catch(error => {
        return { status: "fail", errorMessage: error };
      });
  }
};
export default { namespaced: true, actions };
