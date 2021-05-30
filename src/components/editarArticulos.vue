<template>
  <v-app>
    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    app clipped> 
    <v-list>
    <v-list-item :to="{path:'/articulos'}">
      <v-list-item-action>
        <v-icon>mdi-{{icons[1]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Articulos</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/categorias'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[2]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Categorias</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/compras'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[3]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Compras</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/ventas'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[4]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Ventas</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/personas'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[5]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Personas</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/usuarios'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[6]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Usuarios</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/login'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[7]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Salir</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    </v-list>
    </v-navigation-drawer>


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