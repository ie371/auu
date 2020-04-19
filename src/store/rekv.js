export default {
  state: {
    name_prj: "",
    cod: "",
    name_ooo: "",
    GIP: "",
    razr: "",
    prov: "",
    tcontr: "",
    ncontr: "",
    adress: "",
    tip_obj: "",
    zakazchik: "",
    abonent: "",
    istochnik: "",
    resurscomp: "",
    checkTiul: 1
  },

  getters: {},
  mutations: {
    MU_REKV(Rekv, payload) {
      Rekv = payload;
    }
  },
  actions: {
    LOAD_REKV(context, p) {
      context.commit("MU_REKV", p);
    }
  }
};
