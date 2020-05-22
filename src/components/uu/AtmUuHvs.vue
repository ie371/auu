<template>
  <v-row no-gutters>
    <v-list-item dense>
      <div>
        <strong class="blue--text">Основное оборудование</strong>
      </div>
      <v-layout align-center justify-center>
        <v-switch
          dense
          class="inputD mt-0"
          v-model.number="gen.IL"
          label="Измерительные линии"
          hide-details
        ></v-switch>
      </v-layout>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="8">
          <v-select
            dense
            class="inputD"
            v-model="atm.tipSB"
            :items="items_sb"
            item-text="text"
            item-value="val"
            label="Системный блок"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            dense
            label="шифр"
            class="inputD"
            hide-details
            v-model="atm.shifr_to"
            :disabled="sb_to"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-select
            dense
            class="inputD"
            v-model="atm.pltr"
            :items="items_pltr"
            item-text="text"
            item-value="val"
            label="Платы расширения"
            multiple
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <div>
        <strong class="blue--text">Кабельные проводки</strong>
      </div>
      <v-layout align-center justify-center>
        <v-switch
          dense
          class="inputD mt-0"
          v-model.number="atm.met_ruk"
          label="Металлорукав"
          hide-details
        ></v-switch>
      </v-layout>
    </v-list-item>

    <v-list-item dense class="mt-3">
      <v-row align="center" dense>
        <v-col cols="4">
          <v-text-field
            dense
            label="ВРУ => СБ"
            class="inputD"
            type="number"
            hide-details
            v-model.number="atm.lvru"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            dense
            label="СБ => ИМ ХВС"
            class="inputD"
            type="number"
            hide-details
            v-model="atm.lsbo"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <div>
        <strong class="blue--text">Теплоизоляция</strong>
      </div>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center">
        <v-col cols="8">
          <v-select
            dense
            class="inputD"
            v-model="atm.teploiz_hvs"
            :items="teploiz"
            item-text="text"
            item-value="val"
            label="Теплоизоляция"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <div>
        <strong class="blue--text">Вставка файлов</strong>
      </div>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="princ_sx_uploads_hvs"
            accept="image/*"
            multiple
            prepend-icon="mdi-swap-horizontal"
            label="Принципиальная схема"
            v-model="ps"
          ></v-file-input>
        </v-col>

        <v-col cols="4">
          <v-switch
            dense
            class="inputD mt-0"
            v-model.number="atm.psA2"
            label="A2"
            hide-details
            :disabled="no_ps"
          ></v-switch>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="sitplan_uploads_hvs"
            accept="image/*"
            multiple
            prepend-icon="mdi-mapbox"
            label="Ситуационный план"
            v-model="pl"
          ></v-file-input>
        </v-col>

        <v-col cols="4">
          <v-switch
            dense
            class="inputD mt-0"
            v-model.number="atm.plA2"
            label="A2"
            hide-details
            :disabled="no_pl"
          ></v-switch>
        </v-col>
      </v-row>
    </v-list-item>
  </v-row>
</template>
 <script>
import Axios from "axios";
import { mapState } from "vuex";
import Regions from "@/utils/regions";
export default {
  data() {
    return {
      Regions,
      items_sb: [
        { text: "СБ-04 с блоком бесперебойного питания", val: 0 },
        { text: "СБ-04 с сетевым питанием", val: 1 },
        { text: "СБ-04 из проекта ТС", val: 2 }
      ],
      items_pltr: [
        { text: "GSM-модем", val: "gsm" },
        { text: "USBA", val: "usba" },
        { text: "Ethernet ПРС-802", val: "prs802" },
        { text: "RS485E", val: "rs485" },
        { text: "УПП", val: "upp" },
        { text: "ДТА", val: "dta" }
      ],
      teploiz: [
        { text: "нет", val: 0 },
        { text: "Energoflex", val: 1 },
        { text: "K-flex", val: 2 },
        { text: "Цилиндры кашированные, 40мм", val: 3 }
      ],
      pl: [],
      ps: [],
      no_pl: true,
      no_ps: true
    };
  },

  computed: {
    ...mapState({
      gen: state => state.UuHvs.gen,
      atm: state => state.UuHvs.atm
    }),
    sb_to() {
      let a = true;
      this.atm.tipSB != 2 ? (a = true) : (a = false);
      return a;
    }
  },
  watch: {
    atm: {
      handler() {
        this.atm.tipSB != 2 ? (this.atm.shifr_to = "") : "";
        this.$store.dispatch("ATM_HVS", this.atm);
      },
      deep: true
    },
    pl(val) {
      val.length === 0
        ? ((this.atm.plA2 = false), (this.no_pl = true))
        : (this.no_pl = false);
    },
    ps(val) {
      val.length === 0
        ? ((this.atm.psA2 = false), (this.no_ps = true))
        : (this.no_ps = false);
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
   