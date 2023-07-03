<template>
  <div id="home">
    <v-container class="contenedor p-0">
      <home-component />
    </v-container>
  </div>
</template>

<script>
import HomeComponent from "@/components/HomeComponent.vue";

export default {
  name: "HomeView",
  components: {
    HomeComponent
  }

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

.container{
  min-width: 100%;
  padding: 0;
}
.contenedor {
  height: 100vh;
  width: 100%;
  position: relative;
  margin-left: 0;
  margin-right: 0;
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