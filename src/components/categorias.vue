<template>
  <v-app>
     <v-container>
      <template>
  <v-data-table class="mx-auto mt-5 elevation-15" max-width="900"
    :headers="columnas"
    :items="categorias"
    :search="search"
    sort-by="calories"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Categorias</v-toolbar-title>
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
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Añadir
            </v-btn>
            <v-icon
                medium
                class="mr-4"
                @click="crearPDF()"
              >
                 mdi-{{icons[3]}}
              </v-icon>
          </template>
        <v-card width="500" class="mx-auto mt-9">
  <v-card-text>
    <v-text-field
      v-model="editedItem.nombre"
      :counter="20"
      label="Nombre"
      required
    ></v-text-field>
    <v-text-field
      v-model="editedItem.descripcion"
      label="Descripcion"
      required
    ></v-text-field>
    <v-btn
      color="success"
      class="mr-4"
      @click="guardar"
    >
      Guardar
    </v-btn>
    <v-btn 
    color="info"
    class="mr-4"
    @click="reset">
      Limpiar
    </v-btn>

    <v-btn 
    color="error"
    class="mr-4"
    @click="dialog=false">
      Cancelar
    </v-btn>
  </v-card-text>    
</v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  <template v-slot:[`item.actions`]="{ item }">
          <v-icon
        small
        class="mr-2"
        @click="editar(item)"
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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
  export default {
    data: () => ({      
      icons: ['pencil','check','block-helper','download'],
      drawer:false,
      search: '',
      bd:0,
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

      activarDesactivarItem (accion , item) {
        let id = item._id;
        console.log(accion);
        if(accion == 2){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`categoria/desactivar/${id}`,
          {estado:0},
          header)
          .then(function(){
            me.obtenerCategorias();
          })
          .catch(function(error){
            console.log(error);
          });
        }else if (accion==1){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`categoria/activar/${id}`,
          {estado:1},
          header)
          .then(function(){
            me.obtenerCategorias();
          })
          .catch(function(error){
            console.log(error);
          });
        }
      },

      guardar(){
        if (this.bd == 0 ){
          console.log('estoy guardando'+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          axios.post('categoria',{
            nombre:this.editedItem.nombre,
            descripcion:this.editedItem.descripcion,
            },
            header
            )
            .then((response)=>{
              console.log(response);
              me.obtenerCategorias(),
              this.limpiar
            })
            .catch((error)=>{
              console.log(error.response);
            })
        }else{
          console.log('estoy enviando'+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          axios.put(`categoria/${this.id}`,{
            nombre:this.editedItem.nombre,
            descripcion:this.editedItem.descripcion,
            },
            header
            )
            .then((response)=>{
              console.log(response);
              me.obtenerCategorias(),
              this.limpiar
            })
            .catch((error)=>{
              console.log(error.response);
            })
        }
      },
      editar(item){
        console.log(item);
        this.bd = 1;
        this.id= item._id;
        this.editedItem.nombre=item.nombre;
        this.editedItem.email=item.email
        this.editedItem.rol=item.rol
        this.dialog=true;
      },
      reset(){
        this.editedItem.nombre=''
        this.editedItem.descripcion=''
      },
      crearPDF(){
        var columns =[
          {tittle:"Nombre",dataKey:"nombre"},
          {tittle:"Descripcion",dataKey:"descripcion"},
          {tittle:"Estado",dataKey:"estado"},
        ];
        var rows=[];
        this.categorias.map(function(x){
          rows.push({
            nombre: x.nombre,
            descripcion: x.descripcion,
            estado: x.estado
          });
        });
        var doc = new jsPDF("p","pt");
        doc.autoTable(columns, rows,{
          margin:{top:60},
          addPageContent:function(){
            doc.text("Lista de Categorias",40,30);
          },
        });
        doc.save("Categorias.pdf");
      }
    },
  }
</script>