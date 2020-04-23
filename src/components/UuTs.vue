<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="4" lg="3">
        <atm-uu></atm-uu>
      </v-col>
      <v-col cols="12" md="4" lg="3">
        <co-uu></co-uu>
      </v-col>
      <v-col cols="12" md="4" lg="3">
        <gvs-uu></gvs-uu>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import AtmUu from "@/components/AtmUu.vue";
import CoUu from "@/components/CoUu.vue";
import GvsUu from "@/components/GvsUu.vue";
export default {
  components: {
    AtmUu,
    CoUu,
    GvsUu
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>