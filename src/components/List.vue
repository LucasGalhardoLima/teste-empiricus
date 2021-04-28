<script>
export default {
  name: "List",
  props: ["items", "repos", "commits", "height"],
  mounted() {
    this.$refs.infiniteList.addEventListener("scroll", () => {
      if (
        this.$refs.infiniteList.scrollTop +
          this.$refs.infiniteList.clientHeight >=
        this.$refs.infiniteList.scrollHeight
      ) {
        this.$emit("loadMore");
      }
    });
  },
};
</script>

<template>
  <div class="list">
    <ul
      class="list-group list__ul"
      id="infinite-list"
      ref="infiniteList"
      :style="{ height: this.height }"
    >
      <li class="list-group-item" v-for="item in items" :key="item.id">
        <a
          v-if="repos"
          href="javascript:void(0)"
          @click="$router.push(`/${item.name}`)"
          >{{ item.full_name }}</a
        >
        <div v-if="commits" class="row list__ul-list-row">
          <div class="col-sm-auto">
            <div class="avatar avatar-green">
              <img
                v-if="item.author && item.author.avatar_url"
                :src="item.author.avatar_url"
                alt="Avatar"
              />
              <span v-else class="avatar-text">{{
                item.commit.author.name.substr(0, 1)
              }}</span>
            </div>
          </div>
          <div class="col-sm-10">
            <p class="body-3--3">Author: {{ item.commit.author.name }}</p>
            <p class="body-3--3">SHA: {{ item.sha }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list__ul {
  overflow-y: auto;
  padding: 0;
  list-style-type: none;
}
.list__ul li a {
  text-decoration: none;
  color: #00bf92;
}
.list__ul-list-row {
  margin: 0;
  align-items: center;
}
</style>
