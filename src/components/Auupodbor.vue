<template>
  <v-flex>
    <reg-valve></reg-valve>

    <v-divider></v-divider>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="6">
          <!-- <v-checkbox v-model="rpdvalve" hide-details label="Регулятор перепада"></v-checkbox> -->
          <v-switch
            class="mt-0"
            v-model="rpdvalve"
            label="Регулятор перепада"
            color="info"
            value="info"
            hide-details
          ></v-switch>
        </v-col>
        <v-col cols="6">
          <!-- <v-checkbox v-model="rdsvalve" hide-details label="Регулятор до себя"></v-checkbox> -->
          <v-switch
            class="mt-0"
            v-model="rdsvalve"
            label="Регулятор до себя"
            color="info"
            value="info"
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
      check: state => state.check,
      cl_R: state => state.cl_R,
      cl_P: state => state.cl_P
    })
  },
  watch: {},
  methods: {}
};
</script>

