<template>
  <v-app>
     <v-container>
      <template>
  <v-data-table class="mx-auto mt-5 elevation-15" max-width="900"
    :headers="columnas"
    :objetos="objetos"
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
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Añadir
            </v-btn>
          </template>
        <v-card width="500" class="mx-auto mt-9">
            <div>
            <h2 class="font-weight-medium">Nuevo Articulo</h2>
            </div>
        <v-form
            ref="form"
            lazy-validation
  >
        <v-col cols="12">
          <v-select
          :items="objetos"
          label="Categoria"
        ></v-select>
        </v-col>
        
        <v-col cols="12">
          <v-text-field
            v-model="editedItem.codigo"
            label="Codigo"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field 
            v-model="editedItem.nombre" 
            :counter="30" 
            label="Nombre"
            required 
        ></v-text-field>
        </v-col>     
        <v-col cols="12">
          <v-text-field 
            v-model="editedItem.descripcion"
            label="Descripción"
            required
        ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field 
            v-model="editedItem.precio"
            label="Precio"
            required
        ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field 
            v-model="editedItem.stock"
            label="Stock"
            required
        ></v-text-field>
        </v-col>

    

        <v-card-actions>
        <v-btn color="success" class="mr-4" @click="guardar()" >Guardar</v-btn>
        <v-btn color="info" @click="reset"> Limpiar</v-btn>
        <v-btn color="error" @click="dialog=false"> Cancelar</v-btn>

    </v-card-actions>

  </v-form>
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
      bd:0,
      dialog: false,
      dialogDelete: false,
      columnas: [
        { text: 'Categoria', value: 'categoria' },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Precio', value: 'precioventa' },
        { text: 'Stock', value: 'stock' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      // categorias:[
      //   categoria=''
      // ],
      objetos:[
      {
        nombre:''
      }],
      articulos: [
        {
        categoria:'',
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
      this.listarCategorias();
    },
    methods: {
      listarCategorias(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("categoria",header)
        .then(response =>{
          console.log(response.data.categoria.nombre);
          this.articulos.categoria = response.data.categoria.nombre
        })
        .catch((error) =>{
          console.log(error.response);
        })
      },
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

      guardar(){
        if (this.bd == 0 ){
          console.log('estoy guardando'+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          axios.post('articulo',{
            nombre:this.editedItem.nombre,
            precioventa:this.editedItem.precioventa,
            codigo:this.editedItem.codigo,
            stock:this.editedItem.stock,
            descripcion:this.editedItem.descripcion
            },
            header
            )
            .then((response)=>{
              console.log(response);
              me.obtenerArticulos(),
              this.limpiar
            })
            .catch((error)=>{
              console.log(error.response);
            })
        }else{
          console.log('estoy enviando'+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          axios.put(`articulo/${this.id}`,{
            nombre:this.editedItem.nombre,
            precioventa:this.editedItem.precioventa,
            codigo:this.editedItem.codigo,
            stock:this.editedItem.stock,
            descripcion:this.editedItem.descripcion
            },
            header
            )
            .then((response)=>{
              console.log(response);
              me.obtenerArticulos(),
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
        this.editedItem.precioventa=item.precioventa
        this.editedItem.descripcion=item.descripcion
        this.editedItem.codigo=item.codigo
        this.editedItem.stock=item.stock
        this.dialog=true;
      },
      reset(){
        this.editedItem.codigo='',
        this.editedItem.nombre=''
        this.editedItem.precioventa=''
        this.editedItem.stock=''
        this.editedItem.descripcion=''
      },
    },
  }
</script>