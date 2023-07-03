<template>
    <div v-if="loaded">

            <section v-if="!expired" class="d-flex text-h3 justify-center">
                <div class="days mr-2 relative">
                    {{ displayDays }}
                    <div class="label text-caption absolute bottom-0">days</div>
                </div>
                <span class="leading-snug">:</span>

                <div class="hours mx-2 relative">
                    {{ displayHours }}
                    <div class="label text-caption absolute bottom-0">hours</div>
                </div>
                <span class="leading-snug">:</span>

                <div class="minutes mx-2 relative">
                    {{ displayMinutes }}
                    <div class="label text-caption absolute bottom-0">minutes</div>
                </div>
                <span class="leading-snug">:</span>

                <div class="seconds ml-2 relative">
                    {{ displaySeconds }}
                    <div class="label text-caption absolute bottom-0">seconds</div>
                </div>
            </section>

            <section v-else>
                <h3 class="regresiveCero">Carrera Disputandose!!</h3>
            </section>
    </div>
</template>

<script>
    export default {
        props: ['year', 'month', 'date', 'hour', 'minutes', 'seconds'],
        data: () => ({
            displayDays: 0,
            displayHours: 0,
            displayMinutes: 0,
            displaySeconds: 0,
            loaded: false,
            expired: false
        }),
        computed: {
            _seconds: () => 1000,
            _minutes(){
                return this._seconds * 60
            },
            _hours() {
                return this._minutes * 60
            },
            _days() {
                return this._hours * 24
            },
            end(){
                return new Date(
                    this.year,
                    this.month,
                    this.date,
                    this.hour,
                    this.minutes,
                    this.seconds
                )
            }
        },
        mounted() {
            this.showRemaining()
        },
        methods: {
            formatNum: (num) => num < 10 ? '0' + num : num ,

            showRemaining(){
                const timer = setInterval(() => {
                   const now = new Date();
                //    const end = new Date(2023, 6, 15, 22, 0, 0, 0);
                   const distance = this.end.getTime() - now.getTime();

                   if(distance < 0){
                    clearInterval(timer);
                    this.expired = true;
                    this.loaded = true;
                    return;
                   }

                   const days = Math.floor((distance / this._days));
                   const hours = Math.floor((distance % this._days) / this._hours);
                   const minutes = Math.floor((distance % this._hours) / this._minutes);
                   const seconds = Math.floor((distance % this._minutes) / this._seconds);

                   this.displayMinutes = this.formatNum(minutes);
                   this.displaySeconds = this.formatNum(seconds);
                   this.displayHours = this.formatNum(hours);
                   this.displayDays = this.formatNum(days);
                   this.loaded = true;

                }, 1000);
            }
        }
    }
</script>

<style>
.regresiveCero{
    font-family: 'Roboto';
    font-size: 2rem;
    font-weight: lighter;
    background-color: red;
}
</style>