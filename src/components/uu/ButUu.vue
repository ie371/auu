<template>
  <v-row no-gutters>
    <v-list-item dense class="d-flex justify-center">
      <div>
        <strong class="blue--text">Принципиальная схема</strong>
      </div>
    </v-list-item>

    <v-list-item dense class="d-flex justify-center">
      <div class="justify-center">
        <strong class="green--text">{{img.text}}</strong>
      </div>
    </v-list-item>

    <v-list-item dense>
      <v-col cols="12">
        <v-img :aspect-ratio="16/9" :src="img.zz" max-width="100%" contain></v-img>
      </v-col>
    </v-list-item>
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="7">
          <v-text-field
            dense
            label="Доп. трубы"
            class="inputD"
            type="text"
            hide-details
            v-model="dop.truba_dop"
            placeholder="4-50, 3-80-z"
          ></v-text-field>
        </v-col>

        <v-layout align-center justify-center>
          <v-switch
            dense
            class="inputD mt-0"
            v-model.number="dop.tpl_dop"
            label="Теплоизоляция"
            hide-details
          ></v-switch>
        </v-layout>
      </v-row>
    </v-list-item>
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="7">
          <v-text-field
            dense
            label="Доп. переходы"
            class="inputD"
            type="text"
            hide-details
            v-model="dop.perehod_dop"
            placeholder="2-40-32, 3-65-40-z"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item dense>
      <v-row align="center" justify="space-between" dense>
        <v-col cols="7">
          <v-text-field
            dense
            label="Доп. отводы"
            class="inputD"
            type="text"
            hide-details
            v-model="dop.otvod_dop"
            placeholder="6-32, 6-50-z"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
  </v-row>
</template>
 <script>
import { mapState } from "vuex";
import DU from "@/utils/du";
import DUIM from "@/utils/du_im";
import * as myFns from "@/utils/FuncUu.js";
export default {
  data() {
    return { img: "./img/10.svg" };
  },

  computed: {
    ...mapState({
      sx: state => state.Uu.sx,
      gen: state => state.Uu.gen.tipuu,
      check_co: state => state.Uu.check_co,
      check_gvs: state => state.Uu.check_gvs,
      dop: state => state.Uu.dop
    })
  },
  watch: {
    gen: {
      handler() {
        this.img = this.img_source();
      },
      deep: true
    },
    sx: {
      handler() {
        this.img = this.img_source();
      },
      deep: true
    },
    check_co: {
      handler() {
        this.img = this.img_source();
      },
      deep: true
    },
    check_gvs: {
      handler() {
        this.img = this.img_source();
      },
      deep: true
    },
    dop: {
      handler() {
        this.$store.dispatch("DOP", this.dop);
      },
      deep: true
    }
  },
  methods: {
    img_source() {
      let z = 0,
        z1 = 0,
        z2,
        z3 = this.sx.sx_otkr,
        z4 = this.check_gvs.sx_gvs,
        zz = "",
        text = "";
      this.check_co.sx_ot ? (z2 = 1) : (z2 = 0);

      switch (this.gen) {
        case "o":
          z1 = 10;
          z = z1 + z2;
          text = "ЦО";
          z4 = 0;
          break;
        case "g":
          z1 = 20;
          z = z1 + z4;
          text = "ГВС";
          break;
        case "og":
          this.sx.sx_otkr < 2 ? (text = "ЦО + ГВС") : (text = "TC");
          z1 = 3;
          this.sx.sx_otkr == 3 ? (z4 = 1) : z4;
          if (this.sx.sx_gvs_dep > 0) {
            z4 = this.sx.sx_gvs_dep + 3;
            text = "ИТП";
          }
          z = "" + z1 + z2 + z3 + z4;
          break;
        default:
          break;
      }
      zz = "./img/" + z + ".svg";
      return { zz, text };
    }
  }
};
</script>

<style scoped>
.inputD {
  font-size: 0.95em;
  font-weight: bold;
}
.inputD >>> .v-label {
  font-size: 11pt;
  font-weight: normal;
}
.inputD >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputD >>> input::-webkit-outer-spin-button,
.inputD >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.err >>> .v-input input {
  color: #dd0808;
}
.err >>> .v-input__icon {
  color: #dd0808;
}
.errs >>> .v-select__selection {
  color: #dd0808;
}
.errs >>> .v-icon {
  color: #dd0808;
}
</style>
   