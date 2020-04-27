<template>
  <v-snackbar
    v-model="enabled"
    :color="snackbar ? snackbar.color : '' "
    :timeout=5000
    bottom
    left
    v-if="snackbar && snackbar.content"
  >
    {{ snackbar ? snackbar.content : ''}}

    <v-btn text fab @click="enabled = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'SnackBar',
    data: () => ({
      enabled: false,
    }),
    computed: {
      snackbar: {
        get() {
          return this.$store.state.layout.snackbar
        },
        set(data) {
          this.$store.commit('layout/SET', {type: 'snackbar', data: {content: data.content, color: data.color}})
        }
      }
    },
    watch: {
      snackbar() {
        this.enabled = !!this.snackbar
      }
    }
  }
</script>
