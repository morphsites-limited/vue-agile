import VueAgile from "./Agile.vue";

var install = function install(Vue) {
  Vue.component('agile', VueAgile);
};

export default {
  install: install
};
export { VueAgile };