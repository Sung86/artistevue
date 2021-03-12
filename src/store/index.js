import Vue from "vue";
import Vuex from "vuex";

import authentication from "./firebase/authentication";
import firestore from "./firebase/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    firebase: {
      namespaced: true,
      modules: {
        authentication,
        firestore
      }
    }
  }
});
