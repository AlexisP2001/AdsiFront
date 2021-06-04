import compras from '../components/compras.vue';
import ventas from '../components/ventas.vue';
import articulos from '../components/articulos.vue';
import login from '../components/login.vue';
import categorias from '../components/categorias.vue';
import personas from '../components/personas.vue';
import usuarios from '../components/usuarios.vue';
import registrarse from '../components/registrarse.vue';
import crearArticulos from '../components/crearArticulos.vue';
import crearCategoria from '../components/crearCategoria.vue'

export const routes = [
    {path:'/compra',component: compras},
    {path:'/venta',component: ventas},
    {path:'/articulo',component:articulos},
    {path:'/login',component: login},
    {path:'/categoria',component: categorias},
    {path:'/crearCategoria',component: crearCategoria},
    {path:'/persona',component: personas},
    {path:'/registrarse',component: registrarse},
    {path:'/usuario',component: usuarios},
    {path:'/crearArticulo',component: crearArticulos},
]