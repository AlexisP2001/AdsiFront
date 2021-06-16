<template>
<v-card width="500" class="mx-auto mt-9">
  <v-card-text>
    <v-autocomplete
      v-model="tipoPersona"
      :items="items"
      dense
      filled
      label="Seleccione Tipo"
    ></v-autocomplete>
    <v-text-field
      v-model="nombre"
      :counter="20"
      label="Nombre"
      required
    ></v-text-field>
    <v-text-field
      v-model="tipoDocumento"
      label="Tipo de Documento"
      required
    ></v-text-field>
    <v-text-field
      v-model="numDocumento"
      label="Número de Documento"
      required
    ></v-text-field>
    <v-text-field
      v-model="direccion"
      label="Dirección"
      required
    ></v-text-field>
    <v-text-field
      v-model="telefono"
      label="Telefono"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="Email"
      required
    ></v-text-field>
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
    to="/persona">
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
      tipoDocumento: '',
      numDocumento : '',
      direccion : '',
      telefono: '',
      email: '',
      select:'null',
      items: ['Proveedor', 'Cliente'],
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
        this.tipoPersona = null
        this.tipoDocumento = ''
        this.numDocumento = ''
        this.direccion = ''
        this.telefono = ''
        this.email = ''
      },
    },
  }
</script>