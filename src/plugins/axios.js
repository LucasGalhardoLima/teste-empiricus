"use strict";

import Vue from "vue";
import axios from "axios";

// axios.defaults.headers.common["Authorization"] =
//   "token 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";

let config = {
  baseURL: " https://api.github.com/",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
