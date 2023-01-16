const state = {
  userIsAuthorized: false,
};

const getters = {
  getUserAuthorization: (state) => state.userIsAuthorized,
};

const mutations = {
  SET_AUTHORIZATION_STATUS(state, userIsAuthorized) {
    state.userIsAuthorized = userIsAuthorized;
  },
};

const actions = {
  async handleLogin({ commit }, token) {
    localStorage.setItem("auth0", JSON.stringify(token));

    commit("SET_AUTHORIZATION_STATUS", true);
    return token;
  },

  async handleLogout({ commit }, _) {
    commit("SET_AUTHORIZATION_STATUS", false);
    return;
  },
};

export default { state, getters, actions, mutations };
