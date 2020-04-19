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
            v-model="check.sx_gvs_dep"
            :items="sx_ts"
            item-text="text"
            item-value="val"
            label="Схема теплоснабжения"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <!-- 2 строка\\\\\\\\\\\\\\\\\\\\\\\ -->

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

    <!-- 3 строка\\\\\\\\\\\\\\\\\\\\\\\ -->

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
            v-model="isx.qmax"
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
            v-model="isx.qgvssr"
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
            v-model="isx.t3"
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
            v-model="isx.t4"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

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
            v-model="isx.p3"
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
            v-model="isx.p4"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

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
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            disabled
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Ду прибора</span>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.di3"></v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.di4"></v-select>
        </v-col>
      </v-row>
    </v-list-item>

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

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Тип ИМ</span>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="tip_im" v-model="check.tipIMg3"></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            class="inputD"
            type="number"
            hide-details
            v-model="check.tipIMg4"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Ду трубопроводов</span>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.dut3"></v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense class="inputD" hide-details :items="DU" v-model="du.dut4"></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="6">
          <span class="caption py-3">Отметки</span>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_T3"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field dense class="inputD" type="text" v-model="check.otmetka_T4"></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <!-- //////////////////////////////////////////////////////// -->
    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            v-model="check.tipLg3"
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
            v-model="check.filg"
            :items="tip_filtr"
            item-text="text"
            item-value="val"
            label="Фильтр"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-layout align-center justify-center>
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
import DU from "@/utils/du";
export default {
  data() {
    return {
      DU,
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
        this.$store.dispatch("ISX_UU", this.isx);
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
   