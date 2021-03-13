import Vue from "vue";
import Vuex from "vuex";

import authentication from "./firebase/authentication";
import firestore from "./firebase/firestore";
import user from "./user";
import snackBar from "./snackBar";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    user,
    snackBar,
    firebase: {
      namespaced: true,
      modules: {
        authentication,
        firestore
      }
    }
  }
});
