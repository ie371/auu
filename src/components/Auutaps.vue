<template>
  <!-- <v-card class="mx-auto" max-width="400"> -->
  <v-flex>
    <v-list-item dense>
      <v-list-item-content>
        <v-row align="center" dense>
          <v-col cols="3">
            <div>
              <strong class="success--text">Обвязка АУУ</strong>
            </div>
          </v-col>
          <v-col cols="3">
            <v-btn
              class="ma-2"
              dark
              color="blue-grey"
              :disabled="dis_but"
              @click="add_stand"
            >Добавить</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              class="ma-2"
              dark
              color="blue-grey"
              :disabled="dis_but"
              @click="remove_spec"
            >Очистить</v-btn>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="6">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="spectemplate"
            label="Оборудование"
            class="inputD"
            return-object
            v-model="selected_eq"
            clearable
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            dense
            filled
            outlined
            hide-details
            :items="DU"
            label="Ду"
            class="inputD"
            v-model="selected_du"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            filled
            outlined
            label="кол-во"
            class="inputD"
            type="number"
            hide-details
            v-model.number="selected_quantity"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <div class="my-2">
            <v-btn small class="ma-2" outlined fab color="indigo" @click="add_equip">+</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-col cols="10">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Тип</th>
                <th class="text-left">Ду</th>
                <th class="text-left">Кол-во</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in spec" :key="i">
                <td>{{ item.text }}</td>
                <td>{{ item.du }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" @click="remove_equip(i)">mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-list-item>
  </v-flex>
</template>
<script>
import { mapState } from "vuex";
import DU from "@/utils/du";
import spectemplate from "@/utils/spectemplate";
import ee from "@/utils/spectemplateauu";
// import * as myFns from "@/utils/Function.js";
export default {
  data: () => ({
    DU,
    ee,
    dis_but: true,
    spectemplate,
    selected_eq: "",
    selected_du: "",
    selected_quantity: ""
  }),
  computed: {
    ...mapState({
      isx: state => state.isx,
      check: state => state.check,
      spec: state => state.spec,
      pumps: state => state.pumps
    })
  },
  watch: {
    check: {
      handler() {
        this.check.duT1 == "" || this.check.duT11 == ""
          ? (this.dis_but = true)
          : (this.dis_but = false);
      },
      deep: true
    }
  },
  methods: {
    add_stand() {
      let x = 0;
      let ob = 0;
      let du_ok = "";
      let nok = 0;
      let _ee = [];
      this.pumps.perem ? (du_ok = this.check.duT3) : (du_ok = this.check.duT11);
      let tap_set = {
        text: "Кран",
        tip: "tap",
        du: this.check.duT1,
        quantity: 2
      };
      let tap_sys = {
        text: "Кран",
        tip: "tap",
        du: this.check.duT11,
        quantity: 2
      };
      let tap_obv = {
        text: "Кран",
        tip: "tap",
        du: 50,
        quantity: 1
      };
      let zatv = {
        text: "Затвор",
        tip: "zatv",
        du: du_ok,
        quantity: 0
      };
      let ok = {
        text: "Обратный клапан",
        tip: "ok",
        du: du_ok,
        quantity: 0
      };
      let ok_obv = {
        text: "Обратный клапан",
        tip: "ok",
        du: 50,
        quantity: 1
      };
      let filter = {
        text: "Фильтр",
        tip: "filter",
        du: this.check.duT11,
        quantity: 1
      };
      this.pumps.two_pumps ? (x = 4) : this.pumps.perem ? (x = 2) : (x = 0);
      this.pumps.perem ? (this.pumps.double ? (nok += 1) : nok) : nok;
      this.pumps.taps
        ? this.isx.t1 > 105
          ? (tap_sys.quantity += x)
          : (tap_set.quantity += x)
        : (zatv.quantity = x);

      this.pumps.two_pumps
        ? (nok = 2)
        : this.pumps.double
        ? (nok = 0)
        : (nok = 1);
      this.pumps.perem ? (this.pumps.double ? (nok += 1) : nok) : nok;
      ok.quantity = nok;
      _ee.push(tap_set);
      _ee.push(tap_sys);
      _ee.push(zatv);
      _ee.push(ok);
      let newArr_t = [];
      let index_t = "";
      let newArr_o = [];
      let index_o = "";
      if (!this.pumps.perem) {
        newArr_t = _ee.filter(el => el.tip == "tap" && el.du == 50);
        index_t = _ee.findIndex(el => el.tip == "tap" && el.du == 50);
        newArr_o = _ee.filter(el => el.tip == "ok" && el.du == 50);
        index_o = _ee.findIndex(el => el.tip == "ok" && el.du == 50);
        newArr_t.length > 0 ? (_ee[index_t].quantity += 1) : _ee.push(tap_obv);
        newArr_o.length > 0 ? (_ee[index_o].quantity += 1) : _ee.push(ok_obv);
      }
      _ee.push(filter);
      let spec = _ee.filter(el => el.quantity > 0);
      this.$store.dispatch("SPEC", spec);
    },
    add_stand__() {
      let x = 0;
      let du_ = "";
      // let _ee = this.ee;
      let _ee = [];

      let tap_set = {
        text: "Кран",
        tip: "tap",
        du: "",
        quantity: 2
      };
      let tap_sys = {
        text: "Кран",
        tip: "tap",
        du: "",
        quantity: 2
      };
      let tap_pump = {
        text: "",
        tip: "",
        du: "",
        quantity: 0
      };
      let tap_obv = {
        text: "Кран",
        tip: "tap",
        du: 50,
        quantity: 0
      };
      let ok = {
        text: "Обратный клапан",
        tip: "ok",
        du: "",
        quantity: 0
      };
      let ok_obv = {
        text: "Обратный клапан",
        tip: "ok",
        du: 50,
        quantity: 0
      };
      let filter = {
        text: "Фильтр",
        tip: "filter",
        du: "",
        quantity: 1
      };

      tap_set.du = this.check.duT1;
      tap_sys.du = this.check.duT11;

      this.pumps.taps
        ? ((tap_pump.text = "Кран"), (tap_pump.tip = "tap"))
        : ((tap_pump.text = "Затвор"), (tap_pump.tip = "zatv"));
      this.pumps.perem ? (du_ = this.check.duT3) : (du_ = this.check.duT11);
      tap_pump.du = du_;

      this.pumps.two_pumps
        ? (tap_pump.quantity = 4)
        : this.pumps.perem
        ? (tap_pump.quantity = 2)
        : (tap_pump.quantity = 0);

      this.pumps.perem
        ? ((tap_obv.quantity = 0), (ok_obv.quantity = 0))
        : ((tap_obv.quantity = 1), (ok_obv.quantity = 1));

      ok.du = du_;
      this.pumps.two_pumps
        ? (ok.quantity = 2)
        : this.pumps.double
        ? (ok.quantity = 0)
        : (ok.quantity = 1);

      this.pumps.perem
        ? this.pumps.double
          ? (ok.quantity += 1)
          : ok.quantity
        : ok.quantity;

      const result = [];
      _ee.push(tap_set);

      _ee.push(tap_sys);
      _ee.push(tap_pump);
      _ee.push(tap_obv);
      _ee.push(ok);
      _ee.push(ok_obv);
      _ee.push(filter);

      console.log(_ee);
      //   _ee.forEach(el => {
      //     let newArr = _ee.filter(el => el.tip == eq.tip && el.du == eq.du);
      //     let index = result.findIndex(el => el.tip == eq.tip && el.du == eq.du);
      //   });

      //  if (newArr.length > 0) {
      //     this.spec[index].quantity += eq.quantity;
      //   } else {
      //     this.spec.push(eq);
      //   }

      console.log(result);

      // const map = new Map();
      // const result = [];
      // for (const item of _ee) {
      //   if (!map.has(item.tip)) {
      //     map.set(item.tip, true); // set any value to Map
      //     result.push({
      //       text: item.tip,
      //       tip: item.tip,
      //       du: item.du,
      //       quantity: item.quantity
      //     });
      //   }
      // }

      // _ee.map(el => {
      //   newArr = this.spec.filter(el => el.tip == eq.tip && el.du == eq.du);
      //   index = this.spec.findIndex(el => el.tip == eq.tip && el.du == eq.du);
      // });

      // for (let value of Object.entries(_ee)) {
      //   // console.log(`${key}: ${value}`);
      //   console.log(value);
      //   if (value.quantity > 0) {
      //     _eee.push(value);
      //   }
      // }

      // console.log(_ee);

      // this.$store.dispatch("SPEC", this.spec);
    },
    remove_spec() {
      this.$store.dispatch("SPEC_REM");
    },
    add_equip() {
      let eq = {
        text: this.selected_eq.text,
        tip: this.selected_eq.tip,
        du: this.selected_du,
        quantity: this.selected_quantity
      };
      let newArr = [];
      let index = "";
      if (this.spec.length > 0) {
        newArr = this.spec.filter(el => el.tip == eq.tip && el.du == eq.du);
        index = this.spec.findIndex(el => el.tip == eq.tip && el.du == eq.du);
      }
      if (newArr.length > 0) {
        this.spec[index].quantity += eq.quantity;
      } else {
        this.spec.push(eq);
      }
      this.selected_eq = "";
      this.selected_du = "";
      this.selected_quantity = "";
      this.$store.dispatch("SPEC", this.spec);
    },
    remove_equip(i) {
      this.spec.splice(i, 1);
      this.$store.dispatch("SPEC", this.spec);
    }
  }
};
</script>

<style scoped>
.inputD {
  /* padding: 0; */
  font-size: 0.95em;
  font-weight: bold;
}

.inputD >>> .v-label {
  font-size: 11pt;
  color: rgb(16, 60, 182);
  font-weight: normal;
  /* opacity: 0.5; */
}
.inputD >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputD >>> input::-webkit-outer-spin-button,
.inputD >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
