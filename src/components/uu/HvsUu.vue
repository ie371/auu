<template>
  <v-row no-gutters>
    <v-list-item dense>
      <div>
        <strong class="blue--text">Система холодного водоснабжения</strong>
      </div>
    </v-list-item>
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="4">
          <v-text-field
            dense
            label="Расход часовой, м³/ч"
            class="inputD"
            hide-details
            v-model.number="isx.qt"
            v-on:input="qhvs('qt')"
            step="0.0000001"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            dense
            label="Расход суточный, м³/сут"
            class="inputD"
            hide-details
            v-model.number="isx.Qsut"
            v-on:input="qhvs('Qsut')"
            step="0.0000001"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            dense
            label="Период, ч"
            class="inputD"
            hide-details
            v-model.number="isx.Tper"
            v-on:input="qhvs('Tper')"
            step="0.0000001"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
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
            v-model="check.tipLh"
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
            v-model.number="check.filh"
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
    <!-- /////////////////////switch/////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-layout align-center justify-center>
            <v-switch
              dense
              class="inputD mt-0"
              v-model.number="check.sens_d"
              label="Датчик давления"
              hide-details
            ></v-switch>
          </v-layout>
        </v-col>

        <v-col cols="4">
          <v-layout align-center justify-center>
            <v-switch
              dense
              class="inputD mt-0"
              v-model.number="check.sens_t"
              label="Датчик температуры"
              hide-details
            ></v-switch>
          </v-layout>
        </v-col>

        <v-col cols="4">
          <v-layout align-center justify-center>
            <v-switch
              dense
              class="inputD mt-0"
              v-model.number="check.baypass"
              label="Байпас"
              hide-details
            ></v-switch>
          </v-layout>
        </v-col>

        <!-- <v-col cols="3">
          <v-layout align-center justify-center>
            <v-switch
              dense
              class="inputD mt-0"
              v-model.number="check"
              label="Теплоизоляция"
              hide-details
            ></v-switch>
          </v-layout>
        </v-col>-->
      </v-row>
    </v-list-item>
    <!-- //////////////////////Tемп график////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
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
      </v-row>
    </v-list-item>
    <!-- //////////////////////Давление////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
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
      </v-row>
    </v-list-item>
    <!-- //////////////////////Ду прибора////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
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
            v-model.number="du.di"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Скорость////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <span class="caption py-3">Скорость, м/с</span>
        </v-col>
        <v-col cols="3" :class="{'err' : check_speed }">
          <v-text-field dense class="inputD" hide-details type="number" v-model.number="V" disabled></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Тип ИМ////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <span class="caption py-3">Тип ИМ</span>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            :class="{'errs' : no_i6 }"
            hide-details
            :items="tip_im"
            item-text="text"
            item-value="val"
            v-model.number="check.tipIMh"
            :append-icon="no_i6 ? 'mdi-alert-rhombus-outline' : undefined"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Ду трубопроводов////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <span class="caption py-3">Ду трубопроводов</span>
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            class="inputD"
            hide-details
            :items="diap_b1"
            item-text="text"
            item-value="val"
            v-model.number="du.dut"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Отметки////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <span class="caption py-3">Отметки</span>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_B1"></v-text-field>
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
      V: "",
      DU,
      DUIM,
      diap_b1: [],
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
    };
  },
  computed: {
    ...mapState({
      gen: state => state.UuHvs.gen,
      isx: state => state.UuHvs.isx_hvs,
      check: state => state.UuHvs.check_hvs,
      du: state => state.UuHvs.du_hvs
    }),
    check_speed() {
      let a = false;
      this.V > 1.5 ? (a = true) : (a = false);
      return a;
    },
    no_mod() {
      let a = false;
      (this.du.di > 80 || this.du.di < 32) && this.check.tipLh === "ml"
        ? (a = true)
        : (a = false);
      return a;
    },
    no_i6() {
      let a = false;
      (this.du.di > 80 || this.du.di < 25) &&
      this.du.di &&
      this.check.tipIMh === 6
        ? (a = true)
        : (a = false);
      return a;
    },
    no_filter() {
      let a = false;
      this.check.tipLh === "ml" ? (a = true) : (a = false);
      return a;
    },
    no_grz() {
      let a = false;
      this.check.filh == 2 && this.du.dut < 33 ? (a = true) : (a = false);
      return a;
    },
    no_pr() {
      let a, b, c, d;
      let e = false;
      this.no_mod ? (a = 1) : (a = 0);
      this.no_i6 ? (b = 1) : (b = 0);
      this.no_grz ? (c = 1) : (c = 0);
      d = a + b + c;
      d > 0 ? (e = true) : (e = false);
      !this.isx.qt > 0 ? (e = true) : "";
      return e;
    }
  },
  watch: {
    no_pr(val) {
      this.$store.dispatch("PROJ_HVS", val);
    },
    check: {
      handler(val) {
        this.$store.dispatch("CHECK_HVS", val);
        this.$store.dispatch("GIDR_HVS");
      },
      deep: true
    },
    isx: {
      handler(val) {
        if (val.qt > 0) {
          this.$store.dispatch({
            type: "ISX_HVS",
            isx: val,
            du: this.du
          });
        }
        this.$store.dispatch("GEN_UU_HVS", this.gen);
        this.$store.dispatch("GIDR_HVS");
      },
      deep: true
    },
    du: {
      handler(val) {
        if (val.di != 0) {
          if (this.isx.qt > 0) {
            this.V = myFns.speed(this.isx.qt, val.di);
          }
          this.diap_b1 = myFns.diap_tr(val.di);
          this.diap_b1.find(x => x.val === val.dut)
            ? ""
            : (val.dut = this.diap_b1[1].val);
          this.$store.dispatch("DU_HVS", val);
          this.$store.dispatch("GIDR_HVS");
        }
      },
      deep: true
    }
  },
  methods: {
    qhvs(m) {
      switch (m) {
        case "qt":
        case "Tper":
          this.isx.qt > 0
            ? (this.isx.Qsut = (this.isx.qt * this.isx.Tper).toFixed(3))
            : (this.isx.Qsut = "");
          break;
        case "Qsut":
          this.isx.Qsut > 0 && this.isx.Tper > 0
            ? (this.isx.qt = (this.isx.Qsut / this.isx.Tper).toFixed(3))
            : (this.isx.qt = "");
          break;
        case "qhr":
          break;
        default:
          break;
      }
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
   