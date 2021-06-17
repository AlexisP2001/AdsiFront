<template>
  <v-app>
     <v-container>
        <template>
          <v-data-table class="mx-auto mt-5 elevation-15" max-width="900" :headers="columnas" :items="categorias" :search="search" sort-by="calories">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Categorias</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-divider class="mx-4" inset vertical ></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn to="/crearCategoria" color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Añadir</v-btn>
                  </template>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">¿Esta segudo de eliminar la categoria?</v-card-title>
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
              <v-icon small class="mr-2" @click="editItem(item)">mdi-{{icons[0]}}</v-icon>

              <!--para cambiar estado de categoria-->
              <!--<v-icon small @click="deleteItem(item)">mdi-{{icons[1]}}</v-icon>-->
              <template v-if="item.estado">
                <v-icon small class="mr-2" @click="deleteItem(2,item)">mdi-block-helper</v-icon>
              </template>
              <template v-else>
                <v-icon small class="mr-2" @click="deleteItem(1,item)">mdi-check</v-icon>
              </template>

            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset </v-btn>
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
      icons: ['pencil','delete'],
      drawer:false,
      search: '',

      dialog: false,
      dialogDelete: false,
      columnas: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      categorias: [
        {estado:'',
        nombre:'',
        descripcion:''}
      ],
      editedIndex: -1,
      editedItem: {
        estado:'',
        nombre: '',
        Descripcion: '',
      },
      defaultItem: {
        estado:'',
        nombre: '',
        Descripcion: ''
      },
    }),
    created(){
      this.obtenerCategorias();
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
      obtenerCategorias(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("categoria",header)
        .then(response =>{
          console.log(response);
          
          this.categorias = response.data.categoria
        })
        .catch((error) =>{
          console.log(error.response);
        })
      },

      confirmarBorrado(){
        axios.delete('/categoria/id')//+id)
        .then(()=>{
          this.obtenerCategorias();
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

      deleteItem (action,item) {
        let id = item._id
        console.log(action);
        if(action==2){
          console.log(id);
          let me = this
          let header = {header:{"token":this.$store.state.token}};
          axios
            .put(`/categoria/desactivar/${id}`,{estado:0},header)
            //.put(`/categoria/desactivar/${id}`,header)
            .then(function(){me.obtenerCategorias();})
            .catch(function(error){console.log(error);console.log(id);})

        }else if(action==1){
          console.log(id);
          let me = this
          let header = {header:{"token":this.$store.state.token}};
          axios
            .put(`/categoria/activar/${id}`,{estado:1},header)
            //.put(`/categoria/activar/${id}`,header)
            .then(function(){me.obtenerCategorias();})
            .catch(function(error){console.log(error);})
        }
        //this.editedIndex = this.desserts.indexOf(item)
        //this.editedItem = Object.assign({}, item)
        //this.dialogDelete = true
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