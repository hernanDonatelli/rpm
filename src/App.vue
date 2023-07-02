<template>
  <v-app>
    <navbar-component />

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    NavbarComponent,
  },

  data: () => {
    return {
      tab: null,
    };
  },
  mounted() {
    this.modifiedUserActive(JSON.parse(localStorage.getItem('userLoged')));

  },
  methods: {
    ...mapMutations(['modifiedUserActive']),
    ...mapGetters(['getUserActive', 'getItemsCart'])
  },
};
</script>

<style scoped>

</style>
