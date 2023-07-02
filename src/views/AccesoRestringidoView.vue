<template>
  <div id="homeRestringed">
    <v-container class="restringed-view">
      <v-row>
        <v-col xs="10" sm="9" md="8" lg="6" class="mx-auto">
            <v-alert class="my-3 text-center"
              dense
              outlined
              type="error"
            >
              No tienes permisos para acceder a la sección solicitada!
            </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col xs="10" sm="9" md="8" lg="6" class="mx-auto">
          <h1 class="text-h4 text-uppercase text-center title mb-3">Login</h1>

          <v-divider class="mb-10 brown darken-1" />

          <login-component class="login-component"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "AccesoRestringidoView.vue",
  components: {
    LoginComponent,
  },
};
</script>

<style scoped>
#homeRestringed {
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
  background-size: cover;
}
.title {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.restringed-view{
  padding-top: 5rem;
}
.login-component{
  margin-top: -2rem;
}
</style>