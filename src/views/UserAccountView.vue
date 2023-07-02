<template>
  <div id="miCuenta">
    <v-container class="miCuenta">
      <h1 class="text-h4 text-uppercase text-center cuenta-title my-5">
        <span>Mi</span>Cuenta
      </h1>

      <v-divider class="brown darken-1" />

      <user-account-component />
    </v-container>
  </div>
</template>

<script>
import UserAccountComponent from "@/components/UserAccountComponent.vue";

export default {
  name: "UserAccountView.vue",
  components: {
    UserAccountComponent,
  },
};
</script>

<style scoped>
#miCuenta {
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #f7f7f7 10px
    ),
    repeating-linear-gradient(#ffffff55, #ffffff);
  background-size: cover;
}
.miCuenta {
  padding-top: 5rem;
}
.cuenta-title,
.cuenta-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.cuenta-title span {
  font-weight: 200;
}
hr {
  display: block;
  width: 10%;
  margin: 1rem auto 0.5rem;
  border: 1.5px solid black;
}
</style>