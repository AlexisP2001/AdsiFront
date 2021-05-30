<template>
  <v-app>
      <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-system-bar color="#17A589"></v-system-bar>

      <v-app-bar color="#17A589">
        <v-app-bar-nav-icon @click="drawer = true" class="white--text"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <v-list-item>
          <v-img
          alt="Vuetify"
          class="shrink mr-2"
          contain
          src="https://www.pngwing.com/es/free-png-kqrnf"
          transition="scale-transition"
          width="40"
          :to="{path: '/'}"/>
          </v-list-item>
        </v-toolbar-title>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </v-main>
    </v-card>
  </v-app>
  
</template>

<script>
export default {
  name: 'App',
  data:()=>({
    icons: ['home','shopping','sitemap','cart','chart-line','account','account-multiple','logout'],
    drawer:false
  }),
};
</script>