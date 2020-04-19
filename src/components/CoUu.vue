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
            v-model="check.sx_otkr"
            :items="sx_ts"
            item-text="text"
            item-value="val"
            label="Схема теплоснабжения"
            hide-details
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
            type="number"
            hide-details
            v-model.number="isx.qco"
            step="0.1"
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
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="number" hide-details disabled></v-text-field>
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
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.di1"></v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.di2" readonly></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Скорость////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Скорость, м/с</span>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="number" hide-details disabled></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="number" hide-details disabled></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Тип ИМ////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Тип ИМ</span>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="tip_im" v-model.number="check.tipIMo"></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model.number="check.tipIMo"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- //////////////////////Ду трубопроводов////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Ду трубопроводов</span>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.dut1"></v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.dut2"></v-select>
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
            v-model="check.tipLo"
            :items="tip_lin"
            item-text="text"
            item-value="val"
            label="Тип изм. линии"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            v-model="check.filo"
            :items="tip_filtr"
            item-text="text"
            item-value="val"
            label="Фильтр"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
    <!-- /////////////////////ПОДПИТКА switch/////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-layout align-center justify-center>
          <v-switch
            dense
            class="inputD mt-0"
            v-model.number="check.sx_ot"
            label="Подпитка"
            color="deep-orange"
            hide-details
          ></v-switch>
        </v-layout>

        <v-col cols="6">
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
    <!-- //////////////ПОДПИТКА////////////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="2">
          <v-text-field
            dense
            label="Расход, м³/ч"
            class="inputD"
            type="number"
            hide-details
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select dense label="Ду ИМ" class="inputD" hide-details :items="DU" v-model="du.di9"></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            label="Скорость, м/с"
            class="inputD"
            type="number"
            hide-details
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-select dense label="Ду Т94" class="inputD" hide-details :items="DU" v-model="du.dut9"></v-select>
        </v-col>

        <v-col cols="2">
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
import * as myFns from "@/utils/Function.js";
export default {
  data() {
    return {
      DU,
      sx_ts: [
        { text: "закрытая", val: 0 },
        { text: "открытая с ИМ на ГВС", val: 1 },
        { text: "открытая без ИМ на ГВСЦ", val: 2 },
        { text: "открытая без ИМ на ГВСТ", val: 3 }
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
      ]
    };
  },

  computed: {
    ...mapState({
      isx: state => state.Uu.isx,
      check: state => state.Uu.check,
      du: state => state.Uu.du
    })
  },
  watch: {
    isx: {
      handler() {
        this.isx.qco > 100
          ? (this.isx.qco = this.isx.qco / 1000)
          : this.isx.qco / 1;

        // this.check.sx_gvs = 0;
        // this.isx.qmax > 100
        //   ? (this.isx.qmax = this.isx.qmax / 1000)
        //   : this.isx.qmax;

        // this.isx.qmax > 0
        //   ? (this.isx.qgvssr = (this.isx.qmax / this.isx.Kchn).toFixed(6))
        //   : ((this.isx.qgvssr = ""),
        //     (this.check.tipLg4 = this.check.tipLg3),
        //     (this.check.tipIMg4 = this.check.tipIMg3),
        //     (this.check.revers = 0),
        //     (this.check.fuCo = 0),
        //     (this.check.sx_gvs_dep = 0));

        // this.isx.qgvssr > 100
        //   ? (this.isx.qgvssr = this.isx.qgvssr / 1000)
        //   : this.isx.qgvssr;

        // if (this.isx.qco > 0 && this.isx.qmax > 0) {
        //   this.check.tipuu = "og";
        // } else if (this.isx.qco > 0) {
        //   this.check.tipuu = "o";
        // } else if (this.isx.qmax > 0) {
        //   this.check.tipuu = "g";
        // } else {
        //   this.check.tipuu = "";
        // }

        // this.check.G1 = myFns.rash(
        //   this.isx.Qco,
        //   this.isx.t1,
        //   this.isx.t2,
        //   this.isx.p1
        // );
        this.$store.dispatch("ISX_UU", this.isx);
        this.$store.dispatch("CHECK_UU", this.check);
      },
      deep: true
    },
    atm: {
      handler() {
        this.$store.dispatch("ATM", this.atm);
      },
      deep: true
    }
  },
  methods: {}
};
</script>

<style scoped>
.inputD {
  font-size: 0.95em;
  font-weight: bold;
}

.inputD >>> .v-label {
  font-size: 11pt;
  /* color: rgb(16, 60, 182); */
  font-weight: normal;
  /* opacity: 0.5; */
}
.inputD >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputD >>> input::-webkit-outer-spin-button,
.inputD >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
   