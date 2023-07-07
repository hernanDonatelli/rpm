<template>
  <div>

    <v-app-bar app elevate-on-scroll color="dark" dark>
      <v-app-bar-nav-icon v-if="getUserActive()" @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase amber--text">
        <router-link v-if="getUserActive() === null" to="/">
          <span class="font-weight-black">RPM</span><span class="font-weight-light">RacingLeague</span>
        </router-link>
        <router-link v-else-if="!getUserActive().admin" to="/">
          <span class="font-weight-black">RPM</span><span class="font-weight-light">RacingLeague</span>
        </router-link>
        <router-link v-else to="/admin-dashboard">
          <span class="font-weight-black">RPM</span><span class="font-weight-light">Admin</span>
        </router-link>
      </v-toolbar-title>

      <v-img class="rpmlogo" src="@/assets/logorpm.png" max-height="600" max-width="248">

      </v-img>
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

    <v-navigation-drawer v-if="this.getUserActive()" class="pt-10" v-model="drawer" app temporary>
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
              <v-menu open-on-hover top offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Dropdown
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="torneo in this.getTorneos()" :key="torneo.id">
                    <v-list-item-title>
                      <router-link :to="`/campeonato/${torneo.name}`">{{ torneo.name }}</router-link>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
import { mapMutations, mapGetters, mapActions } from "vuex";

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
      torneos: [],
    };
  },
  created(){
    // this.getTokenApi();
    // this.getUserRPM();
    // this.getTorneosApi();
  },
  mounted() {
    this.getToken();
    this.getUser();
    this.getTorneos();
  },
  methods: {
    ...mapMutations(["logOutUser", "loadToken", "loadTorneos"]),
    ...mapGetters(["getUserActive", "getAdmin", "getCartUserActive","getUser", "getTorneos", "getToken"]),
    ...mapActions(["getTokenApi", "getUserRPM", "getTorneosApi"]),

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
.v-toolbar__content {
  position: relative;
}

.rpmlogo {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%, 0);
}

.theme--light.v-navigation-drawer {
  background-color: #272727;
}

.v-application a {
  font-family: Rubik;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: #FF5252;
}

.v-application a:hover {
  color: #ff8a80;
}

.v-list-item__icon i {
  color: #FF5252;
}

.v-application .deep-purple--text.text--accent-4 {
  color: #FF5252 !important;
  caret-color: #FF5252 !important;
}

.theme--dark.v-btn.v-btn--has-bg {
  background-color: #212121;
}

.theme--light.v-navigation-drawer .divider {
  color: #FF5252;
  border-color: #FF525285;
  width: 90%;
  margin: auto;
}

h3 {
  color: #FF5252;
}
</style>
