<template>
<v-card width="500" class="mx-auto mt-9">
  <v-card-text>
    <v-text-field
      v-model="nombre"
      :counter="20"
      label="Nombre"
      required
    ></v-text-field>
    <v-text-field
      v-model="descripcion"
      label="Descripcion"
      required
    ></v-text-field>
    <v-select
      v-model="estado"
      :items="items"
      label="Estado"
      required
    ></v-select>
    <v-btn
      color="success"
      class="mr-4"
      @click="realizar"
    >
      Crear
    </v-btn>
    <v-btn 
    color="info"
    class="mr-4"
    @click="limpiar">
      Limpiar
    </v-btn>

    <v-btn 
    color="error"
    class="mr-4"
    to="/categoria">
      Cancelar
    </v-btn>
  </v-card-text>    
</v-card>
</template>

<script>
import axios from 'axios'
  export default {
      data: () => ({
      nombre: '',
      descripcion: '',
      estado: '',
      select: null,
      items: [
        '',
        0,
        1,
      ],
      checkbox: false,
    }),

    computed: {
    },

    methods: {
      realizar () {
        let header = {headers:{"token" : this.$store.state.token}};
        axios.post("categoria",header)
        .then(response =>{
          console.log(response);
        })
        .catch((error) =>{
          console.log(error.response);
        })
        
      },
      limpiar () {
        this.nombre = ''
        this.descripcion = ''
        this.estado = null
      },
    },
  }
</script>