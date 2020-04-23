<template>
  <v-row no-gutters>
    <v-list-item dense>
      <div>
        <strong class="orange--text">Система ГВС</strong>
      </div>
    </v-list-item>
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            v-model="sx.sx_gvs_dep"
            :items="sx_ts"
            item-text="text"
            item-value="val"
            label="Схема теплоснабжения"
            hide-details
            :disabled="no_teploob"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Кчн/////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="2">
          <v-text-field
            dense
            label="Кчн"
            class="inputD"
            type="number"
            hide-details
            v-model="isx.Kchn"
            v-on:input="qgvs('kc')"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            label="Тхвл"
            class="inputD"
            type="number"
            hide-details
            v-model="isx.txvL"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            label="Тхвз"
            class="inputD"
            type="number"
            hide-details
            v-model="isx.txvZ"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Кнп"
            class="inputD"
            type="number"
            hide-details
            v-model="isx.knp"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Ктп"
            class="inputD"
            type="number"
            hide-details
            v-model="isx.ktp"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            label="beta"
            class="inputD"
            type="number"
            hide-details
            v-model="isx.beta"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Qmax/////////////////////////////////// -->
    <v-list-item>
      <v-row align="center" justify="space-between" dense>
        <!-- <v-col cols="5"></v-col> -->
        <v-col cols="3">
          <v-text-field
            dense
            label="Qmax, Гкал/ч"
            class="inputD"
            type="number"
            hide-details
            v-model.number="isx.qmax"
            v-on:input="qgvs('qm')"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            label="Qср, Гкал/ч"
            class="inputD"
            type="number"
            hide-details
            v-model.number="isx.qgvssr"
            v-on:input="qgvs('qs')"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
        <v-layout align-start justify-start>
          <strong class="red--text">Подача</strong>
        </v-layout>
        <v-layout align-center justify-center>
          <strong class="blue--text">Обратка</strong>
        </v-layout>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Tемп график/////////////////////////////////// -->
    <v-list-item dense>
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Tемп график{{leto}}, °C</span>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model="isx.t3"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-col cols="3" v-show="tup">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model="isx.t4"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Давление/////////////////////////////////// -->
    <v-list-item dense>
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Давление, мвст</span>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model="isx.p3"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
        <v-col cols="3" v-show="tup">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model="isx.p4"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Расход/////////////////////////////////// -->
    <v-list-item dense>
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Расход, м³/ч</span>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model="flow.G3v"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="6"
            v-on:input="rash()"
          ></v-text-field>
        </v-col>
        <v-col cols="3" v-show="tup ">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            disabled
            v-model="flow.G4v"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Ду прибора/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Ду прибора</span>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="DUIM"
            item-text="text"
            item-value="val"
            v-model="du.di3"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="diap_IM4"
            item-text="text"
            item-value="val"
            v-model="du.di4"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Скорость/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Скорость, м/с</span>
        </v-col>
        <v-col cols="3" :class="{'err' : check_speed.v0 }">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            disabled
            v-model.number="V3"
          ></v-text-field>
        </v-col>
        <v-col cols="3" :class="{'err' : check_speed.v1 }" v-show="tup">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            disabled
            v-model.number="V4"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Тип ИМ/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Тип ИМ</span>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_i63 }"
            hide-details
            :items="tip_im"
            item-text="text"
            item-value="val"
            :append-icon="no_i63 ? 'mdi-alert-rhombus-outline' : undefined"
            @change="IM(3)"
            v-model="IM3"
          ></v-select>
        </v-col>
        <v-col cols="3" v-show="tup">
          <v-select
            dense
            class="inputD"
            :class="{ 'errs' : no_i64 , 'errs_y' : yellow_im4}"
            hide-details
            :items="tip_im"
            item-text="text"
            item-value="val"
            :append-icon="no_i64 ? 'mdi-alert-rhombus-outline' : undefined"
            @change="IM(4)"
            v-model="IM4"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Ду трубопроводов/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Ду трубопроводов</span>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="diap_t3"
            item-text="text"
            item-value="val"
            v-model="du.dut3"
          ></v-select>
        </v-col>
        <v-col cols="3" v-show="tup">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="diap_t4"
            item-text="text"
            item-value="val"
            v-model="du.dut4"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Отметки/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row dense>
        <v-col cols="6">
          <span class="caption py-3">Отметки</span>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_T3"></v-text-field>
        </v-col>
        <v-col cols="3" v-show="tup">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_T4"></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Тип изм. линии/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row justify="space-between">
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_mod3 }"
            :items="tip_lin"
            item-text="text"
            item-value="val"
            label="Тип изм. линии T3"
            hide-details
            :append-icon="no_mod3 ? 'mdi-alert-rhombus-outline' : undefined"
            @change="IL(3)"
            v-model="L3"
          ></v-select>
        </v-col>
        <v-col cols="6" v-show="tup">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_mod4,'errs_y' : yellow_IL4 }"
            :items="tip_lin"
            item-text="text"
            item-value="val"
            label="Тип изм. линии T4"
            hide-details
            :append-icon="no_mod4 ? 'mdi-alert-rhombus-outline' : undefined"
            @change="IL(4)"
            v-model="L4"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////Обратный клапан/////////////////////////////////// -->
    <v-list-item dense v-show="dis_dep">
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            v-model="check.filg"
            :items="tip_filtr"
            item-text="text"
            item-value="val"
            label="Фильтр"
            hide-details
            :disabled="no_filter"
          ></v-select>
        </v-col>
        <v-layout align-center justify-center v-show="tup">
          <v-switch
            dense
            class="inputD mt-0"
            v-model.number="check.ok"
            label="Обратный клапан"
            color="deep-orange"
            hide-details
          ></v-switch>
        </v-layout>

        <v-col cols="6"></v-col>
      </v-row>
    </v-list-item>
  </v-row>
