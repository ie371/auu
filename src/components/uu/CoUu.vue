<template>
  <v-row no-gutters>
    <v-list-item dense>
      <div>
        <strong class="red--text">Система отопления/теплоснабжения</strong>
      </div>
    </v-list-item>
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="12">
          <v-select
            dense
            class="inputD"
            v-model="sx.sx_otkr"
            :items="sx_ts"
            item-text="text"
            item-value="val"
            label="Схема теплоснабжения"
            hide-details
            :disabled="no_sx_otkr"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Формула учета////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="12">
          <v-select
            dense
            class="inputD"
            v-model="check.fuCo"
            :items="formula_u"
            item-text="text"
            item-value="val"
            label="Формула учета"
            hide-details
            :disabled="no_fuco"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Qco, Гкал/ч////////////////////////////////// -->
    <v-list-item>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            label="Qco, Гкал/ч"
            class="inputD"
            hide-details
            v-model.number="isx.qco"
            step="0.0000001"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
        <v-layout align-center justify-center>
          <strong class="red--text">Подача</strong>
        </v-layout>
        <v-layout align-center justify-center>
          <strong class="blue--text">Обратка</strong>
        </v-layout>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Tемп график////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Tемп график, °C</span>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="isx.t1"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="isx.t2"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Давление////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Давление, мвст</span>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="isx.p1"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="isx.p2"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Расход////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Расход, м³/ч</span>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="flow.G1s"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="6"
            v-on:input="rash()"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="flow.G2s"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Ду прибора////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
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
            v-model.number="du.di1"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" hide-details disabled v-model="du.di2"></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Скорость////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Скорость, м/с</span>
        </v-col>
        <v-col cols="3" :class="{'err' : check_speed.v0 }">
          <v-text-field
            dense
            class="inputD"
            hide-details
            type="number"
            v-model.number="V1"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="3" :class="{'err' : check_speed.v1 }">
          <v-text-field
            dense
            class="inputD"
            hide-details
            type="number"
            disabled
            v-model.number="V2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Тип ИМ////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Тип ИМ</span>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_i6 }"
            hide-details
            :items="tip_im"
            item-text="text"
            item-value="val"
            v-model.number="check.tipIMo"
            :append-icon="no_i6 ? 'mdi-alert-rhombus-outline' : undefined"
          ></v-select>
        </v-col>
        <!-- <v-col cols="3">
          <v-text-field dense class="inputD" type="text" hide-details v-model="tipi2" disabled></v-text-field>
        </v-col>-->
      </v-row>
    </v-list-item>
    <!-- //////////////////////Ду трубопроводов////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Ду трубопроводов</span>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="diap_t1"
            item-text="text"
            item-value="val"
            v-model.number="du.dut1"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="diap_t2"
            item-text="text"
            item-value="val"
            v-model.number="du.dut2"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Отметки////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Отметки</span>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_T1"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_T2"></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Тип изм. линии////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_mod }"
            v-model="check.tipLo"
            :items="tip_lin"
            item-text="text"
            item-value="val"
            label="Тип изм. линии"
            hide-details
            :append-icon="no_mod ? 'mdi-alert-rhombus-outline' : undefined"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_grz }"
            v-model.number="check.filo"
            :items="tip_filtr"
            item-text="text"
            item-value="val"
            label="Фильтр"
            hide-details
            :disabled="no_filter"
            :append-icon="no_grz ? 'mdi-alert-rhombus-outline' : undefined"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////ПОДПИТКА switch/////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-layout align-center justify-center>
            <v-switch
              dense
              class="inputD mt-0"
              v-model.number="check.sx_ot"
              label="Подпитка"
              hide-details
            ></v-switch>
          </v-layout>
        </v-col>
        <v-col cols="6">
          <v-layout align-center justify-center v-show="no_revers">
            <v-switch
              dense
              class="inputD mt-0"
              v-model.number="check.revers"
              label="Реверс на Т2"
              hide-details
            ></v-switch>
          </v-layout>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////ПОДПИТКА////////////////////////////////////////// -->
    <v-list-item dense v-show="check.sx_ot">
      <v-row align="center">
        <v-col cols="3">
          <v-text-field
            dense
            label="Расход, м³/ч"
            class="inputD"
            type="number"
            hide-details
            disabled
            v-model.number="flow.G9v"
          ></v-text-field>
        </v-col>

        <v-col cols="3" :class="{'err' : check_speed.v2 }">
          <v-text-field
            dense
            label="Скорость, м/с"
            class="inputD"
            type="number"
            hide-details
            disabled
            v-model.number="V9"
          ></v-text-field>
        </v-col>

        <v-col cols="6" v-show="check.sx_ot">
          <v-select
            dense
            class="inputD"
            v-model="check.filp"
            :items="tip_filtr"
            item-text="text"
            item-value="val"
            label="Фильтр подпитки"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item dense v-show="check.sx_ot">
      <v-row align="center">
        <v-col cols="4">
          <v-select
            dense
            label="Ду ИМ"
            class="inputD"
            hide-details
            :items="DUIM"
            item-text="text"
            item-value="val"
            v-model.number="du.di9"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            dense
            label="Ду Т94"
            class="inputD"
            hide-details
            item-text="text"
            item-value="val"
            :items="diap_t9"
            v-model.number="du.dut9"
          ></v-select>
        </v-col>

        <v-col cols="4">
          <v-text-field
            dense
            label="Отметка"
            class="inputD"
            type="text"
            hide-details
            v-model="check.otmetka_T9"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
  </v-row>
</template>
 <script>
