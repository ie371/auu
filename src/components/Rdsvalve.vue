<template>
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <div>
          <strong class="blue--text">Регулятор давления "до себя"</strong>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="2">
          <v-text-field
            dense
            label="dP расч"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="cl_D.dP"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="4"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Кv расч"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="cl_D.Kv"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Кvs"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="cl_D.Kvs"
            @change="change_clp"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="dP факт"
            class="inputD"
            type="number"
            hide-details
            valid
            readonly
            v-model.number="cl_D.dP_f"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-switch
            class="inputD mt-0"
            v-model="cl_D.balans"
            label="Баланс. клапан"
            color="deep-orange"
            hide-details
            @change="change_clp"
          ></v-switch>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <v-select
            dense
            hide-details
            :items="clap"
            label="Производ"
            class="inputD"
            v-model="cl_D.zavod"
            @change="change_clp"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Диапазон"
            class="inputD"
            type="text"
            hide-details
            valid
            v-model="cl_D.diap"
            @change="change_clp"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-select
            dense
            hide-details
            :items="DU"
            label="Ду"
            class="inputD"
            v-model.number="cl_D.du"
            @change="change_clp"
          ></v-select>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="9">
          <v-text-field
            dense
            label="Наименование"
            class="inputD"
            type="text"
            hide-details
            valid
            clearable
            v-model="cl_D.spec_name"
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            dense
            label="обозначение"
            class="inputD"
            type="text"
            hide-details
            valid
            v-model="cl_D.obozn"
            @change="change_clp"
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
      clap: ["Теплосила", "Danfoss", "Siemens", "Broen"]
    };
  },

  computed: {
    ...mapState({
      isx: state => state.Auu.isx,
      check: state => state.Auu.check,
      cl_D: state => state.Auu.cl_D
    })
  },
  watch: {
    isx: {
      handler() {
        this.cl_D.Kv = myFns.Kv(this.check.G1, this.cl_D.dP);
        this.$store.dispatch("CL_DOS", this.cl_D);
      },
      deep: true
    },
    cl_D: {
      handler() {
        this.cl_D.Kv = myFns.Kv(this.check.G1, this.cl_D.dP);

        this.cl_D.Kvs
          ? (this.cl_D.dP_f = myFns.dP_fact(this.check.G1, this.cl_D.Kvs))
          : (this.cl_D.dP_f = "");

        this.cl_D.enable ? (this.cl_D.kolvo = 1) : (this.cl_D.kolvo = 0);
        this.$store.dispatch("CL_DOS", this.cl_D);
      },
      deep: true
    }
  },
  methods: {
    change_clp() {
      let n;
      let x;
      this.cl_D.balans
        ? ((n = "Клапан балансировочный "), (x = ""))
        : ((n = "Регулятор давления 'до себя' "),
          (x = ", диапазон настройки " + this.cl_D.diap + " бар"));
      let f = this.cl_D.zavod;
      let d = this.cl_D.du;
      let k = this.cl_D.Kvs;
      this.cl_D.spec_name = n + f + ", Ду" + d + ", Kvs=" + k + " м³/ч" + x;
    }
  }
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
