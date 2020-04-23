<template>
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <div>
          <strong class="blue--text">Регулятор перепада давления</strong>
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
            v-model.number="cl_P.dP"
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
            v-model.number="cl_P.Kv"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Кvs"
            class="inputD"
            type="number"
            hide-details
            v-model.number="cl_P.Kvs"
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
            readonly
            v-model.number="cl_P.dP_f"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <v-select
            dense
            hide-details
            :items="clap_P"
            label="Производ"
            class="inputD"
            v-model="cl_P.zavod"
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
            v-model="cl_P.diap"
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
            v-model.number="cl_P.du"
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
            clearable
            v-model="cl_P.spec_name"
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            dense
            label="обозначение"
            class="inputD"
            type="text"
            hide-details
            v-model="cl_P.obozn"
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
import * as myFns from "@/utils/FuncAuu.js";
export default {
  data() {
    return {
      DU,
      clap_P: ["Теплосила", "Danfoss", "Siemens", "Broen"]
    };
  },

  computed: {
    ...mapState({
      isx: state => state.Auu.isx,
      check: state => state.Auu.check,
      cl_P: state => state.Auu.cl_P
    })
  },
  watch: {
    isx: {
      handler() {
        this.cl_P.Kv = myFns.Kv(this.check.G1, this.cl_P.dP);
        this.$store.dispatch("CL_PER", this.cl_P);
      },
      deep: true
    },

    cl_P: {
      handler() {
        this.cl_P.Kv = +myFns.Kv(this.check.G1, this.cl_P.dP);

        this.cl_P.Kvs
          ? (this.cl_P.dP_f = myFns.dP_fact(this.check.G1, this.cl_P.Kvs))
          : (this.cl_P.dP_f = "");

        this.cl_P.enable ? (this.cl_P.kolvo = 1) : (this.cl_P.kolvo = 0);
        this.$store.dispatch("CL_PER", this.cl_P);
      },
      deep: true
    }
  },
  methods: {
    change_clp() {
      let n = "Регулятор перепада давления ";
      let diap = this.cl_P.diap;
      let f = this.cl_P.zavod;
      let d = this.cl_P.du;
      let k = this.cl_P.Kvs;
      this.cl_P.spec_name =
        n +
        f +
        ", Ду" +
        d +
        ", Kvs=" +
        k +
        " м³/ч, диапазон настройки " +
        diap +
        " бар";
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
