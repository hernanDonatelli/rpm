<template>
  <div id="productsView">
    <v-container class="products-view">
      <h1 class="text-h4 text-uppercase text-center registrados-title my-3">
        <span>Listado</span>Productos
      </h1>

      <v-divider class="brown darken-1 mb-5" />

      <create-products-component />

      <table-products-component class="table-view" />

    </v-container>
  </div>
</template>

<script>
import TableProductsComponent from "@/components/TableProductsComponent.vue";
import CreateProductsComponent from "@/components/CreateProductsComponent.vue";

export default {
  name: "TableUsersView",
  components: {
    TableProductsComponent,
    CreateProductsComponent
  }
};
</script>

<style scoped>
#productsView{
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
  background-size: cover;

}
.products-view{
  padding-top: 5rem;
  position: relative;
}
.table-view{
  margin-top: -5rem;
}
hr{
  display: block;
  width: 15%;
  margin: 0 auto 1rem;
  border: 1.5px solid black;
}
.registrados-title,
.registrados-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.registrados-title span {
  font-weight: 200;
}



</style>