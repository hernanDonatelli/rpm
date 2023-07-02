<template>
    <div>
        <div id="alert" :class="classe" v-if="classe != 'hidden'">
            <v-alert border="left" color="red accent-3" text icon="mdi-alert-circle">
                <p class="ma-0">El email que intenta registrar ya existe.</p>
            </v-alert>
        </div>
        <div id="alertEmpty" :class="classeEmpty" v-if="classeEmpty != 'hidden'">
            <v-alert border="left" color="red accent-3" text icon="mdi-alert-circle">
                <p class="ma-0">Debe completar los campos requeridos.</p>
            </v-alert>
        </div>
        <div id="alertSuccess" :class="classeSuccess" v-if="classeSuccess != 'hidden'">
            <v-alert border="left" color="teal accent-4" text icon="mdi-check-decagram">
                <p class="ma-0">El registro ha sido exitoso. Ya puedes ingresar al sistema!</p>
            </v-alert>
        </div>
        <v-form id="registerForm" v-model="valid" lazy-validation>

            <v-text-field v-model="nombre" :counter="20" :rules="nombreRules" label="Nombre" required></v-text-field>

            <v-text-field v-model="apellido" :counter="20" :rules="apellidoRules" label="Apellido"
                required></v-text-field>

            <v-text-field v-model="movil" label="Movil" hint="Codigo de area y numero" required></v-text-field>

            <v-text-field v-model.trim="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field v-model="domicilio" label="Domicilio" required></v-text-field>

            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                label="Contraseña" hint="Minimo 6 caracteres" counter @click:append="show1 = !show1">
            </v-text-field>


            <v-btn block color="teal accent-3" :disabled="!valid" class="mr-4 mt-8" @click="postRegisterUser">
                Enviar
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "RegisterComponent",
    data: () => ({
        valid: true,
        nombre: "",
        apellido: "",
        movil: "",
        domicilio: "",
        email: "",
        password: "",
        admin: false,
        show1: false,
        classe: 'hidden',
        classeSuccess: 'hidden',
        classeEmpty: 'hidden',
        rules: {
            required: (value) => !!value || "Requerido.",
            min: (v) => v.length >= 6 || "Min 6 caracteres",
        },
        nombreRules: [
            (v) => !!v || "Nombre es requerido",
            (v) =>
                (v && v.length <= 20) ||
                "El nombre debe contener menos de 20 caracteres",
        ],
        apellidoRules: [
            (v) => !!v || "Apellido es requerido",
            (v) =>
                (v && v.length <= 20) ||
                "El apellido debe contener menos de 20 caracteres",
        ],
        emailRules: [
            (v) => !!v || "E-mail es requerido",
            (v) => /.+@.+\..+/.test(v) || "E-mail debe ser válido",
        ],
    }),
    created() {
        this.getUsersAPI();
    },

    methods: {
        ...mapActions(['getUsersAPI']),

        postRegisterUser(e) {
            e.preventDefault();

            if (!this.nombre || !this.apellido || !this.movil || !this.domicilio || !this.email || !this.password) {
                this.classeEmpty = 'visible';

                setTimeout(() => {
                    this.classeEmpty = 'hidden';
                }, 2500);
            } else {
                const registerUser = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    domicilio: this.domicilio,
                    email: this.email,
                    password: this.password,
                    movil: this.movil,
                    admin: false,
                    registrado: new Date().toLocaleString()
                };

                const emailFind = this.getRegistered.find(
                    (item) => item.email == registerUser.email
                );

                if (emailFind) {
                    this.classe = 'visible';

                    setTimeout(() => {
                        this.classe = 'hidden';
                    }, 2500);
                } else {
                    const registerUserAPI = async () => {
                        const options = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(registerUser),
                        };

                        const postUser = await fetch(
                            "https://639c6ec816d1763ab149a523.mockapi.io/usuarios",
                            options
                        );
                        const response = await postUser.json();

                        if (response) {
                            this.classeSuccess = 'visible';

                            setTimeout(() => {
                                this.classeSuccess = 'hidden';
                                document.getElementById('registerForm').reset();
                                this.$router.push('/login');
                            }, 3500);
                        }

                    };

                    registerUserAPI();
                }
            }

        },
    },
    computed: {
        ...mapGetters(["getRegistered"]),
    },
};
</script>

<style scoped>
#registerForm{
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);;
}
</style>
