<template>
  <div>
    <v-tabs slot="extension" v-model="model" left color slider-color="blue">
      <v-tab v-for="(tab, i) in mameTab" :key="i" :href="`#tab${i}`">{{tab.name}}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="model">
      <v-tab-item id="tab0">
        <v-card flat>
          <uu-ts></uu-ts>
        </v-card>
      </v-tab-item>
      <v-tab-item id="tab1">
        <v-card flat></v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import UuTs from "@/components/UuTs.vue";

export default {
  components: {
    UuTs
  },
  data() {
    return {
      model: "tab0",
      mameTab: [{ name: "Теплоснабжение" }, { name: "ХВС" }]
    };
  },
  computed: {},
  methods: {}
};
</script>