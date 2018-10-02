<template>
  <div>
    <div v-if="showMenu">
      <div v-on:click="changePost('register')">
        <md-card class="md-layout-item md-size-20 md-large-size-30 md-medium-size-40 md-small-size-60 md-xsmall-size-100 options" md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Car Register</div>
              <div class="md-subhead">Register a car to Blockchain</div>
            </md-card-header>
            <md-card-content>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>

      <div v-on:click="changePost('report')">
        <md-card class="md-layout-item md-size-20 md-large-size-30 md-medium-size-40 md-small-size-60 md-xsmall-size-100 options" md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Car Report</div>
              <div class="md-subhead">Post a report of a car to Blockchain</div>
            </md-card-header>
            <md-card-content>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>

      <div v-on:click="changePost('sale')">
        <md-card class="md-layout-item md-size-20 md-large-size-30 md-medium-size-40 md-small-size-60 md-xsmall-size-100 options" md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">Car Sale</div>
              <div class="md-subhead">Add car sale agreement to Blockchain</div>
            </md-card-header>
            <md-card-content>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
    </div>

    <div v-if="showRegister">
      <md-dialog class="wallet" :md-click-outside-to-close=false :md-active.sync="isSigning">
        <md-toolbar class="md-accent md-dense">
          <h3 class="md-title">Signing this Transaction</h3>
        </md-toolbar>

        <div class="wallet-content">
          <div class="md-caption">Please make sure you have enough balance,</div>
          <div class="md-caption">otherwise the transaction will be failed!!!</div>
          <br>
          <div class="md-layout md-alignment-center-left">
            <div class="md-layout-item md-size-60">
              <md-field>
                <label>Balance in Rinkeby</label>
                <md-input v-model="accountBalance" readonly></md-input>
              </md-field>
            </div>

            <md-button class="md-icon-button" @click="getCurrentWallet">
              <md-icon>
                refresh
                <md-tooltip md-direction="top">Refresh</md-tooltip>
              </md-icon>
            </md-button>

            <md-button class="md-icon-button" href="https://faucet.rinkeby.io/" target="_blank">
              <md-icon>
                input
                <md-tooltip md-direction="top">Deposit</md-tooltip>
              </md-icon>
            </md-button>
          </div>
          <br>
          <br>
          <br>
        </div>
        <md-dialog-actions class="md-layout">
            <md-button class="md-accent md-raised" @click="unlockWallet">Sign</md-button>
        </md-dialog-actions>
      </md-dialog>

      <div class="post-form">
        <form novalidate class="md-layout" @submit.prevent="validateRecord">
          <md-card class="md-layout-item md-size-20 md-large-size-30 md-medium-size-40 md-small-size-60 md-xsmall-size-100">
            <md-card-header>
              <div class="title">Register a Car</div>
            </md-card-header>

            <md-card-content class="post-card">
              <strong style="color:#64dd17;">About the Car</strong>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                  <md-field :class="getValidationClass('make')">
                    <label for="make">Make</label>
                    <md-input name="make" id="make" v-model="form.make" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.make.required">The car make is required</span>
                    <span class="md-error" v-else-if="!$v.form.make.minlength">The car make name is too short</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                  <md-field :class="getValidationClass('model')">
                    <label for="model">Model</label>
                    <md-input name="model" id="model" v-model="form.model" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.model.required">The model name is required</span>
                    <span class="md-error" v-else-if="!$v.form.model.minlength">The model name is too short</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                  <md-field :class="getValidationClass('vin')">
                    <label for="vin">VIN</label>
                    <md-input name="vin" id="vin" v-model="form.vin" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.vin.required">The VIN is required</span>
                    <span class="md-error" v-else-if="!$v.form.vin.minlength">The VIN is too short</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-80">
                <md-field :class="getValidationClass('img')">
                  <label for="img">Car Image</label>
                  <md-file name="img" id="img" v-model="form.img" accept="image/*" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.vin.required">An Image is required</span>
                </md-field>
                </div>
              </div>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending"/>

            <md-card-actions>
              <md-button type="submit" class="md-accent md-raised" :disabled="sending">Submit</md-button>
            </md-card-actions>
          </md-card>

          <md-snackbar :md-active.sync="recordSaved">The record was Posted, sign with your wallet now!!!</md-snackbar>
          <md-snackbar :md-active.sync="recordSigned">The record was Signed, Congratulations!!!</md-snackbar>
          <md-snackbar :md-active.sync="noWalletLogged">Please click the wallet button on the top right corner to login!!!</md-snackbar>
        </form>
      </div>
    </div>

    <div v-if="showReport">
      <md-card class="my-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Report a Car</div>
            <div class="md-subhead">Same as Car Register</div>
          </md-card-header>

          <md-card-content>
            Just do it your own :D
          </md-card-content>

          <md-card-actions>
            <md-button v-on:click="changePost('menu')">Go Back</md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </div>

    <div v-if="showSale">
      <md-card class="my-card" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Sale a Car</div>
            <div class="md-subhead">Same as Car Register</div>
          </md-card-header>

          <md-card-content>
            Just do it your own :D
          </md-card-content>

          <md-card-actions>
            <md-button v-on:click="changePost('menu')">Go Back</md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </div>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { localstorage } from './mixins/localstorage'
