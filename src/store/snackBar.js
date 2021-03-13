const state = () => ({
  snackBar: {
    isShow: false,
    message: null,
    colour: null,
    position: "top",
    timeout: "3000",
    actionBtnColour: null,
    actionMessage: null,
    isShowActionBtn: false,
    isMultiLine: false
  }
});
const getters = {
  getSnackBar: state => state.snackBar
};
const mutations = {
  setSnackBar: (state, val) => (state.snackBar = val)
};
export default { namespaced: true, state, getters, mutations };
