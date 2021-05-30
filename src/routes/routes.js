import compras from '../components/compras.vue';
import ventas from '../components/ventas.vue';
import articulos from '../components/articulos.vue';
import login from '../components/login.vue';
import categorias from '../components/categorias.vue';
import personas from '../components/personas.vue';
import usuarios from '../components/usuarios.vue';
import registrarse from '../components/registrarse.vue';
import crearArticulos from '../components/crearArticulos.vue';
import eliminarArticulos from '../components/eliminarArticulos.vue';
import editarArticulos from '../components/editarArticulos.vue';


export const routes = [
    {path:'/compras',component: compras},
    {path:'/ventas',component: ventas},
    {path:'/articulos',component:articulos},
    {path:'/login',component: login},
    {path:'/categorias',component: categorias},
    {path:'/personas',component: personas},
    {path:'/registrarse',component: registrarse},
    {path:'/usuarios',component: usuarios},
    {path:'/crearArticulo',component: crearArticulos},
    {path:'/editar',component: editarArticulos},
    {path:'/eliminar',component: eliminarArticulos}
]