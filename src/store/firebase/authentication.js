/* eslint-disable no-empty-pattern */
import firebase from "@/plugins/firebase";
import "firebase/auth";

let auth = firebase.auth();

const actions = {
  // eslint-disable-next-line no-unused-vars
  signUp: async ({}, payload) => {
    const email = payload.profile.email;
    const password = payload.profile.password;
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(userCredential);
        return { status: "success", user };
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { status: "fail", errorMessage, errorCode };
      });
  },
  signOut: async ({}) => {
    await auth.signOut().catch(error => {
      return { status: "fail", errorMessage: error };
    });
  }
};

export default { namespaced: true, actions };
