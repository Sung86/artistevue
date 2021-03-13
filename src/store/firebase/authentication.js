/* eslint-disable no-empty-pattern */
import firebase from "@/plugins/firebase";
import "firebase/auth";

let auth = firebase.auth();

const actions = {
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
  signIn: async ({}, payload) => {
    const loginDetails = payload.loginDetails;
    const email = loginDetails.email;
    const password = loginDetails.password;
    return await auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        return await auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredential => {
            const user = userCredential.user;
            return { status: "success", user };
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return { status: "fail", errorMessage, errorCode };
          });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
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
