<template>
  <div id="shopView">
    <v-container class="shopView">

      <shop-component />

      </v-container>
  </div>
</template>

<script>
import ShopComponent from "@/components/ShopComponent.vue";

export default {
  name: "ShopView",
  components: {
    ShopComponent,

  }

};
</script>

<style scoped>
#shopView{
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
}
.shopView{
  padding-top: 56px;
}
</style>
