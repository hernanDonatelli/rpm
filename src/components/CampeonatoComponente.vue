<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col xs="12">
                    <h3> Torneo {{ $route.params.id }}</h3>
                </v-col>
            </v-row>

            <v-row>
                <v-col xs="12">
                    <h1>Calendario</h1>
                </v-col>
            </v-row>

            <v-container>

                <v-row class="d-flex justify-center">
                    <v-col cols="10" lg="10">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            Fecha
                                        </th>
                                        <th class="text-center">
                                            Dia
                                        </th>
                                        <th class="text-center">
                                            Circuito
                                        </th>
                                        <th class="text-center">
                                            Resultados
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="fecha in getCalendario()" :key="fecha.id">
                                        <td class="text-center">{{ fecha.order }}</td>
                                        <td class="text-center">{{ fecha.date }}</td>
                                        <td class="text-center">{{ fecha.circuit }}</td>
                                        <td class="text-center"><a href="#">Resultados</a></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';


export default {
    name: 'CampeonatoComponente',
    data() {
        return {
            token: JSON.parse(localStorage.getItem('token')),
            user: this.getUser(),
        }
    },
    mounted() {
        // this.getTokenApi();
        this.getUserRPM();
        this.validateToken();
        this.getCalendarioApi();
        this.getTorneosApi();
    },
    methods: {
        ...mapGetters(["getToken", "getUser", "getCalendario", "getTorneos"]),
        ...mapActions(["getTokenApi", "getUserRPM", "getCalendarioApi", "getTorneosApi"]),
        ...mapMutations(["loadToken", "loadUser", "loadTorneos"]),

        validateToken() {
            // const tokenStorage = JSON.parse(localStorage.getItem('token'));

            if (this.$store.state.token === null) {
                console.log('token invalido');
                const generateNewToken = () => {
                    this.token = this.getTokenApi();

                    this.getUserRPM();
                };

                generateNewToken();


            } else {
                console.log('Token valido');

                const tokenExpired = async () => {



                    const checkToken = await this.getUserRPM();

                    if (checkToken === "Token is Expired") {
                        console.log('Token Expirado');
                        await this.getTokenApi();
                        // await crearTablasCalendario(20, 'GPVA Copa Gol');// editar aca (idTorneo, nombreDeTorneo)
                    } else {
                        console.log('El token aun no ha expirado');
                        await this.getUserRPM();
                        // await this.crearTablasCalendario(3);// editar aca (idTorneo, nombreDeTorneo)
                    }
                };

                tokenExpired();
            }
        }

    },
}
</script>

<style></style>