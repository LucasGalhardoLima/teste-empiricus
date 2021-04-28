export default {
  async listUser({ commit }) {
    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.get("users/vuejs");
      commit("set_user", data);
    } catch (error) {
      console.error(error);
    }
  },
  async listUserRepos({ commit }, page) {
    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.get(
        `users/vuejs/repos?per_page=10&page=${page}`
      );
      commit("set_repos", data);
    } catch (error) {
      console.error(error);
    }
  },
};
