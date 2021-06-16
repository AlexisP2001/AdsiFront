import compras from '../components/compras.vue';
import crearCompra from '../components/crearCompra.vue';
import ventas from '../components/ventas.vue';
import crearVenta from '../components/crearVenta.vue';
import articulos from '../components/articulos.vue';
import crearArticulos from '../components/crearArticulos.vue';
import login from '../components/login.vue';
import categorias from '../components/categorias.vue';
import crearCategoria from '../components/crearCategoria.vue'
import usuarios from '../components/usuarios.vue';
import crearUsuario from '../components/crearUsuario.vue'
import personas from '../components/personas.vue';
import crearPersona from '../components/crearPersona.vue'
import registrarse from '../components/registrarse.vue';

export const routes = [
    {path:'/compra',component: compras},
    {path:'/crearCompra',component: crearCompra},
    {path:'/venta',component: ventas},
    {path:'/crearVenta',component: crearVenta},
    {path:'/articulo',component:articulos},
    {path:'/crearArticulo',component: crearArticulos},
    {path:'/categoria',component: categorias},
    {path:'/crearCategoria',component: crearCategoria},
    {path:'/usuario',component: usuarios},
    {path:'/crearUsuario',component: crearUsuario},
    {path:'/persona',component: personas},
    {path:'/crearPersona',component: crearPersona},
    {path:'/registrarse',component: registrarse},
    {path:'/login',component: login},
]