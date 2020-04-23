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
          color="deep-orange"
          hide-details
        ></v-switch>
      </v-layout>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="12">
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
          color="deep-orange"
          hide-details
        ></v-switch>
      </v-layout>
    </v-list-item>

    <v-list-item dense class="mt-3">
      <v-row align="center" justify="space-between" dense>
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
            label="СБ => ИМ ЦО"
            class="inputD"
            type="number"
            hide-details
            v-model="atm.lsbo"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            dense
            label="СБ => ИМ ГВС"
            class="inputD"
            type="number"
            hide-details
            v-model="atm.lsbg"
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
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            v-model="atm.teploiz_ot"
            :items="teploiz"
            item-text="text"
            item-value="val"
            label="Теплоизол. ЦО"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            v-model="atm.teploiz_gvs"
            :items="teploiz"
            item-text="text"
            item-value="val"
            label="Теплоизол. ГВС"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <div>
        <strong class="blue--text">Климатология</strong>
      </div>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            :items="Regions"
            item-text="text"
            item-value="val"
            label="Республика, край, область:"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            class="inputD"
            item-text="text"
            item-value="val"
            label="Населенный пункт:"
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
            name="princ_sx_uploads"
            accept="image/*"
            multiple
            label="Принципиальная схема"
          ></v-file-input>
        </v-col>

        <v-col cols="4">
          <v-select
            dense
            class="inputD"
            item-text="text"
            item-value="val"
            label="Формат:"
            name="formatPRSX"
            :items="format"
            hide-details
          ></v-select>
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
            name="sitplan_uploads"
            accept="image/*"
            multiple
            label="Принципиальная схема"
          ></v-file-input>
        </v-col>

        <v-col cols="4">
          <v-select
            dense
            class="inputD"
            item-text="text"
            item-value="val"
            label="Формат:"
            name="formatSitPl"
            :items="format"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>
  </v-row>
</template>
 <script>
import { mapState } from "vuex";
import Regions from "@/utils/regions";
export default {
  data() {
    return {
      Regions,
      items_sb: [
        { text: "СБ-04 с блоком бесперебойного питания", val: 0 },
        { text: "СБ-04 с сетевым питанием", val: 1 }
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
        { text: "Energoflex", val: 0 },
        { text: "K-flex", val: 1 },
        { text: "Цилиндры кашированные, 40мм", val: 2 }
      ],
      format: [
        { text: "А3", val: "A3" },
        { text: "А2", val: "A2" }
      ]
    };
  },

  computed: {
    ...mapState({
      gen: state => state.Uu.gen,
      atm: state => state.Uu.atm
      // check: state => state.Uu.check
    })
  },
  watch: {
    // check: {
    //   handler() {
    //     this.$store.dispatch("CHECK_UU", this.check);
    //   },
    //   deep: true
    // },
    // gen: {
    //   handler() {
    //     this.$store.dispatch("GEN_UU", this.gen);
    //   },
    //   deep: true
    // },
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
   