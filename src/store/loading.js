const state = () => ({
  loading: {
    isShow: false
  }
});
const getters = {
  getLoading: state => state.loading
};
const mutations = {
  setLoading: (state, val) => (state.loading = val)
};
export default { namespaced: true, state, getters, mutations };
