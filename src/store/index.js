import Vue from "vue";
import Vuex from "vuex";
// import calcModule from "@/store/calc";
// import RasHods from "@/store/rashods";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isx: {
      floor: 9,
      Qco: "",
      t1: 110,
      t2: 70,
      t11: 95,
      t21: 70,
      p1: 65,
      p2: 45
    },
    check: {
      G1: "",
      G2: "",
      G3: "",
      u: "",
      duT1: "",
      duT11: "",
      duT3: "",
      v1: "",
      v2: "",
      resis: ""
    },
    cl_R: {
      dP: 0.5,
      Kv: "",
      Kvs: "",
      firms: "",
      du: "",
      tip: 2,
      naim_cl: "",
      obozn_cl: "",
      dP_f: "",
      naim_priv: "",
      obozn_priv: ""
    },
    cl_P: {
      enable: false,
      dP: 0.5,
      Kv: "",
      Kvs: "",
      firms: "",
      du: "",
      diap: "",
      naim: "",
      obozn: "",
      dP_f: ""
    },
    cl_D: {
      enable: false,
      balans: false,
      dP: 0.5,
      Kv: "",
      Kvs: "",
      firms: "",
      du: "",
      diap: "",
      naim: "",
      obozn: "",
      dP_f: ""
    },
    pumps: {
      two_pumps: true,
      double: false,
      perem: false,
      G: "",
      h: "",
      resis: "",
      kf: 1.15,
      w: "",
      firms: "",
      du: "",
      naim: "",
      obozn: "",
      taps: false
    },
    spec: []
  },
  modules: {},
  getters: {},
  mutations: {
    mu_isx(state, payload) {
      state.isx = payload;
    },
    mu_check(state, payload) {
      state.check = payload;
    },
    mu_clr(state, payload) {
      state.cl_R = payload;
    },
    mu_clp(state, payload) {
      state.cl_P = payload;
    },
    mu_cld(state, payload) {
      state.cl_D = payload;
    },
    mu_pumps(state, payload) {
      state.pumps = payload;
    },
    mu_spec(state, payload) {
      state.spec = payload;
    },
    mu_spec_rem(state, payload) {
      state.spec = [];
    }
  },
  actions: {
    ISX(context, payload) {
      context.commit("mu_isx", payload);
    },
    CHECK(context, payload) {
      context.commit("mu_check", payload);
    },
    CL_REG(context, payload) {
      context.commit("mu_clr", payload);
    },
    CL_PER(context, payload) {
      context.commit("mu_clp", payload);
    },
    CL_DOS(context, payload) {
      context.commit("mu_cld", payload);
    },
    PUMPS(context, payload) {
      context.commit("mu_pumps", payload);
    },
    SPEC(context, payload) {
      context.commit("mu_spec", payload);
    },
    SPEC_REM(context, payload) {
      context.commit("mu_spec_rem");
    }
  }
});
