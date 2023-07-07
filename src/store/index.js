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
    pedidos: [],
    token: null,
    user: {},
    torneos: [],
    calendario: null
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getUser(state){
      return state.user;
    },
    getTorneos(state){
      return state.torneos;
    },
    getCalendario(state){
      return state.calendario;
    },
    getUserActive(state) {
      return state.userActive;
    },
    getCartUserActive(state) {
      return state.userActive.userCart;
    },
    getProducts(state) {
      state.productos.sort((a, b) => a.id - b.id);
      return state.productos;
    },
    getAdmin(state) {
      return state.userActive.admin;
    },
    getRegistered(state) {
      return state.usersRegistered;
    },
    getPedidosStore(state) {
      return state.pedidos;
    }
  },
  mutations: {
    loadToken(state, token){
      //Guardado de token en localStorage
      localStorage.setItem("token", JSON.stringify(token));
      //JSON.parse(localStorage.getItem("token"));

      state.token = token;
    },
    loadUser(state, user){
      state.user = user;
    },
    loadTorneos(state, torneos){
      state.torneos = torneos;
    },
    loadCalendar(state, respuesta){
      state.calendario = respuesta;
    },
    modifiedUserActive(state, newUserState) {
      state.userActive = newUserState;
    },
    logOutUser(state) {
      state.userActive = null;
    },
    loadUsers(state, usersAPI) {
      state.usersRegistered = usersAPI;
    },
    getProductsMutation(state, productsByApi) {
      state.productos = productsByApi;
    },
    addCartUserMutation(state, newProduct) {
      state.userActive.userCart.push(newProduct);
    },
    emptyCartStore(state) {
      state.userActive.userCart = [];
      const storage = JSON.parse(localStorage.getItem('userLoged'));
      storage.userCart = [];
      localStorage.setItem('userLoged', JSON.stringify(storage));
    },
    deleteItemMutation(state, Id) {
      state.userActive.userCart.splice(Id, 1);
    },
    addPedidosMutation(state, newPedido) {
      state.pedidos = newPedido;
    },
    modifiedStateAdmin(state, editUser) {
      state.usersRegistered = editUser;
    }

  },
  actions: {
    getTokenApi: async ({ commit }) => {
      const optionsCalendar = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: '{"email":"organizacionrpm@gmail.com","password":"Mr*Charles-2023"}',
      };

      const fetchCalendar = await fetch(
        "https://rpm.studioatlantic.com.ar/pezls/public/api/v1/login",
        optionsCalendar
      );
      const response = await fetchCalendar.json();
      const token = response.token;

      commit('loadToken', token);

    },

    //Llamada de usuario con token valido
    getUserRPM: async ({commit, state}) => {

        const optionsGetUser = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: `{"token": "${state.token}"}`,
        };

        const fetchGetUser = await fetch(
          "https://rpm.studioatlantic.com.ar/pezls/public/api/v1/get-user",
          optionsGetUser
        );
        const response = await fetchGetUser.json();
        const respuesta = response;
        console.log(respuesta);

        commit('loadUser', respuesta.user)


    },

    //Funcion para crear tablas de calendarios
    getCalendarioApi: async ({commit, state}) => {
      const optionsCrearTablasCalendario = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: `{"idTorneo": "3"}`,
      };

      const fetchGetCalendario = await fetch(
        "https://rpm.studioatlantic.com.ar/pezls/public/api/v1/getCalendario",
        optionsCrearTablasCalendario
      );
      const response = await fetchGetCalendario.json();

      const calendarioTorneos = response.data;

      calendarioTorneos.sort((a, b) => a.order - b.order);

      commit('loadCalendar', calendarioTorneos)


      // //Titulos de Torneos
      // let containerCalendar = document.getElementById("calendar-container");

      // //Creacion de tablas-calendario de cada torneo existente
      // let tablasCalendario = document.createElement("table");
      // tablasCalendario.setAttribute("id", `torneo-${idTorneo}`);
      // tablasCalendario.innerHTML = `<thead>
      //                               <tr>
      //                                   <th scope="col">Orden</th>
      //                                   <th scope="col">Circuito</th>
      //                                   <th scope="col">Fecha</th>
      //                                   <th scope="col">Resultados</th>
      //                               </tr>
      //                           </thead>`;
      // containerCalendar.append(tablasCalendario);

      // //Fechas de cada calendario
      // const body = document.createElement("tbody");
      // let nombres = [];

      // calendarioTorneos.map((fecha) => {
      //   body.innerHTML += `<tr>
      //                     <td>${fecha.order}</td>
      //                     <td id="${fecha.circuit}">${fecha.circuit}</td>
      //                     <td>${fecha.date}</td>
      //                     <td>
      //                       <a href="#" id="link-${idTorneo}-${fecha.order}">Link Fecha <span id="order-${idTorneo}-${fecha.order}">${fecha.order}</span></a>
      //                     </td>
      //                   </tr>`;
      //   tablasCalendario.append(body);

      //   nombres.push(document.getElementById(`${fecha.circuit}`));
      // });

      // const tablas = document.getElementById(`torneo-${idTorneo}`);
      // let order;

      // tablas.addEventListener("click", (e) => {

      //   e.preventDefault();
      //   order =
      //     parseInt(e.target.firstElementChild.innerHTML) ||
      //     parseInt(e.target.lastChild.innerHTML);

      //   if (e.target && e.target.nodeName === "A") {

      //     order = parseInt(e.target.lastChild.innerHTML);
      //     nombreCircuit = nombres[order - 1].innerHTML;

      //     getResult(idTorneo, order, nombreCircuit);
      //   }
      // });

    },

    //Funcion para traer los torneos de la API
    getTorneosApi: async ({ commit, state }) => {
      const optionsGetTorneos = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        }
      };

      const fetchGetTorneos = await fetch(
        "https://rpm.studioatlantic.com.ar/pezls/public/api/v1/mostrarTorneos",
        optionsGetTorneos
      );
      const response = await fetchGetTorneos.json();

      const allTorneos = response;
      console.log(allTorneos);

      // allTorneos.sort((a, b) => a.order - b.order);

      commit('loadTorneos', allTorneos)

    },

    ////////////////////////////////////////////////////////////////////////

    getUsersAPI: async ({ commit }) => {
      const usersAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/usuarios');
      const usersResponse = await usersAPI.json();

      commit('loadUsers', usersResponse);
    },
    getProductsAPI: async ({ commit }) => {
      const productsAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/productos');
      const response = await productsAPI.json();

      commit('getProductsMutation', response);
    },
    getPedidosAPI: async ({ commit }) => {
      const pedidosAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/carts');
      const allPedidos = await pedidosAPI.json();

      commit('addPedidosMutation', allPedidos);
    },
    getUsersModified: async ({ commit, state }) => {
      const usersAPI = await fetch(`https://639c6ec816d1763ab149a523.mockapi.io/usuarios/${state.userActive.id}`);
      const usersResponse = await usersAPI.json();

      commit('modifiedUserActive', usersResponse);
    },

  }
})
