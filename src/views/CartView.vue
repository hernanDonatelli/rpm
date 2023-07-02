<template id="cartTemplate">
  <div id="cartView">
    <v-container class="cartView">
      <h1 class="text-h4 text-uppercase text-center cart-title my-5">
        <span>Mi</span>Carrito
      </h1>

      <v-divider class="brown darken-1" />

      <cart-component />
    </v-container>
  </div>
</template>

<script>
import CartComponent from "@/components/CartComponent.vue";

export default {
  name: "CartView",
  components: {
    CartComponent,
  },
};
</script>

<style scoped>
#cartView{
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
  background-size: cover;
}
.cartView {
  margin-top: 56px;
}
.cart-title,
.cart-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.cart-title span {
  font-weight: 200;
}
hr {
  display: block;
  width: 10%;
  margin: 1rem auto 0.5rem;
  border: 1.5px solid black;
}
</style>