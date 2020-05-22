<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <atm-uuhvs></atm-uuhvs>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <hvs-uu></hvs-uu>
      </v-col>
      <v-col cols="12" md="6" lg="3"></v-col>
      <v-col cols="12" md="6" lg="3"></v-col>
    </v-row>
    <v-btn color="blue" dark fixed bottom right fab @click="openPDF" :disabled="no_proj">
      <v-icon color="white">mdi-octagram-outline</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AtmUuhvs from "@/components/uu/AtmUuHvs.vue";
import HvsUu from "@/components/uu/HvsUu.vue";
export default {
  components: {
    AtmUuhvs,
    HvsUu
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      no_proj: state => state.no_proj_hvs,
      state_uu: state => state.UuHvs,
      state_rekv: state => state.Rekv
    })
  },
  watch: {},

  methods: {
    openPDF() {
      let f = document.getElementById("formTS");
      f.action = "./pdf/project/pr_hvs.php";
      let uu = JSON.stringify(this.state_uu);
      let rekv = JSON.stringify(this.state_rekv);
      let h = document.createElement("input");
      h.hidden = true;
      h.value = uu;
      h.name = "H";
      f.appendChild(h);
      let r = document.createElement("input");
      r.hidden = true;
      r.value = rekv;
      r.name = "R";
      f.appendChild(r);
      f.submit();
      h.remove();
      r.remove();
    }
  }
};
</script>