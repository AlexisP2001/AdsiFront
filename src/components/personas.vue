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
        { text: 'Tipo', value: 'tipoPersona' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Tipo Documento', value: 'tipoDocumento' },
        { text: 'Número Documento', value: 'numDocumento' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Email', value: 'email' },
        { text: 'Estado', value: 'estado' },
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
        estado:'',
        email:''},  
      ],
      editedIndex: -1,
      editedItem: {
        tipoPersona:'',
        nombre:'',
        tipoDocumento:'',
        numDocumento:'',
        direccion:'',
        estado:'',
        telefono:'',
        email:''
      },
      defaultItem: {
        tipoPersona:'',
        nombre:'',
        tipoDocumento:'',
        numDocumento:'',
        direccion:'',
        estado:'',
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
       activarDesactivarItem (accion , item) {
        let id = item._id;
        console.log(accion);
        if(accion == 2){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`personas/desactivar/${id}`,
          {estado:0},
          header)
          .then(function(){
            me.obtenerPersonas();
          })
          .catch(function(error){
            console.log(error);
          });
        }else if (accion==1){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`personas/activar/${id}`,
          {estado:1},
          header)
          .then(function(){
            me.obtenerPersonas();
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