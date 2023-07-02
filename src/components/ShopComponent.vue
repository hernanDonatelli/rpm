<template>
  <div>
    <v-row class="text-left mt-5 d-flex flex-column align-center flex-md-row">
      <v-col xs="12" md="7" lg="8">
        <h1 class="shop-title text-left my-5">
          <span>Nuestros</span>Productos
        </h1>
        <v-divider class="mb-10 brown darken-1"></v-divider>
      </v-col>

      <!-- Buscadores -->
      <v-col xs="12" sm="9" md="5" lg="4">
        <!-- Buscador por nombre -->
        <div>
          <div id="inputSearch">
            <v-text-field v-model="buscado" placeholder="Buscar por nombre">
            </v-text-field>
            <v-icon class="searchIcon">mdi-magnify</v-icon>
          </div>
        </div>

        <!-- Slider precio -->
          <div id="rangeSearch" class="pb-0 my-5">
            <v-slider
              color="brown darken-1"
              track-color="brown darken-1"
              v-model="precio"
              thumb-label
              label="Precio"
              min="0"
              max="1500"
            >
            </v-slider>
          </div>

        <!-- Radio buttons -->
        <div id="checkSearch">
          <v-radio-group v-model="radioGroup" class="pl-3 mt-2">
              <v-row class="flex-row justify-center">
                <v-radio
                  class="mb-2 mx-2"
                  color="brown darken-1"
                  label="Todos"
                  value=""
                ></v-radio>
                <v-radio v-for="marca of findMarcas" :key="marca.id"
                  class="mb-2 mx-2"
                  color="brown darken-1"
                  :label="marca"
                  :value="marca"
                ></v-radio>
              </v-row>
          </v-radio-group>
        </div>

      </v-col>
    </v-row>
    <v-row>
      <card-component
        :producto="producto"
        v-for="(producto, index) in filterProducts"
        :key="index"
      />
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardComponent from "./CardComponent.vue";

export default {
  name: "ShopComponent",
  components: {
    CardComponent,
  },
  data() {
    return {
      buscado: "",
      radioLabel: ['Inti Zen', 'Chocolate Colonial', 'Cocoon'],
      radioGroup: '',
      precio: 0
    };
  },
  created() {
    this.getProductsAPI();
  },
  methods: {
    ...mapActions(["getProductsAPI"]),

  },
  computed: {
    ...mapGetters(["getProducts"]),

    filterProducts() {
      let filtered = this.getProducts.filter(
        (item) =>
          item.nombre.toLowerCase().includes(this.buscado.toLowerCase()) &&
          item.precio > this.precio &&
          item.marca.includes(this.radioGroup)
          );

      return filtered;
    },

    findMarcas(){
      const marcas = this.getProducts.map( producto => producto.marca);

      let result = marcas.filter((item,index)=>{
      return marcas.indexOf(item) === index;
      })

      return result;
    },
  },
};
</script>

<style scoped>

#shop {
  background-color: #fafafa;
}
hr {
  display: block;
  width: 15%;
  border: 1.5px solid black;
}
.shop-title,
.shop-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.shop-title span {
  font-weight: 200;
}
#inputSearch {
  position: relative;
}
.searchIcon {
  position: absolute;
  top: 23%;
  right: 0;
}

</style>