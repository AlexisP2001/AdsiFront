<template>
  <v-container>
    <v-row>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Creacion de articulo</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form v-on:submit.prevent="guardarArticulo()">
          <v-text-field
          v-model="articulo.codigo"
          label="Codigo"
          outlined
          required>
          </v-text-field>

          <v-text-field
          v-model="articulo.nombre"
          label="Nombre"
          outlined
          required>
          </v-text-field>

          <v-text-field
          v-model="articulo.descripcion"
          label="Descripcion"
          outlined
          required>

          </v-text-field>
          <v-text-field
          v-model="articulo.precio"
          label="Precio"
          outlined
          type="number"
          prefix="$"
          required>

          </v-text-field>
          <v-text-field
          v-model="articulo.stock"
          label="Stock"
          outlined
          type="number"
          required>
          </v-text-field>
          <v-card-actions>
            <v-btn to="/articulos" color="blue-grey" class="mr-4">Cancelar</v-btn>
            <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// let url = 'https://proyectosemilla.herokuapp.com/api/articulo';
// import axios from 'axios'
export default {
  
}
</script>