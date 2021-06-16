<template>
    <v-app>
        <!-- <v-app-bar app color="#17A589">
            <v-toolbar-title>Ingreso</v-toolbar-title>
        </v-app-bar> -->
        <v-main>
            <v-card width="500" class="mx-auto mt-9">
                <v-card-title>Ingreso de Usuario</v-card-title>
                <v-card-text>
                    <v-text-field v-model="email" 
                    class="form-input"
                    label="Usuario" 
                    required
                    prepend-icon="mdi-account-circle"/>


                    <v-text-field v-model="pass"
                    class="form-input"
                    required
                    placeholder="Contraseña" 
                    :type=" mostrarContraseña ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    :append-icon="mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="mostrarContraseña =! mostrarContraseña"/>
                </v-card-text>
                <div v-if="mensajeError==true" class="flex red--text"> Usuario/Contraseña invalido </div>
                
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn to="/registrarse" color="success">Registrarse</v-btn>
                    <v-btn  @click="login()" color="info">Ingresar</v-btn>
                </v-card-actions>
            </v-card>
        </v-main>
        <template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title color="#17A589primary">
        <strong class="subheading"></strong>

        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text color="#17A589primary" class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Proyecto</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
    </v-app>
</template>
<script>

import axios from "axios"

export default {
    data() {
        return {
            mostrarContraseña:false,
            email:"",
            pass:"",
            mensajeError:false
        }
    },
    methods:{
      login(){
      axios.post("usuario/login",{email:this.email, password:this.pass})
      .then(response =>{
        this.$store.dispatch("setToken", response.data.token);
        this.$router.push("/venta");
        console.log('token' + response.data.token);
        return console.log(response);
      }).catch((error)=>{
        this.mensajeError=true
        console.log(error.response.data.msg);
      })
      } 
      
    }
}
</script>