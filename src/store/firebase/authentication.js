/* eslint-disable no-empty-pattern */
import firebase from "@/plugins/firebase";
import "firebase/auth";

let auth = firebase.auth();

const actions = {
  updateEmail: async ({}, payload) => {
    const user = auth.currentUser;
    const email = payload.email;

    return await user
      .updateEmail(email)
      .then(() => {
        return { status: "success" };
      })
      .catch(error => {
        return { status: "fail", errorMessage: error };
      });
  },
  updatePassword: async ({}, payload) => {
    const user = auth.currentUser;
    const newPassword = payload.password;
    return await user
      .updatePassword(newPassword)
      .then(() => {
        return { status: "success" };
      })
      .catch(error => {
        return { status: "fail", errorMessage: error };
      });
  },
  listenToAuthStateChanged: async ({ commit }) => {
    await auth.onAuthStateChanged(async user => {
      if (user) {
        if (user.metadata.lastSignInTime === user.metadata.creationTime) {
          auth.signOut();
        } else {
          commit("user/setIsSignIn", true, { root: true });
          user = JSON.parse(JSON.stringify(user));
          commit("user/setAccountInfo", user, { root: true });
        }
      }
    });
  },
  signUp: async ({}, payload) => {
    const email = payload.profile.email;
    const password = payload.profile.password;
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
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
            return { status: "success", user, userCredential };
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
