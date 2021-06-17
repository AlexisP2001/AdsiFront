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
        <v-toolbar-title>Articulos</v-toolbar-title>
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
    <template v-slot:[`item.actions`]="{ item }">
          <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-{{icons[0]}}
      </v-icon>
      <template v-if="item.estado">
      <v-icon
        small
        class="mr-2"
        @click="activarDesactivarItem(2,item)"
      >
        mdi-{{icons[2]}}
      </v-icon>
      </template>
      <template v-else>
      <v-icon
        small
        @click="activarDesactivarItem(1,item)"
      >
        mdi-{{icons[1]}}
      </v-icon>
      </template>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
</template>
    </v-container>
  </v-app>
</template>


<script>
import axios from 'axios'
  export default {
    data: () => ({      
      icons: ['pencil','check','block-helper'],
      drawer:false,
      search: '',

      dialog: false,
      dialogDelete: false,
      columnas: [
        // { text: 'Categoria', value: 'categoria' },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Precio', value: 'precioventa' },
        { text: 'Stock', value: 'stock' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      articulos: [
        {categoria:'',
        codigo:'',
        precioventa:'',
        stock:'',
        nombre:'',
        estado:'',
        descripcion:''},  
      ],
      editedIndex: -1,
      editedItem: {
        categoria:'',
        estado:'',
        precioventa:'',
        codigo:'',
        stock:'',
        nombre:'',
        descripcion:'',
      },
      defaultItem: {
        categoria:'',
        estado:'',
        precioventa:'',
        codigo:'',
        stock:'',
        nombre:'',
        descripcion:''
      },
    }),
    created(){
      this.obtenerArticulos();
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
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("articulo",header)
        .then(response =>{
          console.log(response);
          this.articulos = response.data.articulos
        })
        .catch((error) =>{
          console.log(error.response);
        })
      },
        activarDesactivarItem (accion , item) {
        let id = item._id;
        console.log(accion);
        if(accion == 2){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`articulo/desactivar/${id}`,
          {estado:0},
          header)
          .then(function(){
            me.obtenerArticulos();
          })
          .catch(function(error){
            console.log(error);
          });
        }else if (accion==1){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`articulo/activar/${id}`,
          {estado:1},
          header)
          .then(function(){
            me.obtenerArticulos();
          })
          .catch(function(error){
            console.log(error);
          });
        }
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