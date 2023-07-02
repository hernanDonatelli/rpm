<template>
  <div id="usersView">
    <v-container class="users-view">
      <h1 class="text-uppercase text-center registrados-title my-3">
        <span>Usuarios</span>Registrados
      </h1>

      <v-divider class="brown darken-1" />

      <table-users-component />
    </v-container>
  </div>
</template>

<script>
import TableUsersComponent from "@/components/TableUsersComponent.vue";

export default {
  name: "TableUsersView",
  components: {
    TableUsersComponent,
  },
};
</script>

<style scoped>
#usersView{
  height: 100%;
  background-color: #f7f7f7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #f7f7f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
  background-size: cover;
}
.users-view {
  padding-top: 5rem;
}
hr {
  display: block;
  width: 15%;
  margin: 1rem auto 1.5rem;
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