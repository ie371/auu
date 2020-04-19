export function ro(t, p) {
  var ror = (
    Math.pow(t * 0.01, 5) * (-0.033875 * p + 12.742) +
    Math.pow(t * 0.01, 4) * (0.096667 * p - 44.488) +
    Math.pow(t * 0.01, 3) * (-0.11255 * p + 68.806) +
    Math.pow(t * 0.01, 2) * (0.083292 * p - 84.927) +
    t * 0.01 * (-0.037762 * p + 6.4159) +
    0.049917 * p +
    999.792
  ).toFixed();
  return ror;
}

export function rash(q, t1, t2, p1) {
  let r = +((q * 1000) / (t1 - t2));
  r = +((r / ro(t1, p1)) * 1000).toFixed(3);
  return r;
}
export function speed(G, du) {
  let s = Math.pow(du * 0.001, 2) / 4;
  let v = +((G * 1) / (3.14 * s) / 3600).toFixed(2);
  return v;
}
export function dutr(Gm, t, p, sk) {
  var THRESHOLD = sk;
  var du = [];
  var d = [];
  var Gv = +((Gm / ro(t, p)) * 1000).toFixed(3);
  du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 150, 200, 300];

  du.forEach(function(el) {
    let vs = speed(Gv, el);
    if (vs.toFixed(2) <= +THRESHOLD) {
      d.push(el);
    }
  });

  if (d.length == 0 || d.length == 1) {
    var eel = du[du.length - 1];
    d.push(eel);
  }
  return d[0];
}

export function Kv(G, dp) {
  let kv = ((1.15 * G) / Math.sqrt(dp)).toFixed(2);
  return kv;
}

export function dP_fact(G, kvs) {
  let kvf = +Math.pow((1 * G) / kvs, 2).toFixed(2);
  return kvf;
}

export function G_pump(G, k, u, p) {
  let x;
  p ? (x = 0) : (x = 1);
  let Gp = (k * G * (x + u)).toFixed(3);

  return Gp;
}
