<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <atm-uu></atm-uu>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <co-uu></co-uu>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <gvs-uu></gvs-uu>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <but-uu></but-uu>
      </v-col>
    </v-row>
    <v-btn color="red" fixed dark bottom right fab @click="openPDF" :disabled="no_proj">
      <v-icon color="white">mdi-octagram-outline</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AtmUu from "@/components/uu/AtmUu.vue";
import CoUu from "@/components/uu/CoUu.vue";
import GvsUu from "@/components/uu/GvsUu.vue";
import ButUu from "@/components/uu/ButUu.vue";
export default {
  components: {
    AtmUu,
    CoUu,
    GvsUu,
    ButUu
  },
  data() {
    return {
      ts: true
    };
  },
  computed: {
    ...mapState({
      no_proj: state => state.no_proj_ts,
      np: state => state.np,
      state_uu: state => state.Uu,
      tipuu: state => state.Uu.gen.tipuu,
      state_rekv: state => state.Rekv
    })
  },
  watch: {
    np: {
      handler() {
        this.$store.dispatch("PROJ", this.nop());
      },
      deep: true
    },
    tipuu: {
      handler() {
        this.$store.dispatch("PROJ", this.nop());
      },
      deep: true
    }
  },

  methods: {
    openPDF() {
      let f = document.getElementById("formTS");
      f.action = "./pdf/project/pr.php";
      let uu = JSON.stringify(this.state_uu);
      let rekv = JSON.stringify(this.state_rekv);
      let a = document.createElement("input");
      a.hidden = true;
      a.value = uu;
      a.name = "A";
      f.appendChild(a);
      let r = document.createElement("input");
      r.hidden = true;
      r.value = rekv;
      r.name = "R";
      f.appendChild(r);
      f.submit();
      a.remove();
      r.remove();
    },
    nop() {
      let a = true;
      switch (this.tipuu) {
        case "o":
          this.np.ot > 0 ? (a = true) : (a = false);
          break;
        case "g":
          this.np.gvs > 0 ? (a = true) : (a = false);
          break;
        case "og":
          this.np.ot > 0 || this.np.gvs > 0 ? (a = true) : (a = false);
          break;
      }
      return a;
    }
  }
};
</script>