<template>
  <v-col md="4" lg="3" xl="2">
    <v-card class="card-product mx-auto my-5" max-width="300" shaped>
      <router-link class="link-product" :to="`/producto/${producto.id}`">
        <v-img height="180" :src="producto.img">

          <!-- Modal Info Producto -->
          <v-dialog id="productDialog" v-model="dialog" :width="$vuetify.breakpoint.xs ? '100vw' : '55vw'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-2 mt-1" color="amber darken-1" fab dark small text v-bind="attrs" v-on="on">
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </template>

            <v-card class="px-2">
              <v-container>
                <v-row class="d-flex">
                  <v-col>
                    <v-img height="250" :src="producto.img"></v-img>
                  </v-col>

                  <v-col>
                    <div class="d-flex flex-column align-start">
                      <v-card-title class="pl-0 py-0">{{ producto.nombre }}</v-card-title>

                      <p class="descripcion mt-2 mb-0 body-2">{{ producto.descripcion }}</p>
                    </div>

                    <v-card-actions class="pb-4 px-0 d-flex flex-column align-start">
                        <v-rating
                          v-model="rating"
                          background-color="brown darken-1"
                          color="amber darken-1"
                          dense
                          half-increments
                          hover
                          size="18"
                        ></v-rating>
                        <span class="grey--text text--lighten-2 text-caption mr-2">
                          ({{ rating }})
                        </span>
                      </v-card-actions>


                    <p class="price pl-0">${{ producto.precio }}</p>

                    <v-card-text class="pl-0">
                      <v-row align="center" class="mx-0 d-flex justify-space-between">
                        <div class="my-2 body-2">
                          {{ producto.marca }} • {{ producto.categoria }}
                        </div>
                        <div class="my-2 body-2">
                          Stock: {{ producto.stock }}
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-col>

                </v-row>
              </v-container>

            </v-card>
          </v-dialog>
          <!-- Fin modal producto -->

        </v-img>
      </router-link>

      <div class="d-flex justify-space-between align-center">
        <v-card-title>{{ producto.nombre }}</v-card-title>
      </div>

      <p class="price">${{ producto.precio }}</p>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="my-2 text-subtitle-1">
            <span>{{ producto.marca }} • {{ producto.categoria }}</span>
          </div>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn v-if="producto.stock == 0" depressed disabled tile> Sin Stock </v-btn>
        <v-btn v-else
          class="white--text"
          @click="addToCart(producto.id)"
          :id="`btn-add-${producto.id}`"
          color="brown darken-4"
          tile
        >
          Agregar
        </v-btn>

        <v-btn text color="brown darken-1" @click="show = !show">
          +Info
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <!-- Mas Info -->
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text class="descripcion">
            {{ producto.descripcion }}
          </v-card-text>

          <p class="stock text-caption pl-4 mb-0">
            Stock:
            <span>{{ producto.stock == 0 ? "Sin stock" : producto.stock }}</span>
          </p>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "cardComponent",
  data() {
    return {
      show: false,
      dialog: false,
      rating: 4.3
    };
  },
  props: {
    producto: Object,
  },
  methods: {
    ...mapMutations(["addCartMutation", 'addCartUserMutation']),

    addToCart(idProduct) {
      const selectProduct = this.getProducts.find(
        (item) => item.id == idProduct
      );

      if (this.getUserActive) {

        const itemInCartStore = this.getCartUserActive.find(
          (item) => item.id == selectProduct.id
        );

        if (itemInCartStore) {
          this.$toasted.show("El Producto ya existe en el Carrito", {
            theme: "bubble",
            position: "top-center",
            duration: 2000,
            type: "error",
          });
        } else {

          this.addCartUserMutation(selectProduct);

          //Traigo la info del localStorage
          const actualCart = JSON.parse(localStorage.getItem('userLoged'));

          //Capturar el cart del Store actualizado
          const cartStore = this.getCartUserActive;
          actualCart.userCart = cartStore;

          //A medida que agrego un item se actualiza el localStorage
          const cartJSON = JSON.stringify(actualCart);
          localStorage.setItem('userLoged', cartJSON);


          this.$toasted.show("Producto Agregado!!", {
            theme: "bubble",
            position: "top-center",
            duration: 2000,
            type: "success",
          });
        }
      } else {
        this.$router.push("/acceso-denegado");
      }
    },
  },
  computed: {
    ...mapGetters(["getProducts", "getUserActive", "getItemsCart", "getCartUserActive"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Rubik:wght@300;400;500&display=swap");

.descripcion {
  font-family: Rubik;
  color: #6D4C41;
}
.card-product{
  position: relative;
}
.link-product{
  text-decoration: none;
}
.link-product button{
  position: relative;
  right: -80%;
}
.v-btn--fab.v-size--small .v-icon{
  font-size: 2rem;
}
.v-card__actions {
  justify-content: space-around;
}
.v-card__title {
  font-family: Oswald;
  font-size: 1.2rem;
  font-weight: 300;
  text-transform: uppercase;
  color: rgb(109, 76, 65);
}
p.price {
  color: rgb(109, 76, 65);
  font-family: Oswald;
  font-weight: 500;
  font-size: 1.2rem;
  padding-left: 16px;
  margin: 0;
}
i.heart {
  width: 30px;
  height: 30px;
  font-size: 1.3rem;
  color: rgba(120, 144, 156, 0.8);
  cursor: pointer;
  margin-right: 1rem;
  transition: font-size 0.15s ease-in-out;
}

i.heart:hover {
  color: #ff6f00;
  font-size: 1.8rem;
}
.theme--light.v-card > .v-card__text, .theme--light.v-card > .v-card__subtitle{
  color: rgba(109, 76, 65, .6);
}



</style>