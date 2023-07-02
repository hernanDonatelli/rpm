<template>
  <div>
    <v-row class="mt-5">
      <v-col xs="12" lg="10" class="mx-auto">
        <v-simple-table class="text-center">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">Id</th>
                <th class="text-center">Nombre</th>

                <th class="text-center">Apellido</th>

                <th class="text-center">Email</th>

                <th class="text-center">Password</th>

                <th class="text-center">Domicilio</th>

                <th class="text-center">Movil</th>

                <th class="text-center">Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ getUserActive.id }}</td>
                <td>{{ getUserActive.nombre }}</td>
                <td>{{ getUserActive.apellido }}</td>
                <td>{{ getUserActive.email }}</td>
                <td>{{ getUserActive.password }}</td>
                <td>{{ getUserActive.domicilio }}</td>
                <td>{{ getUserActive.movil }}</td>
                <td>
                  <v-btn
                    @click="selectUser(getUserActive.id)"
                    :id="`btn-edit-${getUserActive.id}`"
                    class="ma-2"
                    text
                    icon
                    color="brown darken-1"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <!-- Dialog para editar usuario -->
        <v-row justify="center">
          <v-dialog v-model="dialog" max-width="700px">
            <v-card class="pa-5">
              <v-card-title>
                <span color="brown darken-1" class="text-h5 text-uppercase title-edit"
                  >Editar Usuario</span
                >
              </v-card-title>

              <v-divider class="hr-edit" color="brown darken-1" />

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="nombre"
                        label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                        v-model="apellido"
                        label="Apellido"
                        ></v-text-field>
                      </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="email"
                        label="email"
                        hint="dirección email valida, con @ y ."
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        v-model="password"
                        label="Password"
                        hint="Letras, numeros, signos, etc..."
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                        v-model="domicilio"
                        label="Domicilio"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                        v-model="movil"
                        label="Movil"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-row class="pb-10">
              <v-col cols="6">
                <v-btn class="white--text" block color="red accent-3" @click="dialog = false">
                  Cancelar
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="teal accent-3" @click="putEditUser">
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>

    <!-- Historial de pedidos cliente -->
    <h1 class="text-h4 text-uppercase text-center historial-title mt-15">
        <span>Historial</span>Pedidos
      </h1>

      <v-divider class="brown darken-1" />

    <v-row class="mt-5">
      <v-col xs="12" lg="10" class="mx-auto">
        <v-simple-table class="text-center">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Id Pedido</th>
            <th class="text-center">Fecha</th>
            <th class="text-center">Domicilio</th>
            <th class="text-center">Compra</th>
            <th class="text-center">Importe</th>
            <th class="text-center">Pagado</th>
            <th class="text-center">Enviado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index) in historialPedidos()" :key="index">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.fechaPedido }}</td>
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
                        <span>{{ producto.nombre }} (x{{ producto.cantidad }})</span>
                    </li>
                </ol>
              </v-tooltip>
            </td>
            <td>{{ pedido.totalCompra }}</td>
            <td>{{ pedido.pagado ? 'Si' : 'No' }}</td>
            <td>{{ pedido.enviado ? 'Si' : 'No' }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {  mapActions, mapGetters } from "vuex";

export default {
  name: "UserAccountComponent",
  data() {
    return {
        dialog: false,
        id: null,
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        domicilio: "",
        movil: ""
    };
  },
  created() {
    this.getUsersAPI();
    this.getPedidosAPI();
  },
  methods: {
    ...mapActions(["getUsersAPI", "getUsersModified", "getPedidosAPI"]),

    selectUser(id) {
      this.dialog = true;
      const idSeleccionado = this.getRegistered.find((user) => user.id == id);

      this.id = idSeleccionado.id;
      this.nombre = idSeleccionado.nombre;
      this.apellido = idSeleccionado.apellido;
      this.email = idSeleccionado.email;
      this.password = idSeleccionado.password;
      this.domicilio = idSeleccionado.domicilio;
      this.movil = idSeleccionado.movil;
    },

    putEditUser() {
      const editedUser = {
        id: this.id,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        password: this.password,
        domicilio: this.domicilio,
        movil: this.movil,
        userCart: this.getCartUserActive
      };

      //Enviar usuario editado a la API
      const editUserAPI = async () => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        };

        const putEditUser = await fetch(
          `https://639c6ec816d1763ab149a523.mockapi.io/usuarios/${this.id}`,
          options
        );
        const response = await putEditUser.json();
        console.log(response);

        this.getUsersModified();

        localStorage.setItem('userLoged', JSON.stringify(editedUser));

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        this.dialog = false;
      };

      editUserAPI();
    },

    historialPedidos(){
      const pedidosUser = this.getPedidosStore.filter(pedido => pedido.idCliente == this.getUserActive.id )

      return pedidosUser;
    }
  },
  computed: {
    ...mapGetters(["getUserActive", "getRegistered", "getPedidosStore", "getCartUserActive"]),
  },
};
</script>

<style scoped>
.historial-title,
.historial-title span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
}
.historial-title span {
  font-weight: 200;
}
hr {
  display: block;
  width: 10%;
  margin: 1rem auto 0.5rem;
  border: 1.5px solid black;
}

.title-edit,
.title-edit span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
  padding-left: .25rem;
}
.title-edit span {
  font-weight: 200;
}
hr.hr-edit.theme--light.v-divider {
  display: block;
  height: 2px;
  width: 15%;
  border-color: unset;
  border: 1px solid #6d4c41;
  margin-left: 5%;
  margin-top: 0;
}
</style>