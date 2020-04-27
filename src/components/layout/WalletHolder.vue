<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
      nudge-bottom="15"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
          :color="walletStatus === 'unlocked' ? 'primary' : ''"
        >
          <v-icon>mdi-wallet</v-icon>
        </v-btn>
      </template>

      <v-card outlined width="300">
        <v-toolbar dense>
          <v-icon>
            {{walletStatus === 'unlocked' ? 'mdi-lock-open-variant-outline': 'mdi-lock-outline'}}
          </v-icon>
          <div class="ml-4">{{walletStatus}}</div>
        </v-toolbar>
        <v-progress-linear
          indeterminate
          v-show="walletStatus === 'unlocking' || walletStatus === 'generating'"
          color="primary"
        ></v-progress-linear>
        <v-card-text v-if="walletStatus === 'unlocked' || address">
          <div><strong>Address: </strong> {{address}}</div>
          <div>
            <strong>Balance: </strong> N/A
            <v-tooltip right color="primary">
              <template v-slot:activator="{ on }">
               <v-icon small v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <small>No Ether Needed on Quorum</small>
            </v-tooltip>
          </div>
          <v-switch v-if="walletStatus === 'unlocked'" v-model="show" :label="show ? '' : 'Seed'" color="primary" style="margin-bottom: -20px;"></v-switch>
        </v-card-text>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              <strong>Seed: </strong><span v-if="seed">{{seed.phrase}}</span>
            </v-card-text>
          </div>
        </v-expand-transition>

      </v-card>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
      show: false,
      seed: null,
    }),
    watch: {
      menu() {
        if(!this.menu) {
          this.show = false
          this.seed = null
        }
      },
      show() {
        if (this.show && !this.seed) {
          this.getSeed()
        }
      }
    },
    computed: {
      address() {
        return this.$store.state.info.address
      },
      walletStatus() {
        return this.$store.state.info.walletStatus
      }
    },
    methods: {
      async getSeed() {
        let wallet = await this.$store.getters['info/getWallet']
        this.seed = await wallet.getMnemonic()
      }
    }
  }
</script>