export default {
  state: {
    isx: {
      floor: 9,
      Qco: "",
      t1: 110,
      t2: 70,
      t11: 95,
      t21: 70,
      p1: 65,
      p2: 45,
    },
    check: {
      G1: "",
      G2: "",
      G3: "",
      u: "",
      dut1: "",
      dut11: "",
      dut3: "",
      v1: "",
      v2: "",
      resis: "",
      filter_t1: false,
    },
    cl_R: {
      dP: 0.5,
      Kv: "",
      Kvs: "",
      dP_f: "",
      du: "",
      tip: 2,
      spec_name: "",
      obozn: "",
      zavod: "",
      kolvo: 1,
      suf: "clr",
    },
    cl_drive: {
      spec_name: "Электропривод клапана ",
      obozn: "",
      zavod: "",
      kolvo: 1,
    },
    cl_P: {
      enable: false,
      dP: 0.5,
      Kv: "",
      Kvs: "",
      dP_f: "",
      diap: "",
      spec_name: "",
      obozn: "",
      zavod: "",
      du: "",
      kolvo: 0,
      suf: "clp",
    },
    cl_D: {
      enable: false,
      balans: false,
      dP: 0.5,
      Kv: "",
      Kvs: "",
      diap: "",
      dP_f: "",
      spec_name: "",
      obozn: "",
      zavod: "",
      du: "",
      kolvo: 0,
      suf: "cld",
    },
    pumps: {
      two_pumps: true,
      double: false,
      perem: false,
      freq: false,
      phases: false,
      G: "",
      h: "",
      resis: "",
      kf: 1.15,
      w: "",
      zavod: "",
      du: "",
      spec_name: "",
      obozn: "",
      kolvo: "",
      taps: false,
      suf: "pump",
    },
    spec: [],
  },
  modules: {},
  getters: {},
  mutations: {
    mu_isx_auu(Auu, payload) {
      Auu.isx = payload;
    },
    mu_check(Auu, payload) {
      Auu.check = payload;
    },
    mu_clr(Auu, payload) {
      Auu.cl_R = payload;
    },
    mu_cl_dri(Auu, payload) {
      Auu.cl_drive = payload;
    },
    mu_clp(Auu, payload) {
      Auu.cl_P = payload;
    },
    mu_cld(Auu, payload) {
      Auu.cl_D = payload;
    },
    mu_pumps(Auu, payload) {
      Auu.pumps = payload;
    },
    mu_spec(Auu, payload) {
      Auu.spec = payload;
    },
    mu_spec_rem(Auu, payload) {
      Auu.spec = [];
    },
  },
  actions: {
    ISX_AUU(context, payload) {
      context.commit("mu_isx_auu", payload);
    },
    CHECK(context, payload) {
      context.commit("mu_check", payload);
    },
    CL_REG(context, payload) {
      context.commit("mu_clr", payload);
    },
    CL_DRI(context, payload) {
      context.commit("mu_cl_dri", payload);
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
    SPEC_REM(context) {
      context.commit("mu_spec_rem");
    },
    STAND(context) {
      context.commit("mu_spec_rem");
      const st = this.state.Auu;
      class El {
        constructor(text, type, du, quantity, suf) {
          this.text = text;
          this.type = type;
          this.du = du;
          this.quantity = quantity;
          this.suf = suf;
        }
      }
      let x, v, du_;
      let _ee = [];
      _ee.push(new El("Кран", "tapLD", st.check.dut1, 2, "kr_t1"));
      _ee.push(new El("Кран", "tapLD", st.check.dut11, 2, "kr_t11"));
      st.pumps.perem ? (du_ = st.check.dut3) : (du_ = st.check.dut11);
      st.pumps.two_pumps ? (x = 4) : st.pumps.perem ? (x = 2) : (x = 0);

      if (x > 0) {
        st.pumps.taps
          ? _ee.push(new El("Кран", "tapLD", du_, x, "kr_pu"))
          : _ee.push(new El("Затвор", "zatv", du_, x, "zatv"));
      }
      st.pumps.perem
        ? st.pumps.two_pumps
          ? _ee.push(new El("Обратный клапан", "ok", st.check.dut3, 2, "ok_t3"))
          : _ee.push(new El("Обратный клапан", "ok", st.check.dut3, 1, "ok_t3"))
        : st.pumps.two_pumps
        ? (_ee.push(new El("Обратный клапан", "ok", st.check.dut3, 1, "ok_t3")),
          _ee.push(
            new El("Обратный клапан", "ok", st.check.dut11, 2, "ok_t11")
          ))
        : _ee.push(new El("Обратный клапан", "ok", st.check.dut3, 1, "ok_t3"));

      st.pumps.two_pumps ? (v = 4) : (v = 2);
      _ee.push(new El("Виброкомпенсатор", "vibro", du_, v, "vib"));

      !st.pumps.perem || st.cl_D.enable
        ? (_ee.push(new El("Обратный клапан", "ok", 50, 1, "ok_zap")),
          _ee.push(new El("Кран", "tapLD", 50, 1, "kr_zap")))
        : du_;

      _ee.push(new El("Фильтр", "filt", st.check.dut11, 1, "fil_t11"));
      st.check.filter_t1
        ? _ee.push(new El("Фильтр", "filt", st.check.dut1, 1, "fil_t1"))
        : "";
      const result = _ee.reduce(function (acc, val) {
        let o = acc
          .filter(function (obj) {
            return obj.type == val.type && obj.du == val.du;
          })
          .pop() || {
          text: val.text,
          type: val.type,
          du: val.du,
          quantity: 0,
          suf: val.suf,
        };
        o.quantity += val.quantity;
        acc.push(o);
        return acc;
      }, []);
      const uniq = Array.from(new Set(result));
      context.commit("mu_spec", uniq);
    },
  },
};
