import DU from "@/utils/du";

export function diap_tr(d) {
  let pos = DU.map(function(el) {
    return el.val;
  }).indexOf(d);
  let diap = DU.slice(pos, pos + 4);
  return diap;
}
export function speed(G, du) {
  let s = Math.pow(du * 0.001, 2) / 4;
  let v = +((G * 1) / (3.14 * s) / 3600).toFixed(2);
  return v;
}
export function podbor(Gv) {
  var THRESHOLD = 1.5;
  var du = [];
  var d = [];
  var v = [];
  du = [15, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300];
  du.forEach(function(el) {
    var a1 = Math.pow(el * 0.001, 2) / 4;
    var vs = (Gv * 1) / (3.14 * a1) / 3600;
    if (vs.toFixed(2) <= +THRESHOLD) {
      d.push(el);
      v.push(+vs.toFixed(2));
    }
  });
  if (d.length == 0) {
    var eel = du[du.length - 1];
    var a2 = Math.pow(eel * 0.001, 2) / 4;
    var vs2 = (Gv * 1) / (3.14 * a2) / 3600;
    d.push(eel);
    v.push(+vs2.toFixed(2));
  }
  if (d.length == 1) {
    eel = du[du.length - 1];
    a2 = Math.pow(eel * 0.001, 2) / 4;
    vs2 = (Gv * 1) / (3.14 * a2) / 3600;
    d.push(eel);
    v.push(+vs2.toFixed(2));
  }
  return { v: v[0], d: d[0], dt: d[1] };
}
export function rash_co(isx) {
  let { qco, t1, t2, p1, p2 } = isx;
  let G1m = +((qco * 1000) / (t1 - t2)).toFixed(3);
  let G2m = G1m;
  let PL1 = +ro(t1, p1);
  let PL2 = +ro(t2, p2);
  let G1v = +(G1m / PL1).toFixed(3);
  let G2v = +(G2m / PL2).toFixed(3);
  let G9v = +(qco * 3.6).toFixed(2);
  let G1s = G1v;
  let G2s = G2v;
  let G1ms = G1m;
  let G2ms = G2m;
  return { G1s, G2s, G1m, G2m, G1v, G2v, G9v, PL1, PL2, G1ms, G2ms };
}
export function rash_gvs(isx, d_dep, t1) {
  let { Kchn, beta, knp, ktp, p3, p4, qgvssr, qmax, t3, t4, txvL, txvZ } = isx;
  let koef = 1;
  let tt3 = "";
  d_dep > 0 ? ((tt3 = t1), (txvL = t4), (txvZ = t4)) : (tt3 = t3);
  d_dep == 2 ? (koef = 0.55) : "";
  let G3m = +((koef * qmax * 1000) / (t3 - txvZ)).toFixed(3); //*
  let Qgvscirkz = +((ktp * qgvssr) / (1 + ktp)).toFixed(6);
  let G4m = +((Qgvscirkz * 1000) / (tt3 - t4)).toFixed(3);
  let PL3 = +ro(tt3, p3);
  let PL4 = +ro(t4, p4);
  let G3v = +(G3m / PL3).toFixed(3);
  let G4v = +(G4m / PL4).toFixed(3);
  let Ggvssr = +((koef * qgvssr * 1000) / (t3 - txvZ)).toFixed(3);
  let Qgvsmaxl = +(qmax * knp).toFixed(6);
  let Ggvsmaxl = +((Qgvsmaxl * 1000) / (t3 - txvL)).toFixed(3);
  let Qgvssrl = +(Qgvsmaxl / Kchn).toFixed(6);
  let Ggvssrl = +((Qgvssrl * 1000) / (t3 - txvL)).toFixed(3);
  let Qgvscirkl = +((ktp * Qgvssrl) / (1 + ktp)).toFixed(6);
  let Ggvscirkl = +((beta * Qgvscirkl * 1000) / (t3 - t4)).toFixed(3);
  let Ggvscirklmax = +(Ggvscirkl * 1.5).toFixed(3);
  let Ggvscirklmin = +(Ggvscirkl * 0.4).toFixed(3);
  return {
    G3m,
    G4m,
    G3v,
    G4v,
    Ggvssr,
    Qgvscirkz,
    Qgvsmaxl,
    Ggvsmaxl,
    Qgvssrl,
    Ggvssrl,
    Qgvscirkl,
    Ggvscirklmax,
    Ggvscirklmin,
    PL3,
    PL4
  };
}

