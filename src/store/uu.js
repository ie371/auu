export default {
  state: {
    atm: {
      tipSB: 0,
      pltr: ["gsm", "usba"],
      lvru: 30,
      lsbo: 15,
      lsbg: 15
    },
    isx: {
      qco: null,
      qmax: null,
      qgvssr: null,
      Kchn: 2.2,
      knp: 0.8,
      ktp: 0.25,
      beta: 1.3,
      txvL: 15,
      txvZ: 5,
      t1: 95,
      t2: 70,
      t3: 60,
      t4: 50,
      p1: 50,
      p2: 40,
      p3: 50,
      p4: 40
    },
    check: {
      tipuu: "",
      tipkp: "",
      sx_ot: 0,
      sx_otkr: 0,
      sx_gvs: 0,
      sx_gvs_dep: 0,
      fuCo: 0,
      tipLo: "kl",
      tipLp: "kl",
      tipLg3: "kl",
      tipLg4: "kl",
      tipIMo: 6,
      tipIMp: 5,
      tipIMg3: 6,
      tipIMg4: 6,
      revers: 0,
      ok: 0,
      teploiz_ot: 0,
      teploiz_gvs: 0,
      progr_txv: 0,
      txv_pr: 10,
      filo: 0,
      filg: 0,
      filp: 0,
      IL: 0,
      selReg: 0,
      mess: [],
      indexnas: "",
      t_srez: "",
      met_ruk: 0,
      otmetka_T1: "",
      otmetka_T2: "",
      otmetka_T3: "",
      otmetka_T4: "",
      otmetka_T9: ""
    },
    du: {
      di1: 0,
      di2: 0,
      di9: 0,
      di3: 0,
      di4: 0,
      dut1: null,
      dut2: null,
      dut9: null,
      dut3: null,
      dut4: null
    }
  },
  modules: {},
  getters: {},
  mutations: {
    mu_isx_uu(Uu, payload) {
      Uu.isx = payload;
    },
    mu_check_uu(Uu, payload) {
      Uu.check = payload;
    },
    mu_atm(Uu, payload) {
      Uu.atm = payload;
    }
  },
  actions: {
    ISX_UU(context, payload) {
      context.commit("mu_isx_uu", payload);
    },
    CHECK_UU(context, payload) {
      context.commit("mu_check_uu", payload);
    },
    ATM(context, payload) {
      context.commit("mu_atm", payload);
    }
  }
};
