import * as myFns from "@/utils/FuncUu.js";
export default {
  state: {
    gen: { tipuu: "", tipkp: "", IL: false },
    sx: { sx_otkr: 0, sx_gvs_dep: 0, sx_ot: false },
    atm: {
      tipSB: 0,
      pltr: ["gsm", "usba"],
      lvru: 30,
      lsbo: 15,
      lsbg: 15,
      met_ruk: 0,
      teploiz_ot: 0,
      teploiz_gvs: 0,
      selReg: 0,
      mess: [],
      indexnas: "",
      progr_txv: 0,
      txv_pr: 10
    },
    flow_co: { G1m: null, G2m: null, G1v: null, G2v: null, G9v: null },
    flow_gvs: { G3m: null, G4m: null, G3v: null, G4v: null },
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
      p4: 40
    },
    check_co: {
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
      otmetka_T9: ""
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
      otmetka_T4: ""
    },
    du_co: {
      di1: null,
      di2: null,
      di9: null,
      dut1: null,
      dut2: null,
      dut9: null
    },
    du_gvs: { di3: null, di4: null, dut3: null, dut4: null }
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
        p2: 40
      };
      Uu.flow_co = {};
      Uu.du_co = {
        di1: null,
        di2: null,
        di9: null,
        dut1: null,
        dut2: null,
        dut9: null
      };
    },
    mu_null_GVS(Uu) {
      Uu.isx_gvs.qmax = null;
      Uu.isx_gvs.qgvssr = null;
      Uu.check_gvs.sx_gvs = 0;
      Uu.sx.sx_otkr = 0;
      Uu.sx.sx_gvs_dep = 0;
      Uu.flow_gvs = { G3m: null, G4m: null, G3v: null, G4v: null };
      Uu.du_gvs = {
        di3: null,
        di4: null,
        dut3: null,
        dut4: null
      };
    }
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

        let r = myFns.rash_co(
          payload.isx.qco,
          payload.isx.t1,
          payload.isx.t2,
          payload.isx.p1,
          payload.isx.p2
        );
        payload.flow.G1m = r.r || "";
        payload.flow.G2m = r.r || "";
        payload.flow.G1v = r.r1 || "";
        payload.flow.G2v = r.r2 || "";
        payload.flow.G9v = (payload.isx.qco * 3.6).toFixed(2);

        if (this.state.Uu.sx.sx_gvs_dep > 0) {
          let f1 = payload.flow.G1m + this.state.Uu.flow_gvs.G3m;
          // let f2 = payload.flow.G2m + this.state.Uu.flow_gvs.G4m;
          let pl1 = myFns.ro(payload.isx.t1, payload.isx.p1);
          let pl2 = myFns.ro(payload.isx.t2, payload.isx.p2);
          payload.flow.G1v = +((f1 / pl1) * 1000).toFixed(3);
          payload.flow.G2v = +((f1 / pl2) * 1000).toFixed(3);
        }

        if (this.state.Uu.sx.sx_otkr > 0) {
          payload.flow.G1v = (
            payload.flow.G1v + this.state.Uu.flow_gvs.G3v
          ).toFixed(3);
          payload.flow.G2v = (
            payload.flow.G2v + this.state.Uu.flow_gvs.G4v
          ).toFixed(3);
        }
      } else {
        payload.flow.G1m = "";
        payload.flow.G2m = "";

        payload.flow.G2v = payload.flow.G1v;
        payload.flow.G9v = (payload.flow.G1v * 0.4).toFixed(3);
      }

      p_t1 = myFns.podbor(payload.flow.G1v);
      p_t2 = myFns.podbor(payload.flow.G2v);
      p_t9 = myFns.podbor(payload.flow.G9v);

      payload.du.di1 = p_t1.d || "";
      payload.du.di2 = p_t1.d || "";
      payload.du.dut1 = p_t1.dt || "";
      payload.du.dut2 = p_t1.dt || "";
      payload.du.di9 = p_t9.d || "";
      payload.du.dut9 = p_t9.dt || "";

      context.commit("mu_isx_co", payload.isx);
      context.commit("mu_flow_co", payload.flow);
      context.commit("mu_du_co", payload.du);
    },
    ISX_GVS(context, payload) {
      // console.log("RASXOD GVS");
      // console.log(payload);
      let k, p_t3, p_t4, a, a1, b, b1;

      if (payload.isx.qmax > 0) {
        a = payload.isx.t3;
        a1 = payload.isx.txvZ;
        b = payload.isx.t3;
        b1 = payload.isx.t4;
        this.state.Uu.sx.sx_gvs_dep > 0
          ? ((a1 = payload.isx.t4), (b = this.state.Uu.isx_co.t1), (b1 = 55))
          : "";
        this.state.Uu.sx.sx_gvs_dep == 2 ? (k = 0.55) : (k = 1);
        let r = myFns.rash_gvs(
          payload.isx.qmax,
          payload.isx.qgvssr,
          a,
          a1,
          b,
          b1,
          payload.isx.p3,
          payload.isx.p4,
          payload.isx.ktp,
          k
        );
        payload.flow.G3m = r.r1 || "";
        payload.flow.G3v = r.r3 || "";
        payload.flow.G4m = r.r2 || "";
        payload.flow.G4v = r.r4 || "";
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
      // payload.sx_otkr > 0
      //   ? payload.sx_gvs_dep > 0
      //     ? (payload.sx_otkr = 0)
      //     : ""
      //   : "";
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
    }
  }
};
