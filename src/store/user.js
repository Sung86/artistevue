function initialState() {
  return {
    isSignIn: false,
    accountInfo: {}
  };
}
const state = () => initialState();
const getters = {
  getIsSignIn: state => state.isSignIn,
  getAccountInfo: state => state.accountInfo
};

const mutations = {
  setIsSignIn: (state, val) => (state.isSignIn = val),
  setAccountInfo: (state, val) => (state.accountInfo = val),
  resetState: state => {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  }
};

export default { namespaced: true, state, getters, mutations };
