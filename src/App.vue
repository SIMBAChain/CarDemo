<template>
  <v-app id="car-demo2">
    <NavDrawer />
    <AppToolbar />
    <v-content >
      <router-view>
      </router-view>
    </v-content>
    <NotificationBar />
  </v-app>
</template>

<script>
  import NavDrawer from '@/components/layout/NavDrawer'
  import AppToolbar from '@/components/layout/AppToolbar'
  import NotificationBar from '@/components/layout/NotificationBar'

  export default {
    components: {
      NavDrawer,
      AppToolbar,
      NotificationBar
    },
    mounted() {
      this.$store.dispatch('info/setSimba')
      this.$store.dispatch('info/setWallet')
    }
  }
</script>