<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    loading: false,
    loadingRepos: false,
    page: 1,
  }),
  computed: {
    ...mapGetters(["getUser", "getUserRepos"]),
  },
  async mounted() {
    this.loading = true;
    await this.listUser();
    await this.listUserRepos(this.page);
    this.loading = false;
  },
  methods: {
    ...mapActions(["listUser", "listUserRepos"]),
  },
};
</script>

<template>
  <div class="home container">
    <div class="row">
      <div class="col-sm-12">
        <section class="home__main-section">
          <h2 class="display-4 home__title">Página do usuário</h2>
          <div v-if="loading" class="text-center">
            <i
              data-v-87eb3532=""
              role="status"
              class="spinner-grow spinner-grow-lg"
            ></i>
          </div>
          <div v-else class="card">
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
              <div v-if="getUserRepos.length > 0" class="row">
                <div class="col-sm-12">
                  <h5 class="h5">Repositórios</h5>
                  <p
                    class="body-2--2"
                    v-for="item in getUserRepos"
                    :key="item.id"
                  >
                    {{ item.full_name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- {{ getUser }} -->
  </div>
</template>

<style lang="scss">
.home__main-section {
  margin: 2rem 0;
}
.home__title {
  font-weight: bold;
}
.home__card-divider {
  margin: 1rem 0;
}
</style>
