<template>
  <div id="loginView">
    <v-container class="loginView">
      <v-row class="d-flex align-center row-container">
        <v-col class="col-10 col-sm-8 col-md-5 col-lg-6 col-xl-4 mx-auto mt-10 ma-md-0 pa-0 pa-md-0">
          <h1 class="text-h4 text-uppercase text-center title mb-3">Ingresar</h1>

          <v-divider class="mb-10 brown darken-1 divider" />

          <p class="text-center text-body-2 px-15">Si ya tenés tu usuario y contraseña generados podrás entrar al sistema y comenzar a disfrutar de las mejores marcas y productos naturales del mercado. Bienvenido!</p>

        </v-col>

        <v-col class="col-10 col-sm-8 col-md-6 col-lg-5 mx-auto">
          <login-component />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "LoginView.vue",
  components: {
    LoginComponent,
  },
};
</script>

<style scoped>
#loginView{
  height: 100vh;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
}
.loginView{
  height: 100%;
}
.title {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
  padding-top: 3rem;
}
hr{
  display: block;
    width: 15%;
    margin: 0 auto;
    border: 1.5px solid black;
}
.row-container{
  height: 100%;
}

@media screen and (min-width: 959.98px){
  .title{
    padding: 0;
  }
}

@media screen and (min-width: 1259.98px){
  #loginView{
    padding-top: 3rem;
  }

}

</style>