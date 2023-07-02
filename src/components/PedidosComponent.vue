<template>
  <div>
    <v-row>
      <v-col xs="12" sm="8" md="4">
        <div id="checkSearch">
          <v-radio-group @change="filterSends" v-model="radioGroup" class="mt-2">
              <v-row>
                <v-radio
                  class="mb-2 mx-2"
                  color="brown darken-1"
                  label="Todos"
                  value=""
                ></v-radio>
                <v-radio
                  class="mb-2 mx-2"
                  color="brown darken-1"
                  label="Enviados"
                  :value="true"
                ></v-radio>
                <v-radio
                  class="mb-2 mx-2"
                  color="brown darken-1"
                  label="No Enviados"
                  :value="false"
                ></v-radio>
              </v-row>
          </v-radio-group>
        </div>
      </v-col>
    </v-row>

    <v-simple-table dense fixed-header class="text-center">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Id Pedido</th>
            <th class="text-center">Fecha</th>
            <th class="text-center">Cliente</th>
            <th class="text-center">Domicilio</th>
            <th class="text-center">Compra</th>
            <th class="text-center">Importe</th>
            <th class="text-center">Pagado</th>
            <th class="text-center">Enviado</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="pedido.enviado ? classEnviado : classNoEnviado" v-for="(pedido, index) in filterSends()" :key="index">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.fechaPedido }}</td>
            <td>{{ pedido.nombreCliente }} {{ pedido.apellidoCliente }}</td>
            <td>{{ pedido.domicilioCliente }}</td>
            <td>
              <v-tooltip
                v-model="pedido.compra"
                top
                close-delay="250"
                color="brown accent-1"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="brown accent-1">
                      mdi-cart
                    </v-icon>
                  </v-btn>
                </template>
                <ol>
                    <li class="" v-for="(producto, index) in pedido.userCart" :key="index">
                        <span>* {{ producto.nombre }} (x{{ producto.cantidad }})</span>
                    </li>
                </ol>
              </v-tooltip>
            </td>
            <td>{{ pedido.totalCompra }}</td>
            <td :class="pedido.pagado ? 'aprobado' : 'pendiente'">
                <v-switch
                    v-model="pedido.pagado"
                    :disabled="pedido.enviado"
                    color="success"
                    @change="putPagadoState(pedido.id)"
                ></v-switch>
            </td>
            <td :class="pedido.enviado ? 'aprobado' : 'pendiente'">
                <v-switch
                    :disabled="!pedido.pagado"
                    v-model="pedido.enviado"
                    color="success"
                    @change="putEnviadoState(pedido.id)"
                ></v-switch>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PedidosComponent",
  data() {
    return {
      id: null,
      pagado: null,
      enviado: null,
      classEnviado: 'enviado',
      classNoEnviado: 'no-enviado',
      radioGroup: ''
    }
  },
  created() {
    this.getPedidosAPI();
  },
  methods: {
    ...mapActions(['getPedidosAPI']),
    ...mapGetters(["getPedidosStore"]),

    //Enviar estado pagado a la API
    async editarEstadoCompra(estado){
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(estado),
        };

        const putEditState = await fetch(
          `https://639c6ec816d1763ab149a523.mockapi.io/carts/${this.id}`,
          options
        );
        const response = await putEditState.json();

        this.getPedidosAPI();

        return response.enviado;

      },

    putPagadoState(id) {
      const idPedido = this.getPedidosStore().find((pedido) => pedido.id == id);

      this.id = idPedido.id;
      this.pagado = idPedido.pagado

      this.pagado ? !this.pagado : this.pagado;

      const editedPagado = {
        id: this.id,
        pagado: this.pagado
      };

      this.editarEstadoCompra(editedPagado);
    },

    putEnviadoState(id) {
      const idPedido = this.getPedidosStore().find((pedido) => pedido.id == id);

      this.id = idPedido.id;
      this.enviado = idPedido.enviado

      this.enviado ? !this.enviado : this.enviado;

      const editedEnviado = {
        id: this.id,
        enviado: this.enviado
      };

      this.editarEstadoCompra(editedEnviado);

    },

    filterSends() {
      let filtered = this.getPedidosStore().filter(
        (item) => {

          if(this.radioGroup === ''){
            return item;
          }

          if(this.radioGroup === true){
            return item.enviado === true;
          }

          if(this.radioGroup === false){
            return item.enviado === false;
          }
      });

      return filtered;

    },
  },
};
</script>

<style scoped>
tbody tr:hover.enviado{
  background-color: #00BFA5 !important;
}
tbody tr:hover{
  background-color: transparent !important;
}

.enviado{
    background-color: #00BFA5;
    color: #00796B;
    transition: background-color .5s ease-in-out;
}
.no-enviado{
    background-color: white;
    transition: background-color .5s ease-in-out;
}
</style>