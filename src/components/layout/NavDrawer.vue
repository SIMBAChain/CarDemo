<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    width="200"
    floating
    overflow
    clipped
  >
    <v-list class="font-weight-regular" style="margin-top: -8px;">
      <template v-for="item in items">
        <v-list-item
          link
          :key="item.text"
          :href="item.url"
          target="_blank"
        >
          <v-list-item-action class="mr-3">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'NavDrawer',
    data: () => ({
      items: [
        { text: 'Main Website', icon: 'mdi-web', url: 'https://simbachain.com/'},
        { text: 'Dashboard', icon: 'mdi-view-dashboard', url: 'https://app.simbachain.com/'},
        { text: 'Javascript Lib', icon: 'mdi-language-javascript', url: 'https://simbachain.github.io/libsimba-js/'},
        { text: 'Github Repo', icon: 'mdi-github', url: 'https://github.com/SIMBAChain'},
        { text: 'Gitter Chat', icon: 'mdi-forum-outline', url: 'https://gitter.im/SIMBAChain/'},
        { text: 'Contact US', icon: 'mdi-account-voice', url: 'https://simbachain.com/contact/'},
      ],
    }),
    computed: {
      drawer: {
        get() {
          return this.$store.state.layout.drawer
        },
        set(data) {
          this.$store.commit('layout/SET', { type: 'drawer', data: data })
        }
      }
    }
  }
</script>
