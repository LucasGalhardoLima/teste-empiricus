export default {
  set_user: (state, value) => {
    state.user = value;
  },
  set_repos: (state, value) => {
    state.repos = value;
  },
  set_selected_repo: (state, value) => {
    state.selected_repo = value;
  },
  set_selected_commits: (state, value) => {
    state.selected_commits = value;
  },
};
