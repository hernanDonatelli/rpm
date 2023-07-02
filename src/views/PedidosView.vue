<template>
  <div id="pedidosView">
    <v-container class="pedidos-view">
       <h1 class="text-h4 text-uppercase text-center pedidos-title my-3">
         <span>Estado</span>Pedidos
       </h1>

       <v-divider class="mb-10 mt-5 brown darken-1 divider" />

       <pedidos-component />
    </v-container>
  </div>
</template>

<script>
import PedidosComponent from '@/components/PedidosComponent.vue';

export default {
  name: "PedidosView",
  components: {
    PedidosComponent
  }
};
</script>

<style scoped>
#pedidosView{
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
  background-size: cover;
}
.pedidos-view{
    padding-top: 5rem;
}
.pedidos-title,
.pedidos-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.pedidos-title span {
  font-weight: 200;
}
hr.divider{
    display: block;
    width: 15%;
    margin: 0 auto;
    border: 1.5px solid black;
}
</style>