// const opt = ["Кран", "Затвор", "Фильтр", "Обратный клапан"];

const opt = {
  tap_set: {
    text: "Кран",
    tip: "tap",
    // du: this.check.duT1,
    du: "",
    quantity: 2
  },
  tap_sys: {
    text: "Кран",
    tip: "tap",
    // du: this.check.duT11,
    du: "",
    quantity: 2
  },
  tap_pump: {
    text: "",
    tip: "",
    // du: this.check.duT11,
    du: "",
    quantity: 0
  },
  tap_obv: {
    text: "Кран",
    tip: "tap",
    du: 50,
    quantity: 0
  },
  ok: {
    text: "Обратный клапан",
    tip: "ok",
    // du: du_ok,
    du: "",
    quantity: 0
  },
  ok_obv: {
    text: "Обратный клапан",
    tip: "ok",
    du: 50,
    quantity: 0
  },
  filter: {
    text: "Фильтр",
    tip: "filter",
    // du: this.check.duT11,
    du: "",
    quantity: 1
  }
};

export default opt;
