import Vue from "vue";
import Vuex from "vuex";
import Rekv from "@/store/rekv";
import Auu from "@/store/auu";
import Uu from "@/store/uu";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: { Rekv, Auu, Uu },
  getters: {},
  mutations: {},
  actions: {}
});
