<script>
import { mapActions, mapGetters } from "vuex";
import List from "@/components/List";

export default {
  name: "Repo",
  components: {
    List,
  },
  data: () => ({
    page: 1,
    loading: false,
    loadingCommits: false,
    commits: [],
  }),
  async mounted() {
    this.loading = true;
    await this.listSelectedRepoInfo(this.$route.params.repo);
    await this.listSelectedRepoCommits({
      repo: this.$route.params.repo,
      page: this.page,
    });
    this.commits = this.getSelectedCommits;
    this.loading = false;
  },
  computed: {
    ...mapGetters(["getSelectedRepo", "getSelectedCommits"]),
  },
  methods: {
    ...mapActions(["listSelectedRepoInfo", "listSelectedRepoCommits"]),
    async loadMore() {
      this.loadingCommits = true;
      this.page += 1;
      const resp = await this.listSelectedRepoCommits({
        repo: this.$route.params.repo,
        page: this.page,
      });
      if (resp.length > 0) this.commits.push(...resp);
      this.loadingCommits = false;
    },
  },
};
</script>

<template>
  <div class="repo">
    <div class="container repo__main-container">
      <div class="row repo__commits-row">
        <div v-if="loading" class="text-center">
          <i role="status" class="spinner-grow spinner-grow-lg"></i>
        </div>
        <div v-show="!loading" class="col-sm-12">
          <div class="card repo__card">
            <div class="row">
              <div class="col-sm-5 repo__info-section">
                <section>
                  <h5 class="display-4 repo__title text-left">
                    Repositório: {{ $route.params.repo }}
                  </h5>
                  <h6
                    v-if="getSelectedRepo.stargazers_count"
                    class="text-left font-bold"
                  >
                    Estrelas: {{ getSelectedRepo.stargazers_count }}
                  </h6>
                </section>
              </div>
              <div class="col-sm-1">
                <hr class="repo__card-divider" />
              </div>
              <div class="col-sm-6">
                <div v-if="loadingCommits" class="repo__loading-repos-list">
                  <i role="status" class="spinner-grow spinner-grow-lg"></i>
                </div>
                <List
                  @loadMore="loadMore"
                  :items="commits"
                  :commits="true"
                  height="500px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.repo {
  height: 100%;
}
.repo__title {
  font-weight: bold;
}
.repo__main-container {
  height: 100%;
}
.repo__commits-row {
  height: 100%;
  justify-content: center;
  align-items: center;
}
.repo__card {
  padding: 2rem;
}
.repo__info-section {
  align-items: center;
  display: flex;
}
.repo__card-divider {
  border: none;
  border-left: 1px solid hsla(200, 10%, 50%, 100);
  height: 100%;
  width: 1px;
  margin-top: 0;
}
.repo__loading-repos-list {
  position: absolute;
  left: 45%;
  top: 45%;
}
.repo__commits-list {
  height: 500px;
  overflow-y: auto;
  padding: 0;
  list-style-type: none;
}
.repo__commits-list li {
  margin-bottom: 1rem;
}
.repo__commits-list li:last-child {
  margin-bottom: 0;
}
.repo__commits-list li p {
  margin: 0;
}
</style>
