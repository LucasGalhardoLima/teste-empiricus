import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Repo from "../views/Repo";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:repo",
    name: "Repo",
    component: Repo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
