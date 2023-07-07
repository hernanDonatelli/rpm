<template>
    <div>
        <h1>Campeonatos en RPM Racing League</h1>
        <campeonato-componente />
    </div>
</template>

<script>
import CampeonatoComponente from '@/components/CampeonatoComponente.vue'

export default {
    name: "CampeonatoView.vue",
    components: {
        CampeonatoComponente,
    },
    data() {
        return {
            torneos: []
        }
    },
}
</script>

<style></style>