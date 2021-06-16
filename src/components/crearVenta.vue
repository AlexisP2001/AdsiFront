<template>
  <v-container>
    <v-row>
      <v-col class="mb-2">
        <h5 class="display-2 font-weight-bold mb-3">Nueva Venta</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <form v-on:submit.prevent="guardarVenta()">
          <v-text-field
          v-model="venta.usuario"
          label="Usuario"
          outlined
          required>
          </v-text-field>

          <v-text-field
          v-model="venta.persona"
          label="Persona"
          outlined
          required>
          </v-text-field>

          <v-text-field
          v-model="venta.tipoComprobante"
          label="Tipo Comprobante"
          outlined
          required>

          </v-text-field>
          <v-text-field
          v-model="venta.serieComprobante"
          label="Serie comprobante"
          outlined
          type="number"
          required>

          </v-text-field>
          <v-text-field
          v-model="venta.numComprobante"
          label="Número de comprobante"
          outlined
          type="number"
          required>
          </v-text-field>
           <v-text-field
          v-model="venta.impuesto"
          label="Impuesto"
          outlined
          type="number"
          required>
          </v-text-field>
           <v-text-field
          v-model="venta.total"
          label="Total"
          outlined
          type="number"
          required>
          </v-text-field>
          <v-col>
                <h1>Detalles de la venta</h1>
            </v-col>
            <v-text-field
          v-model="venta.id"
          label="ID"
          outlined
          required>
          </v-text-field>
          <v-text-field
          v-model="venta.articulo"
          label="Articulo"
          outlined
          required>
          </v-text-field>
          <v-text-field
          v-model="venta.cantidad"
          label="Cantidad"
          outlined
          type="number"
          required>
          </v-text-field>
          <v-text-field
          v-model="venta.precio"
          label="Precio"
          prefix="$"
          outlined
          type="number"
          required>
          </v-text-field>
          <v-text-field
          v-model="venta.descuanto"
          label="Descuento"
          prefix="$"
          outlined
          type="number"
          required>
          </v-text-field>
          <v-card-actions>
            <v-btn to="/venta" color="error" class="mr-4">Cancelar</v-btn>
            <v-btn type="submit" color="success" @click="guardar()" class="mr-4">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios'
export default {
  data(){
    return{
      venta:{
        usuario:'',
        persona:'',
        tipoComprobante:'',
        serieComprobante:'',
        numComprobante:'',
        impuesto:'',
        total:'',
        id:'',
        articulo:'',
        cantidad:'',
        precio:'',
        descuento:''
      }
    }
  },
  methods: {
    guardar(){
      
    }
  },
}
</script>