import { mapState } from "vuex";
import DU from "@/utils/du";
import DUIM from "@/utils/du_im";
import * as myFns from "@/utils/FuncUu.js";
export default {
  data() {
    return {
      V1: "",
      V2: "",
      V9: "",
      DU,
      DUIM,
      diap_t1: [],
      diap_t2: [],
      diap_t9: [],
      di2_text: "",
      sx_ts: [
        { text: "закрытая", val: 0 },
        { text: "открытая с ИМ на ГВС", val: 1 },
        { text: "открытая без ИМ на ГВС с циркуляцией", val: 2 },
        { text: "открытая без ИМ на ГВС тупиковая", val: 3 }
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
      dis_filtr: false
      // no_pr: 1
    };
  },
  computed: {
    ...mapState({
      sx: state => state.Uu.sx,
      gen: state => state.Uu.gen,
      isx: state => state.Uu.isx_co,
      isx_gvs: state => state.Uu.isx_gvs,
      check: state => state.Uu.check_co,
      du: state => state.Uu.du_co,
      flow: state => state.Uu.flow_co
    }),
    check_speed() {
      let obj = {},
        sp = [this.V1, this.V2, this.V9];
      sp.forEach(function(el, i) {
        el > 1.5 ? (obj["v" + i] = true) : (obj["v" + i] = false);
      });
      return obj;
    },
    no_mod() {
      let a = false;
      (this.du.di1 > 80 || this.du.di1 < 32) && this.check.tipLo === "ml"
        ? (a = true)
        : (a = false);
      return a;
    },
    no_i6() {
      let a = false;
      (this.du.di1 > 80 || this.du.di1 < 25) &&
      this.du.di1 &&
      this.check.tipIMo === 6
        ? (a = true)
        : (a = false);
      return a;
    },
    no_sx_otkr() {
      let a = false;
      this.isx_gvs.qmax && this.isx.qco
        ? this.sx.sx_gvs_dep == 0
          ? (a = false)
          : (a = true)
        : (a = true);
      this.sx.sx_gvs_dep > 0 ? (a = true) : "";
      return a;
    },
    no_filter() {
      let a = false;
      this.check.tipLo === "ml" ? (a = true) : (a = false);
      return a;
    },
    no_grz() {
      let a = false;
      this.check.filo == 2 && this.du.dut1 < 33 ? (a = true) : (a = false);
      return a;
    },
    no_fuco() {
      let a = false;
      this.sx.sx_otkr > 0 ? (a = true) : (a = false);
      return a;
    },
    no_revers() {
      let a = true;
      this.sx.sx_otkr > 0 ? (a = true) : (a = false);
      return a;
    },
    no_pr() {
      let a, b, c;
      this.no_mod ? (a = 1) : (a = 0);
      this.no_i6 ? (b = 1) : (b = 0);
      this.no_grz ? (c = 1) : (c = 0);
      return a + b + c;
    }
  },
  watch: {
    no_pr(val) {
      this.$store.dispatch({ type: "NP", ot: val });
    },
    sx: {
      handler(val) {
        val.sx_otkr > 0
          ? (this.check.fuCo = 1)
          : ((this.check.fuCo = 0), (this.check.revers = 0));
      },
      deep: true
    },
    check: {
      handler(val) {
        this.$store.dispatch("CHECK_CO", val);
        this.$store.dispatch("GIDR");
      },
      deep: true
    },
    isx: {
      handler(val) {
        if (val.qco > 0) {
          this.$store.dispatch({
            type: "ISX_CO",
            isx: val,
            du: this.du,
            flow: this.flow
          });
        }
        this.sx.sx_otkr = 0;
        this.sx.sx_gvs_dep = 0;
        this.check.sx_gvs = 0;
        this.$store.dispatch("SX", this.sx);
        this.$store.dispatch("GEN_UU", this.gen);
        this.$store.dispatch("GIDR");
      },
      deep: true
    },
    du: {
      handler(val) {
        if (val.di1 == 0) {
          this.$store.dispatch("null_CO");
        } else if (val.di1) {
          val.di2 = val.di1;
          if (this.flow.G1v > 0) {
            this.V1 = myFns.speed(this.flow.G1v, val.di1);
            this.V2 = myFns.speed(this.flow.G2v, val.di2);
            this.V9 = myFns.speed(this.flow.G9v, val.di9);
          } else {
            val.di9 ? "" : (val.di9 = val.di1);
          }
          this.diap_t1 = myFns.diap_tr(val.di1);
          this.diap_t2 = this.diap_t1;
          this.diap_t1.find(x => x.val === val.dut1)
            ? ""
            : ((val.dut1 = this.diap_t1[1].val),
              (this.diap_t2 = this.diap_t1),
              (val.dut2 = this.diap_t1[1].val));
          this.diap_t9 = myFns.diap_tr(val.di9);
          this.diap_t9.find(x => x.val === val.dut9)
            ? val.dut9
            : (val.dut9 = this.diap_t9[1].val);
          this.$store.dispatch("DU_CO", val);
          this.$store.dispatch("GIDR");
        }
      },
      deep: true
    },
    flow: {
      handler(val) {
        if (val.G1s > 0 && !this.isx.qco > 0) {
          this.$store.dispatch({
            type: "ISX_CO",
            isx: this.isx,
            du: this.du,
            flow: val
          });
        } else if (!val.G1s > 0) {
          this.V1 = "";
          this.V2 = "";
          this.V9 = "";
        }
      },
      deep: true
    }
  },
  methods: {
    rash() {
      this.isx.qco = "";
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
</style>
   