export function gidr(Gm, Gv, t, p, du_im, du_tr, tipL, filtr, ok, tipIM, PL) {
  let ki = "_" + du_tr + du_im,
    L = 0,
    alf = 0,
    alfaAr = alfaArF(),
    alfaAr_mod = alfaAr_modF();
  // console.log(ki);

  if (tipL === "kl") {
    alf = alfaAr[ki].alf;
    tipIM === 6 ? (L = alfaAr[ki].li6) : (L = alfaAr[ki].lk5);
  } else if (tipL === "ml") {
    if (alfaAr_mod[ki]) {
      alf = alfaAr_mod[ki].alf;
      tipIM === 6 ? (L = alfaAr_mod[ki].li6) : (L = alfaAr_mod[ki].lk5);
    }
  }
  let sherh = 0.5;
  let atr = Math.pow(du_tr * 0.001, 2) / 4;
  let Vtr = ((Gv * 1) / (3.14 * atr) / 3600).toFixed(2);
  let Kvs = KvsarF(du_im, du_tr, Gv, Vtr, filtr, ok, tipL);

  let a1 = Math.pow(du_im * 0.001, 2) / 4;
  let V = ((Gv * 1) / (3.14 * a1) / 3600).toFixed(2);
  let n = 17.8 / (1 + 0.0337 * t + 0.000221 * Math.pow(t, 2));
  let re = (du_im * V) / (n * 0.0001);
  let I = 0.11 * Math.pow(68 / re + sherh / du_im, 0.25);
  let Kd = (-0.24 * Math.log(re)) / Math.LN10 + 2.869;

  let Xtr = 0,
    Xk = 0,
    Xr = 0;

  if (alf != 0) {
    let Xtr =
      (I / (8 * Math.sin(((alf / 2) * Math.PI) / 180))) *
      (1 - Math.pow(du_im / du_tr, 4));
    let Xk =
      (-0.0125 * Math.pow(du_im / du_tr, 6) +
        0.0224 * Math.pow(du_im / du_tr, 5) -
        0.00723 * Math.pow(du_im / du_tr, 4) +
        0.00444 * Math.pow(du_im / du_tr, 2) -
        0.00745) *
        (Math.pow(0.01745 * alf, 3) -
          2 * Math.PI * Math.pow(0.01745 * alf, 2) -
          10 * 0.01745 * alf) +
      Xtr;
    let Xr =
      Kd *
      3.2 *
      Math.pow(1 - Math.pow(du_im / du_tr, 2), 2) *
      Math.pow(Math.tan(((alf / 2) * Math.PI) / 180), 1.25);
  }

  let Hk = (Xk * Math.pow(V, 2)) / (2 * 9.81);
  let alshu = 0.11 * Math.pow(68 / re + 0.03 / du_im, 0.25);
  let Hi =
    ((I * (8 * du_im + 10) + alshu * L - alshu * (8 * du_im + 10)) *
      Math.pow(V, 2)) /
    (2 * 9.81 * du_im);
  let Hd = ((Xr + Xtr) * Math.pow(V, 2)) / (2 * 9.81);
  let H = Hk + Hi + Hd;
  let Ptrmestn =
    20 * Math.pow(Kvs.poter_kr, 2) +
    10 * Math.pow(Kvs.poter_ok, 2) +
    10 * Math.pow(Kvs.poter_fil, 2) +
    Math.pow(Kvs.poter_grz / (2 * 9.81), 2);
  let Puu = (H + Ptrmestn).toFixed(4);

  let Gidr = {
    du_tr,
    du_im,
    L,
    alf,
    Puu,
    Gm,
    t,
    p,
    sherh,
    Gv,
    V: V,
    PL,
    n: n.toFixed(2) + "E-07",
    re: re.toFixed(),
    I: I.toFixed(4),
    Xtr: Xtr.toFixed(4),
    Xk: Xk.toFixed(4),
    Kd: Kd.toFixed(4),
    Xr: Xr.toFixed(4),
    Hk: Hk.toFixed(4),
    Hi: Hi.toFixed(4),
    Hd: Hd.toFixed(4),
    H: H.toFixed(4),
    Ptrmestn: Ptrmestn.toFixed(4),
    kr: Kvs.Kvs_kr,
    filtr: Kvs.Kvs_fil,
    grz: Kvs.Kvs_grz,
    ok: Kvs.Kvs_ok
  };
  return Gidr;
}

