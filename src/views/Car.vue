<template>
  <div>
    <LoadingAnim v-if="!simbaInitialized || !cars.length"/>
    <DocWindow />
    <div>
      <CarRegWindow v-if="simbaInitialized && carRegWindow"/>
      <CarInfoWindow v-if="carInfoWindow"/>
    </div>

    <v-row class="mx-2 my-2" v-if="cars.length">
      <v-col
        v-for="(car, index) in cars"
        :key="index"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
      >
        <CarCard :id="car.payload.inputs.__car"/>
      </v-col>
    </v-row>

    <v-btn
      v-show="!carRegWindow"
      dark
      fixed
      bottom
      right
      fab
      color="primary"
      @click="carRegWindow = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import CarCard from '@/components/car/CarCard'
  import CarRegWindow from '@/components/car/CarRegWindow'
  import CarInfoWindow from '@/components/car/CarInfoWindow'
  import LoadingAnim from  '@/components/layout/LoadingAnim'
  import DocWindow from '@/components/help/DocWindow'

  export default {
    name: 'Car',
    components: {
      CarCard,
      CarRegWindow,
      CarInfoWindow,
      LoadingAnim,
      DocWindow
    },
    computed: {
      carInfoWindow: {
        get() {
          return this.$store.state.layout.carInfoWindow
        },
        set(data) {
          this.$store.commit('layout/SET', { type: 'carInfoWindow', data: data })
        }
      },
      carRegWindow: {
        get() {
          return this.$store.state.layout.carRegWindow
        },
        set(data) {
          this.$store.commit('layout/SET', { type: 'carRegWindow', data: data })
        }
      },
      cars() {
        return this.$store.state.info.cars
      },
      simbaInitialized() {
        return this.$store.state.info.simbaInitialized
      }
    }
  }
</script>
