import * as myFns from "@/utils/FuncUu.js";
export default {
  state: {
    gen: { tipuu: "", tipkp: "", IL: false },
    sx: { sx_otkr: 0, sx_gvs_dep: 0 },
    atm: {
      tipSB: 0,
      pltr: ["gsm", "usba"],
      lvru: 30,
      lsbo: 15,
      lsbg: 15,
      met_ruk: 0,
      teploiz_ot: 0,
      teploiz_gvs: 0,
      progr_txv: 0,
      txv_pr: 10,
      region: 0,
      naspunkt: {},
      psA2: false,
      plA2: false,
    },
    flow_co: {},
    flow_gvs: {},
    isx_co: { qco: null, t1: 95, t2: 70, p1: 50, p2: 40 },
    isx_gvs: {
      qmax: null,
      qgvssr: null,
      Kchn: 2.2,
      knp: 0.8,
      ktp: 0.25,
      beta: 1.3,
      txvL: 15,
      txvZ: 5,
      t3: 60,
      t4: 50,
      p3: 50,
      p4: 40,
    },
    check_co: {
      sx_ot: false,
      fuCo: 0,
      tipLo: "kl",
      tipLp: "kl",
      tipIMo: 6,
      tipIMp: 5,
      revers: 0,
      filo: 0,
      filp: 0,
      t_srez: "",
      otmetka_T1: "",
      otmetka_T2: "",
      otmetka_T9: "",
    },
    check_gvs: {
      sx_gvs: 0,
      tipLg3: "kl",
      tipLg4: "kl",
      tipIMg3: 6,
      tipIMg4: 6,
      ok: 0,
      filg: 0,
      otmetka_T3: "",
      otmetka_T4: "",
    },
    du_co: {
      di1: null,
      di2: null,
      dut1: null,
      dut2: null,
      di9: null,
      dut9: null,
    },
    du_gvs: { di3: null, di4: null, dut3: null, dut4: null },
    gdr: {
      gdr1: {},
      gdr2: {},
      gdr3: {},
      gdr4: {},
    },
    dop: {
      truba_dop: "",
      tpl_dop: "",
      perehod_dop: "",
      otvod_dop: "",
      kozuh: 0,
    },
  },
  modules: {},
  getters: {},
  mutations: {
    mu_isx_co(Uu, payload) {
      Uu.isx_co = payload;
    },
    mu_flow_co(Uu, payload) {
      Uu.flow_co = payload;
    },
    mu_flow_gvs(Uu, payload) {
      Uu.flow_gvs = payload;
    },
    mu_isx_gvs(Uu, payload) {
      Uu.isx_gvs = payload;
    },
    mu_du_co(Uu, payload) {
      Uu.du_co = payload;
    },
    mu_du_gvs(Uu, payload) {
      Uu.du_gvs = payload;
    },
    mu_check_co(Uu, payload) {
      Uu.check_co = payload;
    },
    mu_check_gvs(Uu, payload) {
      Uu.check_gvs = payload;
    },
    mu_atm(Uu, payload) {
      Uu.atm = payload;
    },
    mu_gen(Uu, payload) {
      Uu.gen = payload;
    },
    mu_sx(Uu, payload) {
      payload.sx_otkr == 3
        ? ((Uu.check_gvs.sx_gvs = 1), (Uu.du_gvs.di4 = 0))
        : (Uu.check_gvs.sx_gvs = 0);

      Uu.sx = payload;
    },
    mu_null_CO(Uu) {
      Uu.sx.sx_ot = false;
      Uu.sx.sx_otkr = 0;
      Uu.sx.sx_gvs_dep = 0;
      Uu.isx_co = {
        qco: null,
        t1: 95,
        t2: 70,
        p1: 50,
        p2: 40,
      };
      Uu.flow_co = {};
      Uu.du_co = {
        di1: null,
        di2: null,
        dut1: null,
        dut2: null,
        di9: null,
        dut9: null,
      };
    },
    mu_null_GVS(Uu) {
      Uu.isx_gvs.qmax = null;
      Uu.isx_gvs.qgvssr = null;
      Uu.check_gvs.sx_gvs = 0;
      Uu.sx.sx_otkr = 0;
      Uu.sx.sx_gvs_dep = 0;
      Uu.flow_gvs = {};
      Uu.du_gvs = {
        di3: null,
        di4: null,
        dut3: null,
        dut4: null,
      };
    },
    mu_gidr(Uu, payload) {
      Uu.gdr = payload;
    },
    mu_DOP(Uu, payload) {
      Uu.dop = payload;
    },
  },
  actions: {
    ISX_CO(context, payload) {
      // console.log("RASXOD CO");
      // console.log(payload);
      let p_t1, p_t2, p_t9;
      if (payload.isx.qco > 0) {
        payload.isx.qco > 100
          ? (payload.isx.qco = payload.isx.qco / 1000)
          : payload.isx.qco / 1;

        payload.flow = myFns.rash_co(payload.isx);
        if (this.state.Uu.sx.sx_gvs_dep > 0) {
          payload.flow.G1ms = payload.flow.G1m + this.state.Uu.flow_gvs.G3m;
          payload.flow.G2ms = payload.flow.G1ms;
          payload.flow.G1s = +(payload.flow.G1ms / payload.flow.PL1).toFixed(3);
          payload.flow.G2s = +(payload.flow.G1ms / payload.flow.PL2).toFixed(3);
        }
        if (this.state.Uu.sx.sx_otkr > 0) {
          payload.flow.G1s = +(
            payload.flow.G1v + this.state.Uu.flow_gvs.G3v
          ).toFixed(3);
          payload.flow.G2s = +(
            payload.flow.G2v + this.state.Uu.flow_gvs.G4v
          ).toFixed(3);
          payload.flow.G1ms = +(payload.flow.G1s * payload.flow.PL1).toFixed(3);
          payload.flow.G2ms = +(payload.flow.G2s * payload.flow.PL2).toFixed(3);
        }
      } else {
        payload.flow.G1m = "";
        payload.flow.G2m = "";
        payload.flow.G1v = "";
        payload.flow.G2v = "";
        payload.flow.G2s = payload.flow.G1s;
        payload.flow.G9v = (payload.flow.G1v * 0.4).toFixed(3);
      }
      p_t1 = myFns.podbor(payload.flow.G1s);
      p_t2 = myFns.podbor(payload.flow.G2s);
      p_t9 = myFns.podbor(payload.flow.G9v);
      payload.du.di1 = p_t1.d || "";
      payload.du.di2 = p_t1.d || "";
      payload.du.dut1 = p_t1.dt || "";
      payload.du.dut2 = p_t1.dt || "";
      payload.du.di9 = p_t9.d || "";
      payload.du.dut9 = p_t9.dt || "";
      context.commit("mu_du_co", payload.du);
      context.commit("mu_isx_co", payload.isx);
      context.commit("mu_flow_co", payload.flow);
    },
    ISX_GVS(context, payload) {
      // console.log("RASXOD GVS");
      // console.log(payload);
      let k, p_t3, p_t4;

      if (payload.isx.qmax > 0) {
        let g_dep = this.state.Uu.sx.sx_gvs_dep;
        let t1;
        g_dep > 0 ? (t1 = this.state.Uu.isx_co.t1) : "";
        payload.flow = myFns.rash_gvs(payload.isx, g_dep, t1);
      } else {
        payload.flow.G3m = "";
        payload.flow.G4m = "";
        payload.flow.G4v = (payload.flow.G3v * 0.4).toFixed(3);
      }
      p_t3 = myFns.podbor(payload.flow.G3v);
      payload.du.di3 = p_t3.d || "";
      payload.du.dut3 = p_t3.dt || "";

      if (payload.du.di4 != 0 || this.state.Uu.check_gvs.sx_gvs == 0) {
        p_t4 = myFns.podbor(payload.flow.G4v);
        payload.du.di4 = p_t4.d || "";
        payload.du.dut4 = p_t4.dt || "";
      }
      context.commit("mu_isx_gvs", payload.isx);
      context.commit("mu_flow_gvs", payload.flow);
      context.commit("mu_du_gvs", payload.du);
      // }
    },
    DU_CO(context, payload) {
      context.commit("mu_du_co", payload);
    },
    DU_GVS(context, payload) {
      context.commit("mu_du_gvs", payload);
    },
    CHECK_CO(context, payload) {
      payload.tipLo === "ml" ? (payload.filo = 0) : "";
      context.commit("mu_check_co", payload);
    },
    CHECK_GVS(context, payload) {
      payload.tipLg3 === "ml" || payload.tipLg4 === "ml"
        ? (payload.filg = 0)
        : "";
      context.commit("mu_check_gvs", payload);
    },
    SX(context, payload) {
      payload.sx_otkr > 0
        ? payload.sx_gvs_dep > 0
          ? (payload.sx_otkr = 0)
          : ""
        : "";
      context.commit("mu_sx", payload);
    },
    GEN_UU(context, payload) {
      const st = this.state.Uu;
      if (st.isx_co.qco > 0 && st.isx_gvs.qmax > 0) {
        payload.tipuu = "og";
      } else if (st.isx_co.qco > 0) {
        payload.tipuu = "o";
      } else if (st.isx_gvs.qmax > 0) {
        payload.tipuu = "g";
      } else {
        payload.tipuu = "";
      }
      context.commit("mu_gen", payload);
    },
    ATM(context, payload) {
      context.commit("mu_atm", payload);
    },
    null_CO(context) {
      context.commit("mu_null_CO");
    },
    null_GVS(context) {
      context.commit("mu_null_GVS");
    },
    GIDR(context) {
      const st = this.state.Uu;
      let gdr = st.gdr;
      // function gidr(Gm, Gv, t, p, du_im, du_tr, tipL, filtr, ok, tipIM, PL)
      if (st.gen.tipuu != "g" && st.isx_co.qco > 0) {
        gdr.gdr1 = myFns.gidr(
          st.flow_co.G1ms,
          st.flow_co.G1s,
          st.isx_co.t1,
          st.isx_co.p1,
          st.du_co.di1,
          st.du_co.dut1,
          st.check_co.tipLo,
          st.check_co.filo,
          0,
          st.check_co.tipIMo,
          st.flow_co.PL1
        );
        gdr.gdr2 = myFns.gidr(
          st.flow_co.G2ms,
          st.flow_co.G2s,
          st.isx_co.t2,
          st.isx_co.p2,
          st.du_co.di2,
          st.du_co.dut2,
          st.check_co.tipLo,
          st.check_co.filo,
          0,
          st.check_co.tipIMo,
          st.flow_co.PL2
        );
      } else {
        gdr.gdr1 = {};
        gdr.gdr2 = {};
      }
      if (st.gen.tipuu != "o" && st.isx_gvs.qmax > 0) {
        gdr.gdr3 = myFns.gidr(
          st.flow_gvs.G3m,
          st.flow_gvs.G3v,
          st.isx_gvs.t3,
          st.isx_gvs.p3,
          st.du_gvs.di3,
          st.du_gvs.dut3,
          st.check_gvs.tipLg3,
          st.check_gvs.filg,
          0,
          st.check_gvs.tipIMg3,
          st.flow_gvs.PL3
        );
        if (st.check_gvs.sx_gvs == 0) {
          gdr.gdr4 = myFns.gidr(
            st.flow_gvs.G4m,
            st.flow_gvs.G4v,
            st.isx_gvs.t4,
            st.isx_gvs.p4,
            st.du_gvs.di4,
            st.du_gvs.dut4,
            st.check_gvs.tipLg4,
            st.check_gvs.filg,
            st.check_gvs.ok,
            st.check_gvs.tipIMg4,
            st.flow_gvs.PL4
          );
        } else {
          gdr.gdr4 = {};
        }
      } else {
        gdr.gdr3 = {};
        gdr.gdr4 = {};
      }
      // console.log(gdr);
      context.commit("mu_gidr", gdr);
    },
    DOP(context, payload) {
      context.commit("mu_DOP", payload);
    },
  },
};
