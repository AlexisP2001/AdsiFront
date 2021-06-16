<template>
  <v-container>
    <v-row>
      <v-col>
        <h5 class="display-1 font-weight-bold">Articulo Nuevo</h5>
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
            <v-btn to="/articulo" color="error" class="mr-4">Cancelar</v-btn>
            <v-btn type="submit" color="success" @click="guardar()" class="mr-4">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let url = 'https://adsi2067725v1.herokuapp.com/api/articulo';
import axios from 'axios'
export default {
  name:'crearArticulo',
  data(){
    return{
      articulo:{
        codigo:'',
        nombre:'',
        descripcion:'',
        precio:'',
        stock:''

        

      }
    }
  },
  methods: {
    guardarArticulo(){
      let router = this.$router;
      console.log(router);
      let params = this.articulo
      axios.post(url, params)
      .then(()=>{
        router.push('/articulo')
      })
      .catch(()=>{
        console.log()
      })
    },
    // guardar(){
    //   if (this.bd == 0){

    //   }else{

    //   }
    // }
  },
}
</script>