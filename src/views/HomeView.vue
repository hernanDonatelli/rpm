<template>
  <div id="home">
    <v-container class="contenedor">
      <v-row class="intro d-flex justify-center align-content-center">
        <v-col xs="10" md="8">
          <h1 class="homeTitle text-center"><span>Tienda Online</span> de Productos Gourmet, Naturales y Saludables</h1>

          <v-stepper value="3" class="stepHeader my-10">
            <v-stepper-header>
              <v-stepper-step color="success" step="1" complete>
                <span class="stepText">Registrate</span>
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step color="success" step="2" complete>
                <span class="stepText">Llena tu Carrito</span>
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step color="success" step="3" complete>
                <span class="stepText">Recibe tu pedido!</span>
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>

          <p class="text-center white--text pIntro mt-5">Registrate y vas a poder acceder a los mejores productos
            gourmet del mercado, de marcas consolidadas, directamente a tu domicilio!</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "HomeView",

};
</script>

<style scoped>
#home {
  height: 100vh;
  background-image: url(@/assets/hero.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.contenedor {
  height: 100%;
}

.intro {
  height: 100%;
  max-width: 90%;
  margin: 0 auto;
}

.homeTitle {
  font-family: Roboto;
  color: white;
  font-weight: 200;
  line-height: .9;
  font-size: 3rem;
}

.homeTitle span {
  color: #FFB300;
  font-weight: 900;
}

.stepHeader {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: unset !important;
}

.stepText {
  color: white;
}

.theme--light.v-stepper .v-stepper__header .v-divider {
  border-color: rgba(255, 255, 255, .5);
}

.pIntro {
  font-size: .9rem;
  font-weight: 400;
}

@media screen and (max-width: 599.98px) {
  .homeTitle {
    font-size: 2rem;
  }

  .stepHeader {
    display: none;
  }
}

@media screen and (min-width: 599.98px) {
  .stepHeader {
    display: none;
  }
}

@media screen and (min-width: 991.98px) {
  .stepHeader {
    display: block;
  }

  .pIntro {
    font-size: .95rem;
    font-weight: 300;
  }
}
</style>