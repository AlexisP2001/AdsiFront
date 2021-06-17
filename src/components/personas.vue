<template>
  <v-app>
     <v-container>
      <template>
  <v-data-table class="mx-auto mt-5 elevation-15" max-width="900"
    :headers="columnas"
    :items="personas"
    :search="search"
    sort-by="calories"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Personas</v-toolbar-title>
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
              to="/crearPersona"
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
            <v-card-title class="headline">¿Esta segudo de eliminar la persona?</v-card-title>
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
      <v-icon
        small
        class="mr-2"
        @click="activarItem(item)"
      >
        mdi-{{icons[1]}}
      </v-icon>
      <v-icon
        small
        @click="desactivarItem(item)"
      >
        mdi-{{icons[2]}}
      </v-icon>
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
        { text: 'Tipo', value: 'tipoPersona' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo Documento', value: 'tipoDocumento' },
        { text: 'Número Documento', value: 'numDocumento' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      personas: [
        {
        tipoPersona:'',
        nombre:'',
        tipoDocumento:'',
        numDocumento:'',
        direccion:'',
        telefono:'',
        email:''},  
      ],
      editedIndex: -1,
      editedItem: {
        tipoPersona:'',
        nombre:'',
        tipoDocumento:'',
        numDocumento:'',
        direccion:'',
        telefono:'',
        email:''
      },
      defaultItem: {
        tipoPersona:'',
        nombre:'',
        tipoDocumento:'',
        numDocumento:'',
        direccion:'',
        telefono:'',
        email:''
      },
    }),
    created(){
      this.obtenerPersonas();
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
      obtenerPersonas(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("personas",header)
        .then(response =>{
          console.log(response.data);
          this.personas = response.data.personas
        })
        .catch((error) =>{
          console.log(error.response);
        })
      },

      confirmarBorrado(){
        axios.delete('/compra/id')//+id)
        .then(()=>{
          this.obtenerVentas();
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