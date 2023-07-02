import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userActive: {
      admin: null,
      apellido: null,
      email: null,
      id: null,
      nombre: null,
      password: null,
      registrado: null,
      cantidad: null,
      userCart: []
    },
    usersRegistered: [],
    productos: [],
    pedidos: []
  },
  getters: {
    getUserActive(state){
      return state.userActive;
    },
    getCartUserActive(state){
      return state.userActive.userCart;
    },
    getProducts(state){
      state.productos.sort((a, b) => a.id - b.id);
      return state.productos;
    },
    getAdmin(state){
      return state.userActive.admin;
    },
    getRegistered(state){
      return state.usersRegistered;
    },
    getPedidosStore(state) {
      return state.pedidos;
    }
  },
  mutations: {
    modifiedUserActive(state, newUserState){
      state.userActive = newUserState;
    },
    logOutUser(state){
      state.userActive = null;
    },
    loadUsers(state, usersAPI){
      state.usersRegistered = usersAPI;
    },
    getProductsMutation(state, productsByApi){
      state.productos = productsByApi;
    },
    addCartUserMutation(state, newProduct){
      state.userActive.userCart.push(newProduct);
    },
    emptyCartStore(state){
      state.userActive.userCart = [];
      const storage = JSON.parse(localStorage.getItem('userLoged'));
      storage.userCart = [];
      localStorage.setItem('userLoged', JSON.stringify(storage));
    },
    deleteItemMutation(state, Id){
      state.userActive.userCart.splice(Id, 1);
    },
    addPedidosMutation(state, newPedido){
      state.pedidos = newPedido;
    },
    modifiedStateAdmin(state, editUser){
      state.usersRegistered = editUser;
    }

  },
  actions: {
    getUsersAPI: async ({commit}) =>{
      const usersAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/usuarios');
      const usersResponse = await usersAPI.json();

      commit('loadUsers', usersResponse);
    },
    getProductsAPI: async ({commit}) => {
      const productsAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/productos');
      const response = await productsAPI.json();

      commit('getProductsMutation', response);
    },
    getPedidosAPI: async ({commit}) => {
      const pedidosAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/carts');
      const allPedidos = await pedidosAPI.json();

      commit('addPedidosMutation', allPedidos);
    },
    getUsersModified: async ({commit, state}) => {
      const usersAPI = await fetch(`https://639c6ec816d1763ab149a523.mockapi.io/usuarios/${state.userActive.id}`);
      const usersResponse = await usersAPI.json();

      commit('modifiedUserActive', usersResponse);
    },

  }
})
