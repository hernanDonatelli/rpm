<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Id</th>
          <th class="text-center">Nombre</th>
          <th class="text-center">Apellido</th>
          <th class="text-center">Email</th>
          <th class="text-center">Movil</th>
          <th class="text-center">Domicilio</th>
          <th class="text-center">Admin</th>
          <th class="text-center">Fecha de Registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in getUsers()" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nombre }}</td>
          <td>{{ user.apellido }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.movil }}</td>
          <td>{{ user.domicilio }}</td>
          <td>
            <v-switch v-model="user.admin" class="d-flex justify-center" color="success"
              @change="putEditAdmin(user.id)"></v-switch>
          </td>
          <td>{{ user.registrado }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TableUsersComponent",
  data() {
    return {
      id: null,
      admin: null
    };
  },

  created() {
    this.getUsersAPI();
  },

  methods: {
    ...mapActions(["getUsersAPI", "getUsersModified"]),
    ...mapGetters(["getRegistered"]),

    getUsers() {
      return this.getRegistered();
    },

    putEditAdmin(id) {
      const idSeleccionado = this.getRegistered().find((user) => user.id == id);

      this.id = idSeleccionado.id;
      this.admin = idSeleccionado.admin

      this.admin ? !this.admin : this.admin;

      const editedUser = {
        id: this.id,
        admin: this.admin
      };

      //Enviar usuario editado a la API
      const editarAdmin = async () => {
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
        // console.log(response);

        this.getUsersAPI();
        this.getUsersModified();

        return response;
      };

      editarAdmin();
    }
  },
};
</script>

<style scoped>
tbody {
  text-align: center;
}
</style>