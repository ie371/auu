<template>
  <v-row no-gutters>
    <reg-valve></reg-valve>

    <pumps></pumps>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-layout align-center justify-center>
          <v-switch
            class="inputD mt-0"
            v-model="rpdvalve"
            label="Регулятор перепада"
            color="deep-orange"
            hide-details
          ></v-switch>
        </v-layout>

        <v-layout align-center justify-center>
          <v-switch
            class="inputD mt-0"
            v-model="rdsvalve"
            label="Регулятор до себя (балансировочный клапан)"
            color="deep-orange"
            hide-details
          ></v-switch>
        </v-layout>
      </v-row>
    </v-list-item>

    <rpd-valve v-show="rpdvalve"></rpd-valve>

    <rds-valve v-show="rdsvalve"></rds-valve>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import RegValve from "@/components/auu/Regvalve.vue";
import RpdValve from "@/components/auu/Rpdvalve.vue";
import RdsValve from "@/components/auu/Rdsvalve.vue";
import Pumps from "@/components/auu/Pumps.vue";
export default {
  components: {
    RegValve,
    RpdValve,
    RdsValve,
    Pumps
  },
  data() {
    return {
      rpdvalve: false,
      rdsvalve: false
    };
  },

  computed: {
    ...mapState({
      cl_P: state => state.Auu.cl_P,
      cl_D: state => state.Auu.cl_D
    })
  },
  watch: {
    rpdvalve() {
      this.cl_P.enable = this.rpdvalve;
      this.$store.dispatch("CL_PER", this.cl_P);
    },
    rdsvalve() {
      this.cl_D.enable = this.rdsvalve;
      this.$store.dispatch("CL_DOS", this.cl_D);
      this.$store.dispatch("STAND");
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
