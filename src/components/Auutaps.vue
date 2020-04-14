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

export default {
  data: () => ({
    DU,
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
      this.$store.dispatch("STAND");
    },
    add_stand____() {
      class El {
        constructor(text, tip, du, quantity) {
          this.text = text;
          this.tip = tip;
          this.du = du;
          this.quantity = quantity;
        }
      }
      let x, du_;
      let _ee = [];
      _ee.push(new El("Кран", "tap", this.check.duT1, 2));
      _ee.push(new El("Кран", "tap", this.check.duT11, 2));
      this.pumps.perem
        ? (du_ = this.check.duT3)
        : ((du_ = this.check.duT11), _ee.push(new El("Кран", "tap", 50, 1)));
      this.pumps.two_pumps ? (x = 4) : this.pumps.perem ? (x = 2) : (x = 0);
      if (x > 0) {
        this.pumps.taps
          ? _ee.push(new El("Кран", "tap", du_, x))
          : _ee.push(new El("Затвор", "zatv", du_, x));
      }
      this.pumps.perem
        ? this.pumps.two_pumps
          ? _ee.push(new El("Обратный клапан", "ok", this.check.duT3, 2))
          : _ee.push(new El("Обратный клапан", "ok", this.check.duT3, 1))
        : this.pumps.two_pumps
        ? (_ee.push(new El("Обратный клапан", "ok", this.check.duT3, 1)),
          _ee.push(new El("Обратный клапан", "ok", this.check.duT11, 2)))
        : _ee.push(new El("Обратный клапан", "ok", this.check.duT3, 1));
      this.pumps.perem ? du_ : _ee.push(new El("Обратный клапан", "ok", 50, 1));

      _ee.push(new El("Фильтр", "filter", this.check.duT11, 1));
      this.check.filter_t1
        ? _ee.push(new El("Фильтр", "filter", this.check.duT1, 1))
        : "";

      const result = _ee.reduce(function(acc, val) {
        let o = acc
          .filter(function(obj) {
            return obj.tip == val.tip && obj.du == val.du;
          })
          .pop() || { text: val.text, tip: val.tip, du: val.du, quantity: 0 };
        o.quantity += val.quantity;
        acc.push(o);
        return acc;
      }, []);
      const uniq = Array.from(new Set(result));
      this.$store.dispatch("SPEC", uniq);
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
