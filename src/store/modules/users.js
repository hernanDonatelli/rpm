export default{
  //namespaced me permite darle un alias a este modulo en el store
  //si hay otro modulo que tengan los mismos nombres se diferencian entre si
  namespaced: true,
  state: {
    usersRegistered: []
  },
  getters: {
    getUsersRegistered(state){
      return state.usersRegistered;
    }
  },
  mutations: {
    loadUsers(state, usersAPI) {
      state.usersRegistered = usersAPI;
    },
  },
  actions: {
    getUsersAPI: async ({ commit }) => {
      const usersAPI = await fetch('https://639c6ec816d1763ab149a523.mockapi.io/usuarios');
      const usersResponse = await usersAPI.json();

      commit('loadUsers', usersResponse);
    },
  }
}