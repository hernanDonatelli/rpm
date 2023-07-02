<template>
  <div>
    <v-app-bar absolute shaped color="brown darken-3" dark>
      <v-app-bar-nav-icon v-if="getUserActive()" @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase amber--text">
        <router-link v-if="getUserActive() === null" to="/">
          <span class="font-weight-light">Tienda</span><span class="font-weight-black">Gourmet</span>
        </router-link>
        <router-link v-else-if="!getUserActive().admin" to="/">
          <span class="font-weight-light">Tienda</span><span class="font-weight-black">Gourmet</span>
        </router-link>
        <router-link v-else to="/admin-dashboard">
          <span class="font-weight-light">Admin</span><span class="font-weight-black">Board</span>
        </router-link>
      </v-toolbar-title>

        <v-spacer></v-spacer>

      <div v-if="!getUserActive()">
        <v-row>
          <v-btn to="/login" text small color="info" class="mr-2 px-0"><span
              class="white--text font-weight-regular">Ingresa</span></v-btn>
          <v-btn to="/register" text small color="blue-grey darken-3" class="px-0 pr-3"><span
              class="white--text font-weight-regular">Registrate</span></v-btn>
        </v-row>
      </div>

      <user-component />
    </v-app-bar>

    <v-navigation-drawer v-if="this.getUserActive()" class="pt-10" v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <div v-if="!this.getAdmin()">

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/">Home</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-store</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/shop">Productos</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cart-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/myCart">
                  Cart (<span>{{ this.getCartUserActive().length }}</span>)
                </router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-badge-account-horizontal-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/mi-cuenta">Mi Cuenta</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/" @click.native="logOut">Logout</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-divider class="divider my-10" />
          </div>

          <!-- Seccion Administradores -->
          <div v-else>
            <h3 class="pl-3 mb-3">Administradores</h3>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-store</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/admin-productos">Productos</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/admin-usuarios">Usuarios</router-link>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-truck-delivery</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <router-link to="/admin-pedidos">Pedidos</router-link>
              </v-list-item-title>
            </v-list-item>

          </div>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import UserComponent from "./UserComponent.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "NavbarComponent",
  components: {
    UserComponent,
  },
  props: {
    to: String
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    ...mapMutations(["logOutUser"]),
    ...mapGetters(["getUserActive", "getAdmin", "getCartUserActive"]),

    logOut() {
      this.logOutUser();
      localStorage.clear();
      this.$router.push("/");
    },
  },
  computed: {

  }
};
</script>

<style scoped>
.theme--light.v-navigation-drawer {
  background-color: #4E342E;
}

.v-application a {
  font-family: Rubik;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: #ffb300;
}

.v-list-item__icon i {
  color: #ffb300;
}

.v-application .deep-purple--text.text--accent-4 {
  color: #ffb300 !important;
  caret-color: #ffb300 !important;
}

.theme--dark.v-btn.v-btn--has-bg {
  background-color: #6d4c41;
}

.theme--light.v-navigation-drawer .divider {
  color: #ffb300;
  border-color: rgba(255, 179, 0, 0.4);
  width: 90%;
  margin: auto;
}

h3 {
  color: #ffb300;
}
</style>
