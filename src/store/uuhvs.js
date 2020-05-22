import * as myFns from "@/utils/FuncUu.js";
export default {
  state: {
    gen: { IL: false },
    atm: {
      tipSB: 0,
      pltr: ["gsm", "usba"],
      shifr_to: "",
      lvru: 30,
      lsbh: 15,
      met_ruk: 0,
      teploiz_hvs: 0,
      psA2: false,
      plA2: false
    },
    isx_hvs: {
      Qsut: null,
      Tper: 24,
      qt: null,
      qhr: null,
      Kmax: null,
      Kmin: 0.1,
      t1: 5,
      p1: 50
    },
    check_hvs: {
      sens_d: 1,
      sens_t: 0,
      baypass: 0,
      tipLh: "kl",
      tipIMh: 6,
      filh: 0,
      otmetka_B1: ""
    },
    du_hvs: { di: null, dut: null },
    gdr: { gdr1: {} },
    dop: {
      truba_dop: "",
      tpl_dop: "",
      perehod_dop: "",
      otvod_dop: "",
      kozuh: 0
    }
  },
  modules: {},
  getters: {},
  mutations: {
    mu_isx_hvs(UuHvs, payload) {
      UuHvs.isx_hvs = payload;
    },
    mu_du_hvs(UuHvs, payload) {
      UuHvs.du_hvs = payload;
    },
    mu_check_hvs(UuHvs, payload) {
      UuHvs.check_hvs = payload;
    },
    mu_atm_hvs(UuHvs, payload) {
      UuHvs.atm = payload;
    },
    mu_gen_hvs(UuHvs, payload) {
      UuHvs.gen = payload;
    },
    mu_gidr_hvs(UuHvs, payload) {
      UuHvs.gdr = payload;
    },
    mu_DOP_hvs(UuHvs, payload) {
      UuHvs.dop = payload;
    }
  },
  actions: {
    ISX_HVS(context, payload) {
      // console.log("RASXOD HVS");
      // console.log(payload);
      let p_t1 = myFns.podbor(payload.isx.qt);
      payload.du.di = p_t1.d || "";
      payload.du.dut = p_t1.dt || "";

      context.commit("mu_du_hvs", payload.du);
      context.commit("mu_isx_hvs", payload.isx);
    },
    CHECK_HVS(context, payload) {
      payload.tipLh === "ml" ? (payload.filh = 0) : "";
      context.commit("mu_check_hvs", payload);
    },
    GEN_UU_HVS(context, payload) {
      context.commit("mu_gen_hvs", payload);
    },
    DU_HVS(context, payload) {
      context.commit("mu_du_hvs", payload);
    },
    ATM_HVS(context, payload) {
      context.commit("mu_atm_hvs", payload);
    },
    GIDR_HVS(context) {
      const st = this.state.UuHvs;
      let gdr = st.gdr;
      // function gidr(Gm, Gv, t, p, du_im, du_tr, tipL, filtr, ok, tipIM, PL)
      if (st.isx_hvs.qt > 0) {
        gdr.gdr1 = myFns.gidr(
          st.isx_hvs.qt,
          st.isx_hvs.qt,
          st.isx_hvs.t1,
          st.isx_hvs.p1,
          st.du_hvs.di,
          st.du_hvs.dut,
          st.check_hvs.tipLh,
          st.check_hvs.filh,
          0,
          st.check_hvs.tipIMh,
          1
        );
      } else {
        gdr.gdr1 = {};
      }

      context.commit("mu_gidr_hvs", gdr);
    },
    DOP_HVS(context, payload) {
      context.commit("mu_DOP_hvs", payload);
    }
  }
};