</template>
 <script>
import { mapState } from "vuex";
import * as myFns from "@/utils/FuncUu.js";
import DU from "@/utils/du";
import DUIM from "@/utils/du_im";
export default {
  data() {
    return {
      DU,
      DUIM,
      V3: "",
      V4: "",
      // G4: "",
      diap_t3: [],
      diap_t4: [],
      sx_ts: [
        { text: "открытая", val: 0 },
        { text: "закрытая 1 ступ", val: 1 },
        { text: "закрытая 2-х ступ", val: 2 }
      ],
      formula_u: [
        { text: "закрытая (М1 = М2)", val: 0 },
        { text: "открытая (М1 - М2)", val: 1 }
      ],
      tip_lin: [
        { text: "Классическая", val: "kl" },
        { text: "Модифицированная", val: "ml" }
      ],
      tip_filtr: [
        { text: "без фильтра", val: 0 },
        { text: "сетчатый фильтр", val: 1 },
        { text: "грязевик", val: 2 }
      ],
      tip_im: [
        { text: "И6", val: 6 },
        { text: "К5", val: 5 }
      ],
      dis_dep: true,
      IM3: 6,
      IM4: 6,
      L3: "kl",
      L4: "kl"
    };
  },

  computed: {
    ...mapState({
      sx: state => state.Uu.sx,
      gen: state => state.Uu.gen,
      isx: state => state.Uu.isx_gvs,
      isx_co: state => state.Uu.isx_co,
      check: state => state.Uu.check_gvs,
      du: state => state.Uu.du_gvs,
      flow: state => state.Uu.flow_gvs
    }),

    leto() {
      let a;
      this.dis_dep ? (a = "") : (a = " (лето)");
      return a;
    },
    tup() {
      let a;
      this.check.sx_gvs == 0 ? (a = true) : (a = false);
      return a;
    },
    check_speed() {
      let obj = {},
        sp = [this.V3, this.V4];
      sp.forEach(function(el, i) {
        el > 1.5 ? (obj["v" + i] = true) : (obj["v" + i] = false);
      });
      return obj;
    },
    no_teploob() {
      let a = false;
      this.isx_co.qco && this.isx.qmax ? (a = false) : (a = true);
      return a;
    },
    no_mod3() {
      let a = false;
      (this.du.di3 > 80 || this.du.di3 < 32) && this.check.tipLg3 === "ml"
        ? (a = true)
        : (a = false);
      return a;
    },
    no_mod4() {
      let a = false;
      (this.du.di4 > 80 || this.du.di4 < 32) && this.check.tipLg4 === "ml"
        ? (a = true)
        : (a = false);
      return a;
    },
    no_i63() {
      let a = false;
      (this.du.di3 > 80 || this.du.di3 < 25) &&
      this.du.di3 &&
      this.check.tipIMg3 === 6
        ? (a = true)
        : (a = false);
      return a;
    },
    no_i64() {
      let a = false;
      (this.du.di4 > 80 || this.du.di4 < 25) &&
      this.du.di4 &&
      this.check.tipIMg4 === 6
        ? (a = true)
        : (a = false);
      return a;
    },
    yellow_im4() {
      let a;
      this.check.tipIMg4 != this.check.tipIMg3 ? (a = true) : (a = false);
      this.no_i64 ? (a = false) : "";
      return a;
    },
    yellow_IL4() {
      let a;
      this.check.tipLg4 != this.check.tipLg3 ? (a = true) : (a = false);
      this.no_mod4 ? (a = false) : "";
      return a;
    },
    diap_IM4() {
      let pos = DUIM.map(function(el) {
        return el.val;
      }).indexOf(this.du.di3);
      let diap = DUIM.slice(0, pos + 1);
      return diap;
    },
    no_filter() {
      let a = false;
      this.check.tipLg3 === "ml" || this.check.tipLg4 === "ml"
        ? (a = true)
        : (a = false);
      return a;
    }
  },
  watch: {
    sx: {
      handler() {
        // if (this.isx.qmax > 0) {
        this.sx.sx_gvs_dep > 0
          ? ((this.isx.t3 = 70), (this.isx.t4 = 40))
          : ((this.isx.t3 = 60), (this.isx.t4 = 50));

        this.sx.sx_gvs_dep > 0 || this.sx.sx_otkr > 1
          ? (this.dis_dep = false)
          : (this.dis_dep = true);

        if (this.isx.qmax > 0) {
          this.$store.dispatch({
            type: "ISX_GVS",
            isx: this.isx,
            du: this.du,
            flow: this.flow
          });
        }
        if (this.isx_co.qco > 0) {
          this.$store.dispatch({
            type: "ISX_CO",
            isx: this.isx_co,
            du: {},
            flow: {}
          });
        }
        this.$store.dispatch("SX", this.sx);
        this.$store.dispatch("GEN_UU", this.sx);
        // }
      },
      deep: true
    },
    check: {
      handler() {
        // if (this.isx.qmax > 0) {
        this.$store.dispatch("CHECK_GVS", this.check);
        // }
      },
      deep: true
    },
    isx: {
      handler() {
        if (this.isx.qmax > 0) {
          this.check.sx_gvs = 0;
          this.$store.dispatch({
            type: "ISX_GVS",
            isx: this.isx,
            du: this.du,
            flow: this.flow
          });

          if (this.sx.sx_gvs_dep > 0 || this.sx.sx_otkr > 0) {
            this.$store.dispatch({
              type: "ISX_CO",
              isx: this.isx_co,
              du: {},
              flow: {}
            });
          }
        } else {
          if (this.isx_co.qco > 0) {
            this.$store.dispatch({
              type: "ISX_CO",
              isx: this.isx_co,
              du: {},
              flow: {}
            });
          }
          // this.$store.dispatch("null_GVS");
          this.sx.sx_otkr = 0;
          this.sx.sx_gvs_dep = 0;
          // this.check.sx_gvs = 0;
          // this.IM(3);
          this.IL(3);
        }
        this.$store.dispatch("SX", this.sx);
        this.$store.dispatch("GEN_UU", this.gen);
      },
      deep: true
    },
    du: {
      handler() {
        if (this.du.di3 == 0) {
          this.IL(3);
          this.$store.dispatch("null_GVS");
        } else if (this.du.di3 && this.du.di3 > 0) {
          this.V3 = myFns.speed(this.flow.G3v, this.du.di3);

          this.diap_t3 = myFns.diap_tr(this.du.di3);
          this.diap_t3.find(x => x.val === this.du.dut3)
            ? ""
            : (this.du.dut3 = this.diap_t3[1].val);

          if (this.du.di4 > 0) {
            this.V4 = myFns.speed(this.flow.G4v, this.du.di4);
            this.diap_t4 = myFns.diap_tr(this.du.di4);
            this.diap_t4.find(x => x.val === this.du.dut4)
              ? ""
              : (this.du.dut4 = this.diap_t4[1].val);
          }

          // if (this.isx.qmax > 0) {
          if (this.du.di4 > 0) {
            this.check.sx_gvs = 0;
            // this.IL(3);
          } else {
            this.check.sx_gvs = 1;
            // this.IL(3);
          }
          // }
          // this.dis_pep ? (this.tup_gvs = true) : "";
          this.$store.dispatch("DU_GVS", this.du);
        }
      },
      deep: true
    },
    flow: {
      handler() {
        if (this.flow.G3v > 0 && !this.isx.qmax > 0) {
          this.$store.dispatch({
            type: "ISX_GVS",
            isx: this.isx,
            du: this.du,
            flow: this.flow
          });
          // this.V3 = myFns.speed(this.flow.G3v, this.du.di3);
          // this.flow.G4v > 0 && this.check.sx_gvs != 1
          //   ? (this.V4 = myFns.speed(this.flow.G4v, this.du.di4))
          //   : (this.V4 = "");
        } else if (!this.flow.G3v > 0) {
          this.flow.G4v = "";
          this.V3 = "";
          this.V4 = "";
        }
      },
      deep: true
    }
  },
  methods: {
    qgvs(m) {
      switch (m) {
        case "qm":
        case "kc":
          this.isx.qmax > 100
            ? (this.isx.qmax = this.isx.qmax / 1000)
            : this.isx.qmax;
          this.isx.qmax > 0
            ? (this.isx.qgvssr = (this.isx.qmax / this.isx.Kchn).toFixed(6))
            : (this.isx.qgvssr = "");
          break;
        case "qs":
          this.isx.qgvssr > 100
            ? (this.isx.qgvssr = this.isx.qgvssr / 1000)
            : this.isx.qgvssr;
          this.isx.qgvssr > 0
            ? (this.isx.qmax = (this.isx.qgvssr * this.isx.Kchn).toFixed(6))
            : (this.isx.qmax = "");
          break;
      }
    },
    IM(m) {
      switch (m) {
        case 3:
          this.check.tipIMg3 = this.IM3;
          this.check.tipIMg4 = this.IM3;
          this.IM4 = this.IM3;
          break;
        case 4:
          this.check.tipIMg4 = this.IM4;
          break;
      }
    },
    IL(m) {
      switch (m) {
        case 3:
          this.check.tipLg3 = this.L3;
          this.check.tipLg4 = this.L3;
          this.L4 = this.L3;
          break;
        case 4:
          this.check.tipLg4 = this.L4;
          break;
      }
    },
    rash() {
      this.isx.qmax = "";
    }
  }
};
</script>

<style scoped>
.inputD {
  font-size: 0.95em;
  font-weight: bold;
}
.inputD >>> .v-label {
  font-size: 11pt;
  font-weight: normal;
}
.inputD >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputD >>> input::-webkit-outer-spin-button,
.inputD >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.err >>> .v-input input {
  color: #dd0808;
}
.err >>> .v-input__icon {
  color: #dd0808;
}
.errs >>> .v-select__selection {
  color: #dd0808;
}
.errs >>> .v-icon {
  color: #dd0808;
}
.errs_y >>> .v-select__selection {
  color: #ff9901;
}
/* .errs_ >>> .v-icon {
  color: #dd0808;
} */
</style>
   