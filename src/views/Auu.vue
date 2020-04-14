<template>
  <!-- <v-container class="grey lighten-5"> -->
  <v-flex>
    <v-row>
      <v-col md="2">
        <auu-isx></auu-isx>
      </v-col>
      <v-col md="6">
        <auu-valve></auu-valve>
      </v-col>
      <v-col md="4">
        <auu-taps></auu-taps>
      </v-col>
    </v-row>
  </v-flex>
  <!-- </v-container> -->
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

