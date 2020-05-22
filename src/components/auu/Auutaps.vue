<template>
  <v-row no-gutters>
    <v-list-item dense>
      <v-list-item-content>
        <v-row align="center" dense>
          <v-col cols="3">
            <div>
              <strong class="blue--text">Обвязка АУУ</strong>
            </div>
          </v-col>
          <v-spacer />
          <v-col cols="3">
            <!-- <v-btn class="mt-0" dark color="blue" @click="openPDF">r3r7r1</v-btn> -->
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" dense>
        <v-col cols="6">
          <v-select
            dense
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
            hide-details
            :items="DU"
            label="Ду"
            class="inputD"
            item-text="text"
            item-value="val"
            v-model.number="selected_du"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            label="кол-во"
            class="inputD"
            type="number"
            hide-details
            v-model.number="selected_quantity"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <div class="my-2">
            <v-btn small class="ma-2" dark fab color="indigo" @click="add_equip">+</v-btn>
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
  </v-row>
</template>
<script>
import { mapState } from "vuex";
// import axios from "axios";
import DU from "@/utils/du";
import spectemplate from "@/utils/spectemplate";

export default {
  data: () => ({
    DU,
    spectemplate,
    selected_eq: "",
    selected_du: "",
    selected_quantity: ""
  }),
  computed: {
    ...mapState({
      // state_auu: state => state.Auu,
      // state_rekv: state => state.Rekv,
      spec: state => state.Auu.spec
    })
  },
  watch: {},
  methods: {
    add_stand() {
      this.$store.dispatch("STAND");
    },
    add_equip() {
      let eq = {
        text: this.selected_eq.text,
        type: this.selected_eq.type,
        du: this.selected_du,
        quantity: this.selected_quantity
      };
      let newArr = [];
      let index = "";
      if (this.spec.length > 0) {
        newArr = this.spec.filter(el => el.type == eq.type && el.du == eq.du);
        index = this.spec.findIndex(el => el.type == eq.type && el.du == eq.du);
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
  /* color: rgb(16, 60, 182); */
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
