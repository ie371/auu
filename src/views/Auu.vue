<template>
  <!-- <v-container class="grey lighten-5"> -->
  <v-flex>
    <v-row>
      <v-col md="3">
        <auu-isx></auu-isx>
      </v-col>
      <v-col md="6">
        <auu-podbor></auu-podbor>
      </v-col>
      <v-col md="3"></v-col>
    </v-row>
  </v-flex>
  <!-- </v-container> -->
</template>
<script>
import AuuIsx from "@/components/Auuisx.vue";
import AuuPodbor from "@/components/Auupodbor.vue";
export default {
  components: {
    AuuIsx,
    AuuPodbor
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

