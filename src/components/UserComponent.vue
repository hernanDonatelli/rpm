<template>
    <div v-if="getUserActive()" class="d-flex align-center">
        <div v-if="!getUserActive().admin">
            <v-btn
            to="/myCart"
            class="mx-3"
            fab
            small
            color="red accent-3"
            >
                <v-icon color="white" dark>
                    mdi-cart-variant
                </v-icon>
                <span>{{ getCartUserActive().length }}</span>
            </v-btn>

        </div>

        <p class="mb-0 mr-3">Bienvenido/a, <span class="user">{{ getUserActive().nombre }}</span></p>
        <v-btn
        @click="logOut()"
        text
        small
        class="py-4"
        color="red accent-3">
            <span class="logout pr-1">Logout</span> <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

    export default {
        name: 'UserComponent',
        methods: {
            ...mapMutations(['logOutUser']),
            ...mapGetters(['getUserActive', 'getCartUserActive']),

            logOut(){
                this.logOutUser();
                localStorage.clear();
                this.$store.state.token = null;
                this.$router.push('/');
            }

        },
    }
</script>

<style scoped>
p{
    font-family: Rubik;
    font-size: .8rem;
    color: rgba(255, 255, 255, 0.6);
}
span{
    display: block;
    text-align: center;
    font-family: Rubik;
    font-size: .8rem;
    color: white;
}
span.user{
    font-size: .9rem;
    font-weight: 500;
}
span.logout{
    color: #ff1744;
    font-weight: normal;
}
.v-btn--fab.v-size--small{
    width: 45px;
    height: 45px;
}
.v-btn--fab.v-size--small span{
    color: white;
    font-size: 1.2rem;
}
</style>