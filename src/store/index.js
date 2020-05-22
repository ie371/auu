import Vue from "vue";
import Vuex from "vuex";
import Rekv from "@/store/rekv";
import Auu from "@/store/auu";
import Uu from "@/store/uu";
import UuHvs from "@/store/uuhvs";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    no_proj_ts: true,
    no_proj_hvs: true,
    np: {
      ot: 0,
      gvs: 0
    }
  },
  modules: { Rekv, Auu, Uu, UuHvs },
  getters: {},
  mutations: {
    mu_np(state, payload) {
      state.np = payload;
    },
    mu_proj(state, payload) {
      state.no_proj_ts = payload;
    },
    mu_proj_hvs(state, payload) {
      state.no_proj_hvs = payload;
    }
  },
  actions: {
    NP(context, payload) {
      let np = this.state.np;
      Object.prototype.hasOwnProperty.call(payload, "ot")
        ? (np.ot = payload.ot)
        : "";
      Object.prototype.hasOwnProperty.call(payload, "gvs")
        ? (np.gvs = payload.gvs)
        : "";
      context.commit("mu_np", np);
    },
    PROJ(context, payload) {
      context.commit("mu_proj", payload);
    },
    PROJ_HVS(context, payload) {
      context.commit("mu_proj_hvs", payload);
    }
  }
});
