<template>
  <v-app>
     <v-container>
      <template>
  <v-data-table class="mx-auto mt-5 elevation-15" max-width="900"
    :headers="columnas"
    :items="usuarios"
    :search="search"
    sort-by="calories"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Usuarios</v-toolbar-title>
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
            <div>
            <h5 class="display-1 font-weight-medium">Nuevo Usuario</h5>
            </div>
        <v-form
            ref="form"
            lazy-validation
  >
        <v-col cols="12">
          <v-autocomplete
            v-model="editedItem.rol"
            :items="items"
            dense
            filled
            label="Seleccione Rol"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-text-field 
            v-model="editedItem.nombre" 
            :counter="30" 
            label="Nombre"
            required 
            prepend-icon="mdi-account-circle"
        ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="editedItem.email"
            label="E-mail"
            required
            prepend-icon="mdi-email"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="editedItem.password"
            label="Contraseña" 
            :type=" mostrarContraseña ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="mostrarContraseña =! mostrarContraseña"/>
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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
  export default {
    data: () => ({   
      items: ['ALMACENISTA_ROL', 'VENDEDOR_ROL', 'ADMIN_ROL'],
      value: null,
      mostrarContraseña:false,
      icons: ['pencil','check','block-helper','download'],
      drawer:false,
      search: '',
      dialog: false,
      dialogDelete: false,
      id:'',
      bd: 0,
      columnas: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Email', value: 'email' },
        { text: 'Rol', value: 'rol' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      usuarios: [
        {
        nombre:'',
        email:'',
        estado:'',
        password:'',
        rol:''},  
      ],
      editedIndex: -1,
      editedItem: {
        nombre:'',
        email:'',
        estado:'',
        password:'',
        rol:''
      },
      defaultItem: {
        nombre:'',
        email:'',
        estado:'',
        password:'',
        rol:''
      },
    }),
    created(){
      this.obtenerUsuarios();
    },
    methods: {
      obtenerUsuarios(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("usuario",header)
        .then(response =>{
          console.log(response.data);
          this.usuarios = response.data.usuarios
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
          axios.put(`usuario/desactivar/${id}`,
          {estado:0},
          header)
          .then(function(){
            me.obtenerUsuarios();
          })
          .catch(function(error){
            console.log(error);
          });
        }else if (accion==1){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`usuario/activar/${id}`,
          {estado:1},
          header)
          .then(function(){
            me.obtenerUsuarios();
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
          axios.post('usuario',{
            nombre:this.editedItem.nombre,
            email:this.editedItem.email,
            rol:this.editedItem.rol,
            password:this.editedItem.password
            },
            header
            )
            .then((response)=>{
              console.log(response);
              me.obtenerUsuarios(),
              this.limpiar
            })
            .catch((error)=>{
              console.log(error.response);
            })
        }else{
          console.log('estoy enviando'+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          axios.put(`usuario/${this.id}`,{
            nombre:this.editedItem.nombre,
            email:this.editedItem.email,
            rol:this.editedItem.rol,
            password:this.editedItem.password
            },
            header
            )
            .then((response)=>{
              console.log(response);
              me.obtenerUsuarios(),
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
        this.editedItem.rol='null',
        this.editedItem.nombre=''
        this.editedItem.email=''
        this.editedItem.password=''
      },

      crearPDF(){
        var columns =[
          {tittle:"Nombre",dataKey:"nombre"},
          {tittle:"E-mail",dataKey:"email"},
          {tittle:"Contraseña",dataKey:"password"},
          {tittle:"Rol",dataKey:"rol"},
          {tittle:"Estado",dataKey:"estado"},
        ];
        var rows=[];
        this.usuarios.map(function(x){
          rows.push({
            nombre: x.nombre,
            email: x.email,
            password: x.password,
            rol: x.rol,
            estado: x.estado
          });
        });
        var doc = new jsPDF("p","pt");
        doc.autoTable(columns, rows,{
          margin:{top:60},
          addPageContent:function(){
            doc.text("Lista de Usuarios",40,30);
          },
        });
        doc.save("Usuarios.pdf");
      }
    },
  }
</script>