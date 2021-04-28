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
  async listUserRepos({ commit }, { search, page }) {
    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.get(
        `search/repositories?q=${encodeURIComponent(
          `${search || ""} user:vuejs`
        )}&per_page=10&page=${page}`
      );
      commit("set_repos", data.items);
      return data.items;
    } catch (error) {
      console.error(error);
    }
  },
  async listSelectedRepoInfo({ commit }, repo) {
    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.get(`repos/vuejs/${repo}`);
      commit("set_selected_repo", data);
    } catch (error) {
      console.error(error);
    }
  },
  async listSelectedRepoCommits({ commit }, { repo, page }) {
    try {
      // eslint-disable-next-line no-undef
      const { data } = await axios.get(
        `repos/vuejs/${repo}/commits?per_page=10&page=${page}&sort=created&order=desc`
      );
      commit("set_selected_commits", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
