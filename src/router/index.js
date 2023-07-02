import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/shop',
    name: 'La Tienda',
    component: () => import('../views/ShopView.vue')
  },
  {
    path: '/myCart',
    name: 'Mi Carrito',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Registro',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/mi-cuenta',
    name: 'Mi Cuenta',
    component: () => import('../views/UserAccountView.vue')
  },
  {
    path: '/acceso-denegado',
    name: 'Acceso Denegado',
    component: () => import('../views/AccesoRestringidoView.vue')
  },
  {
    path: '/producto/:id',
    name: 'Producto',
    component: () => import('../views/ShopView.vue')
  },
  {
    path: '/admin-dashboard',
    name: 'Dashboard',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin-usuarios',
    name: 'Admin Usuarios',
    component: () => import('../views/TableUsersView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/admin-productos',
    name: 'Admin Productos',
    component: () => import('../views/TableProductsView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/admin-pedidos',
    name: 'Admin Pedidos',
    component: () => import('../views/PedidosView.vue'),
    meta: {requiresAuth: true}
  },
   {
    path: '*',
    name: 'Error 404',
    component: () => import('../views/404View.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if(to.matched.some(route => route.meta.requiresAuth)){
    if (!store.state.userActive){
      next('/login');
    }else{
      if (JSON.parse(localStorage.userLoged).admin){
        document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
        next();
      }else{
        store.state.userActive = null;
        localStorage.clear();
        next('/acceso-denegado');
      }
    }
  }else{
    document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
    next();
  }
})

export default router
