<template>
  <v-app dark>
    <v-app-bar app clipped-right color="grey darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Реквизиты</v-toolbar-title>
      <v-spacer />
      <v-btn v-for="(item,i) in menuItems" :key="i" :to="item.route" dark text>{{item.title}}</v-btn>
      <v-btn dark text>
        <v-icon left>mdi-exit-run</v-icon>Выход
      </v-btn>
    </v-app-bar>

    <form
      id="formTS"
      method="post"
      target="_blank"
      action="./pdf/project/pr.php"
      enctype="multipart/form-data"
    >
      <v-content>
        <router-view />
      </v-content>

      <v-navigation-drawer v-model="drawer" fixed temporary width="600">
        <rekviz></rekviz>
      </v-navigation-drawer>
    </form>
  </v-app>
</template>

<script>
import Rekviz from "@/components/rekviz.vue";
export default {
  components: {
    Rekviz
  },
  name: "App",

  data: () => ({
    drawer: null
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
          route: "/uu"
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