import ethers from 'ethers'
import simbaApi from './gateways/simba-api'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'post',
  mixins: [validationMixin, localstorage],
  data: () => ({
    form: {
      make: null,
      model: null,
      vin: null,
      img: null
    },
    sending: false,
    recordSaved: false,
    recordSigned: false,
    noWalletLogged: false,
    accountBalance: null,
    txnId: null,
    unsignedTxn: null,
    isSigning: false,
    showRegister: false,
    showReport: false,
    showSale: false,
    showMenu: true
  }),
  validations: {
    form: {
      make: {
        required,
        minLength: minLength(1)
      },
      model: {
        required,
        minLength: minLength(1)
      },
      vin: {
        required,
        minLength: minLength(1)
      },
      img: {
        required
      }
    }
  },
  methods: {
    getCurrentWallet () {
      let address = this.getAddress()
      this.getBalance(address)
    },
    getBalance (address) {
      let self = this
      let providers = ethers.providers
      let provider = providers.getDefaultProvider('rinkeby')
      provider.getBalance(address).then(function (balance) {
        let etherString = ethers.utils.formatEther(balance)
        self.accountBalance = etherString + ' ETH'
        self.isSigning = true
      })
    },
    unlockWallet () {
      try {
        let mnemonic = this.getWallet()
        this.sendTxn(mnemonic)
      } catch (e) {
        console.log(e)
      }
    },
    sendTxn (mnemonic) {
      let wallet = ethers.Wallet.fromMnemonic(mnemonic)
      let signedTxn = wallet.sign(this.unsignedTxn)
      let self = this
      let txnId = this.txnId
      let payload = {
        'payload': signedTxn
      }
      try {
        simbaApi.signTxn('transaction/' + txnId + '/', payload).then(function () {
          self.recordSigned = true
          self.isSigning = false
        })
      } catch (e) {
        console.log(e)
      }
    },
    changePost (post) {
      switch (post) {
        case 'register':
          this.showRegister = true
          this.showReport = false
          this.showSale = false
          this.showMenu = false
          break
        case 'report':
          this.showRegister = false
          this.showReport = true
          this.showSale = false
          this.showMenu = false
          break
        case 'sale':
          this.showRegister = false
          this.showReport = false
          this.showSale = true
          this.showMenu = false
          break
        case 'menu':
          this.showRegister = false
          this.showReport = false
          this.showSale = false
          this.showMenu = true
          break
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.make = null
      this.form.model = null
      this.form.vin = null
      this.form.img = null
    },
    saveRecord (e) {
      if (!this.getWallet()) {
        this.noWalletLogged = true
        return
      }
      this.sending = true
      let bodyFormData = new FormData()
      bodyFormData.append('from', this.getAddress())
      bodyFormData.append('VIN', this.form.vin)
      bodyFormData.append('Make', this.form.make)
      bodyFormData.append('file[0]', document.getElementById('img').files[0])
      bodyFormData.append('Model', this.form.model)
      bodyFormData.append('car', 'anything')
      bodyFormData.append('assetId', 'anything')

      let self = this
      try {
        simbaApi.postData('registerCar/', bodyFormData).then(function (res) {
          self.txnId = res.data.id
          self.unsignedTxn = res.data.payload.raw
          self.getCurrentWallet()
          self.recordSaved = true
          self.sending = false
          self.clearForm()
        })
      } catch (e) {
        console.log(e)
      }
    },
    validateRecord () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveRecord()
      }
    }
  }
}
</script>

<style scoped>
  .my-card {
    margin-top: 40px;
    width: 300px;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 20px;
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .post-form {
    margin-top: 40px;
    height: 550px;
  }
  .title {
    font-size: 20px;
    margin-left: 10px;
    margin-top: 7px;
  }
  .post-card {
    margin: 10px;
  }
  .options {
    margin-top: 40px;
  }
  .wallet {
    min-width: 320px;
  }
  .wallet-content {
    margin: 20px;
  }
</style>