function ro(t, p) {
  var ror = (
    (Math.pow(t * 0.01, 5) * (-0.033875 * p + 12.742) +
      Math.pow(t * 0.01, 4) * (0.096667 * p - 44.488) +
      Math.pow(t * 0.01, 3) * (-0.11255 * p + 68.806) +
      Math.pow(t * 0.01, 2) * (0.083292 * p - 84.927) +
      t * 0.01 * (-0.037762 * p + 6.4159) +
      0.049917 * p +
      999.792) /
    1000
  ).toFixed(3);
  return ror;
}
function alfaArF() {
  return {
    _1515: { alf: 0, li6: "", lk5: 135 },
    _2015: { alf: 8.4, li6: "", lk5: 411 },

    _2515: { alf: 13.8, li6: "", lk5: 437 },
    _2525: { alf: 0, li6: 200, lk5: 437 },

    _3215: { alf: 11.7, li6: "", lk5: 437 },
    _3225: { alf: 11.4, li6: 460, lk5: 422 },
    _3232: { alf: 0, li6: 200, lk5: 162 },

    _4025: { alf: 24.4, li6: 480, lk5: 442 },
    _4032: { alf: 13.4, li6: 530, lk5: 492 },
    _4040: { alf: 0, li6: 200, lk5: 201 },

    _5025: { alf: 31, li6: 490, lk5: 452 },
    _5032: { alf: 23.8, li6: 590, lk5: 552 },
    _5040: { alf: 11.4, li6: 590, lk5: 591 },
    _5050: { alf: 0, li6: 200, lk5: 200 },

    _6532: { alf: 38.2, li6: 610, lk5: 572 },
    _6540: { alf: 25, li6: 640, lk5: 641 },
    _6550: { alf: 15.4, li6: 690, lk5: 690 },
    _6565: { alf: 0, li6: 240, lk5: 210 },

    _8040: { alf: 32.6, li6: 650, lk5: 651 },
    _8050: { alf: 24, li6: 700, lk5: 700 },
    _8065: { alf: 10, li6: 790, lk5: 760 },
    _8080: { alf: 0, li6: 240, lk5: 240 },

    _10050: { alf: 35.4, li6: 710, lk5: 710 },
    _10065: { alf: 22.6, li6: 800, lk5: 770 },
    _10080: { alf: 13.6, li6: 850, lk5: 850 },
    _100100: { alf: 0, li6: "", lk5: 270 },

    _12565: { alf: 31.8, li6: 840, lk5: 810 },
    _12580: { alf: 24.8, li6: 890, lk5: 890 },
    _125100: { alf: 14.2, li6: "", lk5: 970 },

    _15080: { alf: 30.2, li6: 950, lk5: 950 },
    _150100: { alf: 22.2, li6: "", lk5: 1030 },
    _150150: { alf: 0, li6: "", lk5: 320 },

    _200100: { alf: 60.3, li6: "", lk5: 1110 },
    _200150: { alf: 24.2, li6: "", lk5: 1150 },
    _200200: { alf: 0, li6: "", lk5: 380 },

    _250150: { alf: 8.4, li6: "", lk5: 320 },
    _250200: { alf: 17, li6: "", lk5: 380 },

    _300150: { alf: 61.4, li6: "", lk5: 320 },
    _300200: { alf: 32.8, li6: "", lk5: 380 },
    _300300: { alf: 0, li6: "", lk5: 454 }
  };
}
function alfaAr_modF() {
  return {
    _3232: { alf: 0, li6: 746, lk5: 708 },

    _4032: { alf: 13.4, li6: 1006, lk5: 968 },
    _4040: { alf: 0, li6: 820, lk5: 821 },

    _5032: { alf: 23.8, li6: 1036, lk5: 998 },
    _5040: { alf: 11.4, li6: 1140, lk5: 1141 },
    _5050: { alf: 0, li6: 908, lk5: 909 },

    _6532: { alf: 38.2, li6: 1056, lk5: 1018 },
    _6540: { alf: 25, li6: 1160, lk5: 1161 },
    _6550: { alf: 15.4, li6: 1248, lk5: 1249 },
    _6565: { alf: 0, li6: 1092, lk5: 1062 },

    _8040: { alf: 32.6, li6: 1170, lk5: 1171 },
    _8050: { alf: 24, li6: 1258, lk5: 1259 },
    _8065: { alf: 10, li6: 1442, lk5: 1412 },
    _8080: { alf: 0, li6: 1206, lk5: 1196 },

    _10050: { alf: 35.4, li6: 1268, lk5: 1269 },
    _10065: { alf: 22.6, li6: 1452, lk5: 1422 },
    _10080: { alf: 13.6, li6: 1566, lk5: 1556 },

    _12565: { alf: 31.8, li6: 1492, lk5: 1462 },
    _12580: { alf: 24.8, li6: 1606, lk5: 1595 },

    _15080: { alf: 30.2, li6: 1666, lk5: 1656 }
  };
}
function KvsarF(du_im, du_tr, Gv, Vtr, filtr, ok, tipL) {
  let zau = "_" + du_im,
    tr = "_" + du_tr,
    Kvs_kr = "-",
    poter_kr = "-",
    Kvs_ok = "-",
    poter_ok = 0,
    Kvs_fil = "-",
    poter_fil = 0,
    Kvs_grz = "-",
    poter_grz = 0;

  const Kvsar = {
    _15: { kr: 11, ok: 4.24, grz: 10, flt: 5.3 },
    _20: { kr: 15, ok: 7.8, grz: 10, flt: 9.5 },
    _25: { kr: 34, ok: 12.4, grz: 10, flt: 16.5 },
    _32: { kr: 52, ok: 18, grz: 10, flt: 20 },
    _40: { kr: 96, ok: 28, grz: 10, flt: 33 },
    _50: { kr: 184, ok: 40.1, grz: 10, flt: 54 },
    _65: { kr: 200, ok: 72.5, grz: 10, flt: 95 },
    _80: { kr: 470, ok: 111, grz: 10, flt: 140 },
    _100: { kr: 640, ok: 182, grz: 10, flt: 201 },
    _125: { kr: 1080, ok: 302, grz: 10, flt: 340 },
    _150: { kr: 1900, ok: 370, grz: 10, flt: 526 },
    _200: { kr: 2300, ok: 546, grz: 10, flt: 870 },
    _250: { kr: 5100, ok: 2010, grz: 10, flt: 1260 },
    _300: { kr: 9100, ok: 2459, grz: 10, flt: 1735 }
  };
  if (tipL === "kl") {
    Kvs_kr = Kvsar[tr].kr;
    poter_kr = Gv / Kvs_kr;
    if (ok == 1) {
      Kvs_ok = Kvsar[tr].ok;
      poter_ok = Gv / Kvs_ok;
    }

    if (+filtr == 1) {
      Kvs_fil = Kvsar[tr].flt;
      poter_fil = Gv / Kvs_fil;
    }

    if (+filtr == 2) {
      Kvs_grz = Kvsar[tr].grz;
      poter_grz = Kvs_grz * Vtr * Vtr;
    }
  } else if (tipL === "ml") {
    Kvs_kr = Kvsar[zau].kr;
    poter_kr = Gv / Kvs_kr;
  }
  return {
    Kvs_kr,
    poter_kr,
    Kvs_ok,
    poter_ok,
    Kvs_fil,
    poter_fil,
    Kvs_grz,
    poter_grz
  };
}
