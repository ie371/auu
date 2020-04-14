<template>
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <div>
          <strong class="success--text">Насос</strong>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <v-switch
            class="mt-0"
            v-model="pumps.perem"
            label="Насос на перемычке"
            color="indigo"
            hide-details
          ></v-switch>
        </v-col>

        <v-col cols="4">
          <v-switch
            class="mt-0"
            v-model="pumps.double"
            label="сдвоенный"
            color="indigo"
            hide-details
          ></v-switch>
        </v-col>

        <v-col cols="4">
          <v-switch
            class="mt-0"
            v-model="pumps.two_pumps"
            :disabled="double_dis"
            label="2 насоса"
            color="indigo"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="Расход"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="pumps.G"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="7"
            @change="change_pump"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="Напор"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="pumps.h"
            @change="change_pump"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="мощность, кВт"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="pumps.w"
            @change="change_pump"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="Сопрот., мвст"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="pumps.resis"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="коэфф."
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="pumps.kf"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="pump"
            label="Производ"
            class="inputD"
            v-model="pumps.firms"
            @change="change_pump"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="DU"
            label="Ду"
            class="inputD"
            v-model="pumps.du"
            @change="change_pump"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-switch
            class="mt-0"
            v-model="pumps.taps"
            label="Обвязка кранами"
            color="deep-orange "
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="9">
          <v-text-field
            dense
            filled
            outlined
            label="Наименование"
            class="inputD"
            type="text"
            hide-details
            valid
            clearable
            v-model="pumps.naim"
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            dense
            filled
            outlined
            label="обозн"
            class="inputD"
            type="text"
            hide-details
            valid
            v-model="pumps.obozn"
            @change="change_pump"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
  </v-flex>
</template>
<script>
import { mapState } from "vuex";
import DU from "@/utils/du";
import * as myFns from "@/utils/Function.js";
export default {
  data() {
    return {
      DU,
      pump: ["Grundfos", "DAB", "WILO"],
      double_dis: false
      //   n_pumps: true
    };
  },

  computed: {
    ...mapState({
      isx: state => state.isx,
      check: state => state.check,
      pumps: state => state.pumps
    })
  },
  watch: {
    isx: {
      handler() {
        this.pumps.G = myFns.G_pump(
          this.check.G1,
          this.pumps.kf,
          this.check.u,
          this.pumps.perem
        );
        this.$store.dispatch("PUMPS", this.pumps);
      },
      deep: true
    },

    pumps: {
      handler() {
        this.pumps.double
          ? ((this.n_pumps = false),
            ((this.double_dis = true), (this.pumps.two_pumps = false)))
          : (this.double_dis = false);

        this.pumps.G = myFns.G_pump(
          this.check.G1,
          this.pumps.kf,
          this.check.u,
          this.pumps.perem
        );

        this.$store.dispatch("PUMPS", this.pumps);
        this.$store.dispatch("STAND");
      },
      deep: true
    }
  },
  methods: {
    change_pump() {
      let x;
      let n = "Насос ";
      this.pumps.perem ? (x = "смесительный ") : (x = "циркуляционный ");
      let f = this.pumps.firms;
      let d = this.pumps.du;
      let g = this.pumps.G;
      let h = this.pumps.h;
      let w = this.pumps.w;
      this.pumps.naim =
        n +
        x +
        f +
        ", Ду" +
        d +
        ", G=" +
        g +
        " м³/ч , H= " +
        h +
        " м.в.ст., P= " +
        w +
        " кВт";
    }
  }
};
</script>

<style scoped>
.inputD {
  /* padding: 0;
  transform: scale(0.875);
  transform-origin: left; */
  font-size: 0.95em;
  font-weight: bold;
}

.inputD >>> .v-label {
  font-size: 11pt;
  color: rgb(16, 60, 182);
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
