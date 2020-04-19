<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <v-col cols="12" md="4" lg="2">
        <auu-isx></auu-isx>
      </v-col>
      <v-col cols="12" md="8" lg="6">
        <auu-valve></auu-valve>
      </v-col>
      <v-col cols="12" md="12" lg="4">
        <auu-taps></auu-taps>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import AuuIsx from "@/components/Auuisx.vue";
import AuuValve from "@/components/Auuvalve.vue";
import AuuTaps from "@/components/Auutaps.vue";
export default {
  components: {
    AuuIsx,
    AuuValve,
    AuuTaps
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>


