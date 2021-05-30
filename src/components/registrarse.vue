<template>
<v-app>
        <v-app-bar app color="#17A589">
            <v-toolbar-title>Registro</v-toolbar-title>
        </v-app-bar>
    <v-content>
        <v-card width="500" class="mx-auto mt-9">
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-col cols="12">
          <v-autocomplete
            v-model="rol"
            :items="items"
            dense
            filled
            label="Seleccione Rol"
          ></v-autocomplete>
    </v-col>

    <v-col cols="12">
    <v-text-field 
    v-model="name" 
    :counter="10" 
    :rules="nameRules" 
    label="Nombre"
    required 
    prepend-icon="mdi-account-circle"
    ></v-text-field>
    </v-col>

    <v-col cols="12">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      prepend-icon="mdi-email"
    ></v-text-field>
    </v-col>

    <v-col cols="12">
            <v-text-field v-model="password"
                label="Contraseña" 
                :type=" mostrarContraseña ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="mostrarContraseña ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mostrarContraseña =! mostrarContraseña"/>
    </v-col>

    

    <v-card-actions>
    <v-btn color="success" class="mr-4" @click="reset" >Registrarse</v-btn>
    <v-btn color="error" @click="resetValidation" to="/login"> Cancelar</v-btn>

    </v-card-actions>

  </v-form>
        </v-card>
    </v-content>
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
      <v-card-title dark>
        <strong class="subheading"></strong>

        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Proyecto</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
</v-app> 
</template>


<script>
  export default {
    data() {
        return {
            items: ['Administrador', 'Vendedor', 'Almacenista'],
            value: null,
            mostrarContraseña:false,
            password:""
        }
    },
    methods:{
      
    }
}
</script>