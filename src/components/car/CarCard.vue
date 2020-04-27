<template>
  <v-card
    class="mx-auto my-3"
    max-width="400"
    @click="carInfoWindow = true, currentSelectedCarId = currentCar.payload.inputs.__car"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      style="text-shadow: 0px 2px 2px rgba(0,0,0,1);"
      :src="carImdSrc ? carImdSrc.file : 'https://source.unsplash.com/1XSIFHhH1Cg/800x450'"
      gradient="to top, rgba(0,0,0,0.8), rgba(0,0,0,0)"
    >
      <v-progress-circular
        :width="1"
        :size="20"
        v-if="!carImdSrc"
        indeterminate
        style="position:absolute; top: 5px; left: 5px;"
      ></v-progress-circular>
      <small class="font-weight-light" style="position: absolute; right: 14px; top:10px;">{{new Date(parseInt(currentCar.payload.inputs.time)).toDateString()}}</small>
      <v-card-title>{{currentCar.payload.inputs.make}} {{currentCar.payload.inputs.model}}</v-card-title>
      <v-card-subtitle>VIN: {{currentCar.payload.inputs.vin}}</v-card-subtitle>
      <v-card-text>
        <div>Dealer: {{currentCar.payload.inputs.dealer}}</div>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script>
  export default {
    name: 'CarCard',
    props: {
      id: String
    },
    computed: {
      cars() {
        return this.$store.state.info.cars
      },
      carsImg() {
        return this.$store.state.info.carsImg
      },
      currentCar() {
        return this.cars.find(car => car.payload.inputs.__car === this.id)
      },
      carImdSrc() {
        return this.carsImg.find(carImg => carImg.id === this.currentCar.id)
      },
      currentSelectedCarId: {
        get() {
          return this.$store.state.layout.currentSelectedCarId
        },
        set(data) {
          this.$store.commit('layout/SET', { type: 'currentSelectedCarId', data: data })
        }
      },
      carInfoWindow: {
        get() {
          return this.$store.state.layout.carInfoWindow
        },
        set(data) {
          this.$store.commit('layout/SET', { type: 'carInfoWindow', data: data })
        }
      }
    }
  }
</script>