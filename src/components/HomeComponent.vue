<template>
  <v-row class="intro d-flex justify-center align-content-center h-100 m-0">
    <v-col xs="10" md="8">

      <video playsinline autoplay muted loop poster='@/assets/hero.jpg'>
        <source :src='require("@/assets/videos/rpmintro.mp4")' type='video/mp4'>
      </video>

      <div class="capa"></div>

      <div class="titulos">
        <h1 class="homeTitle text-center"><span>RPM Racing League</span></h1>
        <h3 class="homeSubTitle text-center"> Liga Argentina de Simracing</h3>
      </div>

      <div class="contador">
        <h3 class="homeSubTitle text-center">Proximo Evento</h3>
        <counter-component class="counter_component text-center grey lighten-5" :year="2023" :month="6" :date="29"
          :hour="22" :minutes="0" :seconds="0" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import CounterComponent from "@/components/CounterComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    CounterComponent
  },
  data() {
    return {

    }
  },
  beforeCreate() {

  },

  created() {
    this.getTokenApi();
    // this.getTorneosApi();
  },
  mounted() {
    this.getUserRPM();
    this.getToken();
    // this.getUser();
    this.getTorneos();
    this.checkToken();
  },
  methods: {
    ...mapActions(["getTokenApi", "getUserRPM", "getTorneosApi"]),
    ...mapMutations(["loadToken", "loadUser", "loadTorneos"]),
    ...mapGetters(["getToken", "getUser", "getTorneos"]),

    checkToken() {
      const tokenStorage = JSON.parse(localStorage.getItem('token'));

      if (tokenStorage === null) {
        const generateNewToken = async () => {
          await this.getTokenApi();
        };

        generateNewToken();

      } else {

        const tokenExpired = async () => {
          const checkToken = await this.getUser();

          if (checkToken === "Token is Invalid") {
            await this.getTokenApi();
            console.log('token invalido');
            // await crearTablasCalendario(20, 'GPVA Copa Gol');// editar aca (idTorneo, nombreDeTorneo)
          } else {
            console.log('token valido');
            await this.getTorneosApi();
            // await crearTablasCalendario(20, 'GPVA Copa Gol');// editar aca (idTorneo, nombreDeTorneo)
          }
        };

        tokenExpired();
      }

      // if (this.$store.state.token != localStorage.getItem("token") || this.$store.state.token === null) {
      //   this.getTokenApi();
      // } else {
      //   this.getUserRPM();
      //   this.getTorneos();
      // }
    }
  },
};
</script>

<style scoped>
.counter_component.grey.lighten-5 {
  background-color: transparent !important;
  color: white;
}

.intro {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.capa {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #212121;
  mix-blend-mode: overlay;
}

.contador {
  width: 100%;
  position: absolute;
  bottom: 10%;
  left: 0;
  background: transparent;
}

.homeTitle {
  font-family: Montserrat;
  color: white;
  font-weight: 200;
  line-height: 1;
  font-size: 3rem;
  position: relative;
  z-index: 10;
}

.homeTitle span {
  color: #FF1744;
  font-weight: 900;
}

.homeSubTitle {
  font-family: Montserrat;
  color: white;
  font-weight: 200;
  line-height: 1.2;
  font-size: 1.8rem;
  position: relative;
  z-index: 10;
}

.stepHeader {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: unset !important;
}

.stepText {
  color: white;
}

.theme--light.v-stepper .v-stepper__header .v-divider {
  border-color: rgba(255, 255, 255, .5);
}

.pIntro {
  font-size: .9rem;
  font-weight: 400;
}

@media screen and (max-width: 599.98px) {
  .homeTitle {
    font-size: 2rem;
  }

  .stepHeader {
    display: none;
  }
}

@media screen and (min-width: 599.98px) {
  .stepHeader {
    display: none;
  }
}

@media screen and (min-width: 991.98px) {
  .stepHeader {
    display: block;
  }

  .pIntro {
    font-size: .95rem;
    font-weight: 300;
  }
}
</style>