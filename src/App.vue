<template>
  <div class="page-container unselectable">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary tool-bar">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title unselectable car">Car Demo</span>
          </div>

          <div class="md-toolbar-section-end">
            <span>
              <md-button class="md-icon-button" @click="showWallet(true)">
                <md-icon style="color:#64dd17">account_balance_wallet</md-icon>
              </md-button>
              <md-tooltip md-delay="500" md-direction="left">Wallet</md-tooltip>
            </span>
          </div>

          <md-dialog class="wallet" :md-click-outside-to-close=false :md-active.sync="isWallet">
            <md-toolbar class="md-accent md-dense">
              <h3 class="md-title" style="flex: 1">Ethereum Wallet</h3>
                <md-button class="md-icon-button" @click="setWalletStatus('close')">
                  <md-icon>close</md-icon>
                </md-button>
            </md-toolbar>

            <div v-if="isCreate">
              <div class="wallet-content">
                <div class="md-subheading">
                  Create a new Ethereum Account
                </div>
                <br>
                <br>
                <br>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button class="md-accent" @click="setWalletStatus('restore')">Restore</md-button>
                <md-button class="md-accent md-raised" @click="createWallet()">Create</md-button>
              </md-dialog-actions>
            </div>

            <div v-if="isRestore">
              <div class="wallet-content">
                <div class="md-subheading">
                  Restore your Ethereum Account with Seed
                </div>
                <br>
                <div class="md-caption">
                  Please type your seed (12 mnemonic words) to restore
                </div>
                <div class="md-layout-item md-size-70">
                  <md-field>
                    <label>Wallet Seed</label>
                    <md-textarea md-autogrow v-model="restoreSeed"></md-textarea>
                  </md-field>
                </div>
                <br>
                <br>
                <br>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button class="md-accent" @click="setWalletStatus('create')">Create</md-button>
                <md-button class="md-accent md-raised" @click="restoreWallet()">Restore</md-button>
              </md-dialog-actions>
              <md-snackbar :md-active.sync="invalidSeed">The seed is invalid, please check again!!!</md-snackbar>
            </div>

            <div v-if="isUnlock">
              <div class="wallet-content">
                <div class="md-subheading">
                  Unlock Your Account
                </div>
                <br>
                <br>
                <br>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button @click="logoutWallet">Logout</md-button>
                <md-button class="md-accent md-raised" @click="unlockWallet">Unlock</md-button>
              </md-dialog-actions>
            </div>

            <div v-if="isCheck">
              <div class="wallet-content">
                <div class="md-subheading">
                  Ethereum Account Information
                </div>
                <br>
                <div class="md-layout-item md-size-90">
                  <md-field>
                    <label>Account Address</label>
                    <md-textarea md-autogrow v-model="accountAddress" readonly></md-textarea>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-90">
                  <md-field>
                    <label>Account Balance in Rinkeby TestNet</label>
                    <md-input v-model="accountBalance" readonly></md-input>
                  </md-field>
                </div>
                <div v-if="isRevealed">
                  <div class="md-layout-item md-size-90">
                    <md-field>
                      <label>Private Key</label>
                      <md-textarea md-autogrow v-model="accountPk" readonly></md-textarea>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-90">
                    <md-field>
                      <label>Seed</label>
                      <md-textarea md-autogrow v-model="accountSeed" readonly></md-textarea>
                    </md-field>
                  </div>
                </div>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button @click="logoutWallet">Logout</md-button>
                <md-button class="md-accent md-raised" @click="isRevealed = true">Reveal</md-button>
              </md-dialog-actions>
            </div>
          </md-dialog>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="Home" md-label="Home" to="Home"></md-tab>
            <md-tab id="Post" md-label="Post" to="Post"></md-tab>
            <md-tab id="Get" md-label="Get" to="Get"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent avatar" md-elevation="0">
          <md-icon class="md-size-3x">commute</md-icon>
        </md-toolbar>
        <div class="md-subheading title">Car Demo</div>
        <md-list>
          <md-list-item href="https://app.simbachain.com/" target="_blank" @click="menuVisible = false">
            <md-icon>apps</md-icon>
            <span class="md-list-item-text">SIMBA&#8482; Dashboard</span>
          </md-list-item>

          <md-list-item href="https://github.com/SIMBAChain/CarDemo" target="_blank" @click="menuVisible = false">
            <md-icon>code</md-icon>
            <span class="md-list-item-text">Source Code</span>
          </md-list-item>

          <md-list-item href="https://cardemo.readthedocs.io/en/latest/" target="_blank" @click="menuVisible = false">
            <md-icon>book</md-icon>
            <span class="md-list-item-text">Documentation</span>
          </md-list-item>

          <md-list-item href="https://simbachain.com/contact/" target="_blank" @click="menuVisible = false">
            <md-icon>contact_support</md-icon>
            <span class="md-list-item-text">Contact Us</span>
          </md-list-item>

        </md-list>
        <div class="md-layout love">
          <div>Made with</div>
          <div class="zoom"> &hearts; </div>
          <div>in South Bend</div>
        </div>
      </md-app-drawer>

      <md-app-content>
        <div class="video-background">
          <div class="video-foreground">
            <iframe src="https://www.youtube.com/embed/bhWJF9FlBqM?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1&playlist=qghQ5eKGcyE" frameborder="0" allowfullscreen>
            </iframe>
          </div>
        </div>
        <router-view class="conent">
        </router-view>
      </md-app-content>

    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .wallet-icon {
    color: #43a047;
  }
  .title {
    margin-left: 18px;
  }
  .zoom {
    color: #e25555;
    transition: transform .2s;
    margin-left:2px;
    margin-right:2px;
  }
  .zoom:hover {
    transform: scale(1.3);
  }
  .love {
    position: fixed;
    bottom: 20px;
    margin-left: 20px;
  }
  .avatar {
    margin-top:20px;
    margin-left:-60px;
  }
  .tool-bar {
    z-index: 100;
  }
  .md-app {
    height: 100vh;
  }
  .unselectable {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .video-background {
    background: #000;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 1;
  }
  .video-foreground,
  .video-background iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 2560px;
    min-height: 1600px;
    pointer-events: none;
  }

  @media all and (max-width: 600px) {
  .vid-info { width: 50%; padding: .5rem; }
  .vid-info h1 { margin-bottom: .2rem; }
  }
  @media all and (max-width: 500px) {
  .vid-info .acronym { display: none; }
  }
  .wallet {
    min-width: 320px;
  }
  .wallet-content {
    margin: 20px;
  }

