<template>
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <div>
          <strong class="blue--text">Клапан регулирующий</strong>
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
            v-model.number="cl_R.dP"
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
            v-model.number="cl_R.Kv"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            label="Кvs"
            class="inputD"
            type="number"
            hide-details
            v-model.number="cl_R.Kvs"
            @change="change_clp"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            flat
            label="dP факт"
            class="inputD"
            type="number"
            hide-details
            readonly
            v-model.number="cl_R.dP_f"
          ></v-text-field>
        </v-col>

        <v-layout align-center justify-center>
          <v-switch
            class="inputD mt-0"
            v-model="check.filter_t1"
            label="Фильтр"
            color="deep-orange "
            hide-details
          ></v-switch>
        </v-layout>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="4">
          <v-select
            dense
            hide-details
            :items="clap_R"
            label="Производ"
            class="inputD"
            v-model="cl_R.zavod"
            @change="change_clp"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            dense
            hide-details
            :items="tip_cl"
            label="Тип"
            class="inputD"
            v-model="cl_R.tip"
            @change="change_clp"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            dense
            hide-details
            :items="DU"
            label="Ду"
            class="inputD"
            v-model.number="cl_R.du"
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
            v-model="cl_R.spec_name"
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            dense
            label="обозначение"
            class="inputD"
            type="text"
            hide-details
            v-model="cl_R.obozn"
            @change="change_clp"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="9">
          <v-text-field
            dense
            label="Привод"
            class="inputD"
            type="text"
            hide-details
            v-model="cl_drive.spec_name"
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            dense
            label="обозначение"
            class="inputD"
            type="text"
            hide-details
            v-model="cl_drive.obozn"
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
      clap_R: ["Danfoss", "Siemens", "Broen"],
      tip_cl: [
        {
          text: "2-x",
          value: 2
        },
        {
          text: "3-x",
          value: 3
        }
      ]
    };
  },

  computed: {
    ...mapState({
      isx: state => state.Auu.isx,
      check: state => state.Auu.check,
      cl_R: state => state.Auu.cl_R,
      cl_drive: state => state.Auu.cl_drive
    })
  },
  watch: {
    isx: {
      handler() {
        this.cl_R.Kv = myFns.Kv(this.check.G1, this.cl_R.dP);
        this.$store.dispatch("CL_REG", this.cl_R);
      },
      deep: true
    },
    cl_R: {
      handler() {
        this.cl_R.Kv = myFns.Kv(this.check.G1, this.cl_R.dP);

        this.cl_R.Kvs
          ? (this.cl_R.dP_f = myFns.dP_fact(this.check.G1, this.cl_R.Kvs))
          : (this.cl_R.dP_f = "");

        this.cl_R.zavod
          ? (this.cl_drive.zavod = this.cl_R.zavod)
          : (this.cl_drive.zavod = "");
        this.$store.dispatch("CL_REG", this.cl_R);
      },
      deep: true
    },
    cl_drive: {
      handler() {
        this.$store.dispatch("CL_DRI", this.cl_drive);
      },
      deep: true
    }
  },
  methods: {
    change_clp() {
      let n = "Клапан регулирующий ";
      let t = this.cl_R.tip;
      let f = this.cl_R.zavod;
      let d = this.cl_R.du;
      let k = this.cl_R.Kvs;
      this.cl_R.spec_name =
        n + t + "-х ходовой " + f + ", Ду" + d + ", Kvs=" + k + " м³/ч";
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
