export default {
  getUser: (state) => state.user,
  getUserRepos: (state) => state.repos,
  getSelectedRepo: (state) => state.selected_repo,
  getSelectedCommits: (state) => state.selected_commits,
};
