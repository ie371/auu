<template>
  <v-flex>
    <reg-valve></reg-valve>

    <v-divider></v-divider>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="6">
          <v-switch
            class="mt-0"
            v-model="rpdvalve"
            label="Регулятор перепада"
            color="info"
            hide-details
          ></v-switch>
        </v-col>
        <v-col cols="6">
          <v-switch
            class="mt-0"
            v-model="rdsvalve"
            label="Регулятор до себя (балансировочный клапан)"
            color="info"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>

    <rpd-valve v-show="rpdvalve"></rpd-valve>

    <v-divider></v-divider>

    <rds-valve v-show="rdsvalve"></rds-valve>

    <pumps></pumps>
  </v-flex>
</template>
<script>
import { mapState } from "vuex";
import RegValve from "@/components/Regvalve.vue";
import RpdValve from "@/components/Rpdvalve.vue";
import RdsValve from "@/components/Rdsvalve.vue";
import Pumps from "@/components/Pumps.vue";
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
      isx: state => state.isx,
      cl_P: state => state.cl_P,
      cl_D: state => state.cl_D
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
    }
    //   deep: true
    // },

    // cl_D: {
    //   handler() {
    //     this.cl_D.Kv = myFns.Kv(this.check.G1, this.cl_D.dP);
    //     this.cl_D.dP_f = myFns.dP_fact(this.check.G1, this.cl_D.Kvs);
    //     this.$store.dispatch("CL_DOS", this.cl_D);
    //   },
    //   deep: true
    // }
  },
  methods: {}
};
</script>

