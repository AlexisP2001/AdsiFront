<template>
<div>
    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    bottom> 
    <v-list>
    <v-list-item :to="{path:'/articulo'}">
      <v-list-item-action>
        <v-icon>mdi-{{icons[1]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Articulos</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/categoria'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[2]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Categorias</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/compra'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[3]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Compras</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/venta'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[4]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Ventas</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/persona'}">
    <v-list-item-action>
        <v-icon>mdi-{{icons[5]}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Personas</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item :to="{path:'/usuario'}">
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
      <v-system-bar color="#128E75"></v-system-bar>

      <v-app-bar color="#17A589">
        <v-app-bar-nav-icon @click="drawer = true" class="white--text"></v-app-bar-nav-icon>
      </v-app-bar>
    </v-card>
  </div>
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