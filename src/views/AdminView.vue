<template>
    <div id="adminHome">
        <v-container fill-height>
            <v-row class="d-flex flex-column align-center justify-center mt-5 flex-md-row">
                <v-col cols="10" sm="6" md="3" xl="2">
                    <v-card to="/admin-productos" shaped class="adminCard d-flex flex-column align-center justify-center">
                        <v-icon>mdi-store</v-icon>
                        <v-card-title class="pa-0">
                            Productos
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="10" sm="6" md="3" xl="2">
                    <v-card to="/admin-usuarios" shaped class="adminCard d-flex flex-column align-center justify-center">
                        <v-icon>mdi-account-group</v-icon>
                        <v-card-title class="pa-0">
                            Usuarios
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="10" sm="6" md="3" xl="2">
                    <v-card to="/admin-pedidos" shaped class="adminCard d-flex flex-column align-center justify-center">
                        <v-icon>mdi-truck-delivery</v-icon>
                        <v-card-title class="pa-0">
                            Pedidos
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'AdminView'
    }
</script>

<style scoped>
#adminHome {
  height: 100vh;
  background-image: url(@/assets/bg_admin.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.adminCard{
    height: 150px;
    background-color: transparent !important;
    border: 1px solid rgba(255, 179, 0, .5);
    transition: border-color .2s ease-in-out;
    font-family: Rubik;
    text-transform: uppercase;
}
.v-card__title{
    color: rgba(255, 179, 0, .7) !important;
    font-weight: 300;
    background-color: transparent !important;
}

.adminCard i{
    font-size: 6rem;
    color: rgba(255, 179, 0, .7);
}

.adminCard:hover i,
.adminCard:hover .v-card__title{
    color: #FFA000 !important;
    border-color: #FFA000;
}
</style>