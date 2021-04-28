<script>
import { mapActions, mapGetters } from "vuex";
import List from "@/components/List";

export default {
  name: "Home",
  components: {
    List,
  },
  data: () => ({
    loading: false,
    loadingRepos: false,
    page: 1,
    repos: [],
    search: "",
  }),
  async mounted() {
    this.loading = true;
    await this.listUser();
    await this.listUserRepos({ search: this.search, page: this.page });
    this.repos = this.getUserRepos;
    this.loading = false;
  },
  watch: {
    async search() {
      this.loadingRepos = true;
      this.search = this.search.replace(/[^a-zA-Z ]/g, "");
      this.search = this.search.replace(" ", "");
      this.repos = await this.listUserRepos({
        search: this.search,
        page: this.page,
      });
      this.loadingRepos = false;
    },
  },
  computed: {
    ...mapGetters(["getUser", "getUserRepos"]),
  },
  methods: {
    ...mapActions(["listUser", "listUserRepos"]),
    async loadMore() {
      this.loadingRepos = true;
      this.page += 1;
      const resp = await this.listUserRepos({ search: "", page: this.page });
      if (resp.length > 0) this.repos.push(...resp);
      this.loadingRepos = false;
    },
  },
};
</script>

<template>
  <div class="home container">
    <div class="row">
      <div class="col-sm-12">
        <section class="home__main-section">
          <h2 class="display-4 home__title text-center">Página do usuário</h2>
          <div v-if="loading" class="text-center">
            <i role="status" class="spinner-grow spinner-grow-lg"></i>
          </div>
          <div v-show="!loading" class="card">
            <div class="card-body">
              <div class="card-title">
                <div class="avatar avatar-xl">
                  <img :src="getUser.avatar_url" alt="Avatar" />
                </div>
                {{ getUser.login }}
              </div>
              <hr class="home__card-divider" />
              <h5 class="h5">Informações</h5>
              <p class="body-2--2">Nome: {{ getUser.name }}</p>
              <p class="body-2--2">
                Repositórios públicos: {{ getUser.public_repos }}
              </p>
              <hr class="home__card-divider" />
              <div class="row">
                <div class="col-sm-12">
                  <h5 class="h5">Repositórios</h5>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Nome do repositório"
                      class="input"
                      v-model="search"
                    />
                  </div>
                  <div v-if="loadingRepos" class="home__loading-repos-list">
                    <i role="status" class="spinner-grow spinner-grow-lg"></i>
                  </div>
                  <List
                    @loadMore="loadMore"
                    :items="repos"
                    :repos="true"
                    height="200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home__main-section {
  margin: 2rem 0;
}
.home__title {
  font-weight: bold;
}
.home__card-divider {
  margin: 1rem 0;
}
.home__loading-repos-list {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
