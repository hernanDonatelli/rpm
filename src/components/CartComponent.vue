<template>
  <div>
    <v-row v-if="getCartUserActive != 0" class="d-flex justify-end">
      <v-col class="mx-auto" xs="6" sm="4" lg="3">
        <v-btn @click="dialogEmpty = true" class="my-5 mr-5 white--text" block color="red accent-3">
          Vaciar Carrito
        </v-btn>

        <!-- Modal vaciar carrito -->
        <v-row justify="center">
          <v-dialog
            v-model="dialogEmpty"
            overlay-color="brown darken-4"
            width="700">
            <v-card class="pa-5">
              <v-card-title class="text-h5 buy-title">
                <span>Vaciar</span>Carrito?
              </v-card-title>

              <v-divider class="mb-5" inset></v-divider>

              <v-card-text>
                <p>
                  Clickeando en Aceptar el Carrito quedará vacío. Puedes ir al
                  listado de productos para comenzar nuevamente.
                </p>
              </v-card-text>

              <v-card-actions>
                <v-row>
                  <v-col cols="6">
                    <v-btn class="white--text" color="red accent-3" block @click="dialogEmpty = false">
                      Cancelar
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn color="teal accent-3" block @click="emptyCartStore()">
                      Aceptar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-simple-table class="text-center mt-7">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Producto</th>

            <th class="text-center">Cantidad/(Stock)</th>

            <th class="text-center">Valor Unitario</th>

            <th class="text-center">Total</th>

            <th class="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) of getCartUserActive" :key="index">

            <td>{{ index + 1 }}</td>
            <td>{{ producto.nombre }}</td>
            <td
              class="alto-columna ">
              <div class="d-sm-flex align-sm-center h-100 flex-sm-wrap align-sm-content-center justify-md-center">

                <v-icon :disabled="producto.cantidad == 0" @click="producto.cantidad--" color="brown darken-1" class="mr-0">
                  mdi-chevron-down
                </v-icon>

                <input class="inputQuantity" readonly v-model.number="producto.cantidad" />

                <v-icon :disabled="producto.cantidad >= producto.stock" @click="producto.cantidad++" color="brown darken-1" class="ml-0">
                  mdi-chevron-up
                </v-icon>

                <p class="ma-0 text-caption">({{ producto.stock - producto.cantidad }})</p>
              </div>

            </td>
            <td>
              ${{ producto.precio }}
            </td>

            <td>
              <strong>${{ (producto.precio * producto.cantidad).toFixed(2) }}</strong>
            </td>

            <td>
              <v-tooltip left color="error">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="deleteItem(producto.id)" :id="`btn-delete-${producto.id}`" class="ma-2" text icon
                    color="red accent-3" v-bind="attrs" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Vas a quitar este producto del carrito?</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row v-if="!getCartUserActive.length == 0" class="mt-3 flex-column flex-lg-row align-lg-center">
      <v-col class="d-flex justify-center align-center order-3 order-lg-1 justify-lg-start" xs="12" lg="4">
        <v-icon id="store">mdi-arrow-left-bold-circle-outline</v-icon>
        <router-link class="ml-3" id="buyNext" to="/shop">Seguir Comprando?</router-link>
      </v-col>

      <v-col xs="12" sm="6" lg="3" class="mb-5 order-2 mx-auto">
        <v-btn @click="dialog = true" class="mb-0" block color="teal accent-3">
          Procesar Compra
        </v-btn>

        <!-- Modal finalizar compra -->
        <v-row justify="center">
          <v-dialog v-model="dialog" overlay-color="brown darken-4" width="700">
            <v-card class="pa-5">
              <v-card-title class="text-h5 buy-title">
                <span>Finalizar</span>Compra?
              </v-card-title>

              <v-divider class="mb-5" inset></v-divider>

              <v-card-text>
                <p>
                 Aceptando la compra, esta será procesada y te enviaremos un email con los datos para abonar electrónicamente o bien en efectivo si elegís pagarlo contra entrega y aprovechar un 10% de descuento.
                </p>
                <p class="mb-0">
                  El total de su compra es de
                  <strong>${{ (subTotalCart() * 1.21).toFixed(2) }}</strong>
                </p>
                <p class="mt-0">
                  Pago en efectivo/débito (-10%)
                  <strong>${{ ((subTotalCart() * 1.21) - ((subTotalCart() * 0.1) * 1.21)).toFixed(2) }}</strong>
                </p>
              </v-card-text>

              <v-card-actions>
                <v-row>
                  <v-col cols="6">
                    <v-btn class="white--text" color="red accent-3" block @click="dialog = false">
                      Cancelar
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn color="teal accent-3" block @click="dialog = postBuy()">
                      Aceptar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>

      <v-col xs="12" lg="4" class="d-flex flex-column justify-center pa-2 order-1 order-lg-3">
        <p class="text-body-2 text-center text-lg-right pr-lg-5 my-0">
          SubTotal: ${{ subTotalCart() }}
        </p>

        <p class="text-body-2 text-center text-lg-right pr-lg-5 my-0">
          IVA +21%:
          ${{ (subTotalCart() * 0.21).toFixed(2) }}
        </p>

        <p class="text-center text-lg-right pr-lg-5 mt-2 mb-0">
          <strong>Total: ${{ (subTotalCart() * 1.21).toFixed(2) }}</strong>
        </p>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <p class="my-4 text-center">No tienes productos en el carrito.</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartComponent",
  data() {
    return {
      dialog: false,
      dialogEmpty: false,

    };
  },

  methods: {
    ...mapMutations(["emptyCartStore", "deleteItemMutation"]),

    subTotalCart() {
      const itemsInCart = this.getCartUserActive.map((item) => item);

      const subTotal = itemsInCart
        .reduce(
          (total, producto) => (total += producto.precio * producto.cantidad),
          0
        )
        .toFixed(2);

      return subTotal;
    },

    deleteItem(id) {
      const itemToDelete = this.getCartUserActive.find((item) => {
        return item.id == id;
      });
      let index = this.getCartUserActive.indexOf(itemToDelete);

      this.deleteItemMutation(index);

      localStorage.setItem('userLoged', JSON.stringify(this.getUserActive));

      this.$toasted.show("Producto Eliminado!!", {
        theme: "bubble",
        position: "top-center",
        duration: 1500,
        type: "error",
      });
    },

    //Metodo para capturar el item vendido y su stock remanente
    vendidos(id, cantidad, stock){
      stock = stock - cantidad;

      const upSales = {
        id: id,
        stock: stock
      }

      const updatedStockProduct = async() => {
        const options = {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(upSales)
        }

        const fetchUpdate = await fetch(`https://639c6ec816d1763ab149a523.mockapi.io/productos/${upSales.id}`, options);
        const response = await fetchUpdate.json();

        return response;
      }

      updatedStockProduct();
    },

    //Envio a la API el pedido de compra
    postBuy() {
      const individualBuy = {
        idCliente: this.getUserActive.id,
        nombreCliente: this.getUserActive.nombre,
        apellidoCliente: this.getUserActive.apellido,
        domicilioCliente: this.getUserActive.domicilio,
        totalCompra: (this.subTotalCart() * 1.21).toFixed(2),
        pagado: false,
        enviado: false,
        userCart: this.getCartUserActive,
        fechaPedido: new Date().toLocaleString()
      };

      const upBuyAPI = async () => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(individualBuy),
        };

        const postBuy = await fetch(
          "https://639c6ec816d1763ab149a523.mockapi.io/carts",
          options
        );
        const response = await postBuy.json();
        console.log(response);

        this.emptyCartStore();
        localStorage.setItem('userLoged', JSON.stringify(this.getUserActive));

        this.$toasted.show("La Compra ha sido exitosa!!", {
          theme: "bubble",
          position: "top-center",
          duration: 3000,
          type: "success",
        });
      };
      upBuyAPI();

      //Actualizacion del stock de cada producto
      individualBuy.userCart.filter(item => {

        const datos = {
          id: item.id,
          cantidad: item.cantidad,
          stock: item.stock
        };

        this.vendidos(datos.id, datos.cantidad, datos.stock);
      })

    },

  },
  computed: {
    ...mapGetters(["getCartUserActive", "getUserActive"]),

  },
};
</script>

<style scoped>
.alto-columna {
  height: 100% !important;
}

.v-data-table {
  line-height: 4.5;
}

.inputQuantity {
  width: 20px;
  text-align: center;
}

#buyNext {
  text-decoration: none;
  color: #6d4c41;
  transition: all 0.2s ease-in-out;
}

#buyNext:hover {
  color: #ffab00;
}

#store {
  color: #6d4c41;
}

.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical) {
  width: 50%;
  margin-left: 3%;
}

.buy-title,
.buy-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}

.buy-title span {
  font-weight: 200;
}
</style>