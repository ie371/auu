<template>
  <!-- <v-card class="mx-auto" max-width="400"> -->
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <!-- <v-list-item-subtitle class="red--text">Клапан регулирующий</v-list-item-subtitle> -->
        <div>
          <strong class="success--text">Клапан регулирующий</strong>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="dP расч"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="cl_R.dP"
            step="0.1"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="4"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="Кv расч"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="cl_R.Kv"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="Кvs"
            class="inputD"
            type="number"
            hide-details
            valid
            v-model.number="cl_R.Kvs"
            @change="change_clp"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="dP факт"
            class="inputD"
            type="number"
            hide-details
            valid
            readonly
            v-model.number="cl_R.dP_f"
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
            :items="clap_R"
            label="Производ"
            class="inputD"
            v-model="cl_R.firms"
            @change="change_clp"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            dense
            filled
            outlined
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
            filled
            outlined
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
            filled
            outlined
            label="Наименование"
            class="inputD"
            type="text"
            hide-details
            valid
            clearable
            v-model="cl_R.naim_cl"
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
            v-model="cl_R.obozn_cl"
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
            filled
            outlined
            label="Привод"
            class="inputD"
            type="text"
            hide-details
            valid
            v-model="cl_R.naim_priv"
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
            v-model="cl_R.obozn_priv"
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
      isx: state => state.isx,
      check: state => state.check,
      cl_R: state => state.cl_R
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
        if (this.cl_R.Kvs) {
          this.cl_R.dP_f = myFns.dP_fact(this.check.G1, this.cl_R.Kvs);
        }
        this.cl_R.naim_cl
          ? (this.cl_R.naim_priv = "Электропривод клапана ")
          : (this.cl_R.naim_priv = "");
        this.$store.dispatch("CL_REG", this.cl_R);
      },
      deep: true
    }
  },
  methods: {
    change_clp() {
      let n = "Клапан регулирующий ";
      let t = this.cl_R.tip;
      let f = this.cl_R.firms;
      let d = this.cl_R.du;
      let k = this.cl_R.Kvs;
      this.cl_R.naim_cl =
        n + t + "-х ходовой " + f + ", Ду" + d + ", Kvs=" + k + " м³/ч";
    }
  }
};
</script>

<style scoped>
.inputD {
  /* padding: 0; */
  /* font-size: 0.9em; */
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
