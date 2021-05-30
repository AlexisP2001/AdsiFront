<template>
  <v-app>
     <v-container>
      <template>
  <v-data-table class="mx-auto mt-5 elevation-15" max-width="900"
    :headers="columnas"
    :items="articulos"
    :search="search"
    sort-by="calories"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Inventario</v-toolbar-title>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              to="/crearArticulo"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Añadir
            </v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">¿Esta segudo de eliminar el articulo?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-{{icons[8]}}
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-{{icons[9]}}
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
    </v-container>
  </v-app>
</template>


<script>
import axios from 'axios'
  export default {
    data: () => ({
      icons: ['home','shopping','sitemap','cart','chart-line','account','account-multiple','logout','pencil','delete'],
      drawer:false,
      search: '',

      dialog: false,
      dialogDelete: false,
      columnas: [
        { text: 'ID', value: 'id',},
        { text: 'Nombre', value: 'nombre' },
        { text: 'Stock', value: 'stock' },
        { text: 'Categoria', value: 'categoria' },
        { text: 'Precio', value: 'precio' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      articulos: [
        {id:1,
        nombre:'Televisor',
        stock:15,
        categoria:'Televisores',
        precio:1500},

        {id:2,
        nombre:'Tablet',
        stock:21,
        categoria:'Tablets',
        precio:1800},

        {id:3,
        nombre:'Iphone',
        stock:18,
        categoria:'Celulares',
        precio:2000},
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        nombre: '',
        stock: 0,
        categoria: '',
        precio: 0,
      },
      defaultItem: {
        id: '',
        nombre: '',
        stock: 0,
        categoria: '',
        precio: 0,
      },
    }),
    created(){
      axios.get('/articulo').then(response => {
        this.articulos = response.data;
        console.log(this.articulos);
      })
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
      obtenerArticulos(){
        axios.get('/articulo')
        .then(respuesta =>{
          this.articulos = respuesta.data
        })
        .catch(function(error){
          console.log(error);
        })
      },

      confirmarBorrado(){
        axios.delete('/articulo/id')//+id)
        .then(()=>{
          this.obtenerArticulos();
          this.dialog=false;
          this.snackbar = true
        })
        .catch(function(error){
          console.log(error);
        })
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
  }
</script>