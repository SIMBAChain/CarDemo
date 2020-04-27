<template>
  <div>
    <v-app-bar
      app
      flat
      short
      clipped-left
    >
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />
      <v-toolbar-title>Car Demo 2</v-toolbar-title>
      <v-spacer />
      <v-btn icon text @click="helpDocWindow = true"><v-icon>mdi-help-circle-outline</v-icon></v-btn>
      <WalletHolder />
    </v-app-bar>
  </div>
</template>

<script>
  import WalletHolder from "./WalletHolder";

  export default {
    name: 'AppToolbar',
    components: {
      WalletHolder
    },
    computed: {
      drawer: {
        get() {
          return this.$store.state.layout.drawer
        },
        set(data) {
          this.$store.commit('layout/SET', {type: 'drawer', data: data})
        }
      },
      helpDocWindow: {
        get() {
          return this.$store.state.layout.helpDocWindow
        },
        set(data) {
          this.$store.commit('layout/SET', {type: 'helpDocWindow', data: data})
        }
      }
    }
  }
</script>

<style>

</style>
