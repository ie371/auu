<template>
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <div>
          <strong class="success--text">Исходные данные</strong>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="12">
          <v-text-field
            dense
            filled
            outlined
            label="Qco, Гкал/ч"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.Qco"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            outlined
            label="Этажей"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.floor"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="2"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            outlined
            label="сопр, мвст"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="check.resis"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="8"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="t1, C"
            outlined
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.t1"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="t2, C"
            outlined
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.t2"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="t11, C"
            outlined
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.t11"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="t21, C"
            outlined
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.t21"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="5"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="p1, мвст"
            outlined
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.p1"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="p2, мвст"
            outlined
            class="inputD"
            type="number"
            hide-details
            valid
            v-model="isx.p2"
            step="1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item dense>
      <v-list-item-content>
        <div>
          <strong class="success--text">Расчетные данные</strong>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="G1, т/ч"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.G1"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="G2, т/ч"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.G2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="G3, т/ч"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.G3"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="u"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.u"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="DU"
            label="ДуТ1"
            class="inputD"
            v-model="check.duT1"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="DU"
            label="ДуТ11"
            class="inputD"
            v-model="check.duT11"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="V1, м/c"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.v1"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="V2, м/c"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.v2"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="5">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="DU"
            label="ДуТ3"
            class="inputD"
            v-model="check.duT3"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-text-field
            dense
            filled
            label="V3, м/c"
            outlined
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model="check.v3"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>
  </v-flex>
  <!-- </v-card> -->
</template>
<script>
import { mapState } from "vuex";
import DU from "@/utils/du";
import * as myFns from "@/utils/Function.js";
export default {
  data() {
    return {
      DU
    };
  },

  computed: {
    ...mapState({
      isx: state => state.isx,
      check: state => state.check
    })
  },
  watch: {
    isx: {
      handler() {
        this.isx.Qco > 100
          ? (this.isx.Qco = this.isx.Qco / 1000)
          : this.isx.Qco / 1;
        this.check.G1 = myFns.rash(
          this.isx.Qco,
          this.isx.t1,
          this.isx.t2,
          this.isx.p1
        );
        this.check.G2 = myFns.rash(
          this.isx.Qco,
          this.isx.t11,
          this.isx.t21,
          this.isx.p1
        );
        this.check.G3 = +(this.check.G2 - this.check.G1).toFixed(3);
        this.check.u =
          (this.isx.t1 - this.isx.t11) / (this.isx.t11 - this.isx.t2);

        this.check.duT1 = myFns.dutr(
          this.check.G1,
          this.isx.t1,
          this.isx.p1,
          1.5
        );
        this.check.duT11 = myFns.dutr(
          this.check.G2,
          this.isx.t11,
          this.isx.p1,
          1.5
        );

        this.isx.t1 > 105
          ? (this.check.duT3 = this.check.duT11)
          : (this.check.duT3 = this.check.duT1);

        this.check.resis = (this.isx.floor * 3 + 12) / 10;
        this.check.resis < 5 ? (this.check.resis = 5) : this.check.resis;
        this.$store.dispatch("ISX", this.isx);
      },

      deep: true
    },
    check: {
      handler() {
        this.check.v1 = myFns.speed(this.check.G1, this.check.duT1);
        this.check.v2 = myFns.speed(this.check.G2, this.check.duT11);
        this.check.v3 = myFns.speed(this.check.G3, this.check.duT3);
        this.$store.dispatch("CHECK", this.check);
      },

      deep: true
    }
  },
  methods: {}
};
</script>

<style scoped>
.inputD {
  /* padding: 0; */
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
