<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="#"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="#"
          width="100"
        />-->
      </div>

      <v-spacer></v-spacer>

      <v-btn v-for="(item,i) in menuItems" :key="i" :to="item.route" dark text>{{item.title}}</v-btn>

      <v-btn dark text>
        <v-icon left>mdi-exit-run</v-icon>Выход
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  computed: {
    menuItems() {
      return [
        {
          icon: "mdi-open-in-new",
          title: "home",
          route: "/"
        },
        {
          icon: "mdi-cards-club",
          title: "УУ",
          route: "/about"
        },
        {
          icon: "mdi-cards-club",
          title: "АУУ",
          route: "/auu"
        }
      ];
    }
  }
};
</script>
