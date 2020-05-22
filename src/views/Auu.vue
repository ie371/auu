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
    <v-speed-dial
      fixed
      v-model="fab"
      bottom
      right
      direction="left"
      open-on-hover
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="accent darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-octagram-outline</v-icon>
        </v-btn>
      </template>
      <v-btn dark color="blue-grey darken-4" @click="openPDF('tm')">TM</v-btn>
      <v-btn dark color="light-blue darken-4" @click="openPDF('atm')">ATM</v-btn>
      <v-btn dark color="red" @click="openPDF('eom')">ЭОМ</v-btn>
    </v-speed-dial>
  </v-container>
</template>



<script>
import { mapState } from "vuex";
import axios from "axios";
import AuuIsx from "@/components/auu/Auuisx.vue";
import AuuValve from "@/components/auu/Auuvalve.vue";
import AuuTaps from "@/components/auu/Auutaps.vue";
export default {
  components: {
    AuuIsx,
    AuuValve,
    AuuTaps
  },
  data: () => ({
    fab: false,
    fling: false,
    transition: "slide-y-reverse-transition"
  }),
  computed: {
    ...mapState({
      state_auu: state => state.Auu,
      state_rekv: state => state.Rekv,
      spec: state => state.Auu.spec
    })
  },
  methods: {
    openPDF(t) {
      let f = document.getElementById("formTS");
      f.action = "./pdf/project/pr_auu.php";
      let auu = JSON.stringify(this.state_auu);
      let rekv = JSON.stringify(this.state_rekv);

      let tip = document.createElement("input");
      tip.hidden = true;
      tip.value = t;
      tip.name = "tip";
      f.appendChild(tip);

      let a = document.createElement("input");
      a.hidden = true;
      a.value = auu;
      a.name = "A";
      f.appendChild(a);

      let r = document.createElement("input");
      r.hidden = true;
      r.value = rekv;
      r.name = "R";
      f.appendChild(r);

      f.submit();
      tip.remove();
      a.remove();
      r.remove();
    }
  }
};
</script>