</style>

<script>
import { localstorage } from './components/mixins/localstorage'
import ethers from 'ethers'

export default {
  name: 'App',
  mixins: [localstorage],
  data: () => ({
    restoreSeed: null,
    invalidSeed: null,
    accountAddress: null,
    accountPk: null,
    accountSeed: null,
    accountBalance: null,
    menuVisible: false,
    isRevealed: false,
    isWallet: false,
    isCreate: false,
    isRestore: false,
    isUnlock: false,
    isCheck: false
  }),
  methods: {
    setWalletStatus (status) {
      switch (status) {
        case 'create':
          this.isCreate = true
          this.isRestore = false
          this.isUnlock = false
          this.isCheck = false
          break
        case 'restore':
          this.isCreate = false
          this.isRestore = true
          this.isUnlock = false
          this.isCheck = false
          break
        case 'unlock':
          this.isCreate = false
          this.isRestore = false
          this.isUnlock = true
          this.isCheck = false
          break
        case 'check':
          this.isCreate = false
          this.isRestore = false
          this.isUnlock = false
          this.isCheck = true
          break
        case 'close':
          this.isCreate = false
          this.isRestore = false
          this.isUnlock = false
          this.isCheck = false
          this.isWallet = false
          this.cleanUp()
          break
      }
    },
    showWallet (status) {
      this.setWalletStatus('close')
      if (status) {
        this.isWallet = true
        this.getCurrentWallet()
      }
    },
    getCurrentWallet () {
      if (localStorage.getItem('keystore')) {
        this.isUnlock = true
      } else {
        this.isCreate = true
      }
    },
    createWallet () {
      const mnemonic = ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16))
      this.setWallet(mnemonic)
      this.checkWallet(mnemonic)
      this.setWalletStatus('check')
      this.cleanUp()
    },
    restoreWallet () {
      const mnemonic = this.restoreSeed
      if (!ethers.HDNode.isValidMnemonic(mnemonic)) {
        this.invalidSeed = true
        this.cleanUp()
        return
      }
      this.invalidSeed = false
      this.setWallet(mnemonic)
      this.checkWallet(mnemonic)
      this.setWalletStatus('check')
      this.cleanUp()
    },
    cleanUp () {
      this.restoreSeed = null
      this.isRevealed = false
    },
    unlockWallet () {
      if (this.getWallet()) {
        this.setWalletStatus('check')
        this.checkWallet(this.getWallet())
      } else {
        this.cleanUp()
      }
    },
    checkWallet (mnemonic) {
      let wallet = ethers.Wallet.fromMnemonic(mnemonic)
      this.setAddress(wallet.address)
      this.accountAddress = wallet.address
      this.accountPk = wallet.privateKey
      this.accountSeed = mnemonic
      this.getBalance(wallet.address)
    },
    getBalance (address) {
      let self = this
      let providers = ethers.providers
      let provider = providers.getDefaultProvider('rinkeby')
      provider.getBalance(address).then(function (balance) {
        let etherString = ethers.utils.formatEther(balance)
        self.accountBalance = etherString + ' ETH'
      })
    },
    logoutWallet () {
      this.clean()
      this.setWalletStatus('create')
    }
  }
}
</script>
