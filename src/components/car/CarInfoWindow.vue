<template>
  <v-dialog v-model="carInfoWindow" persistent max-width="600px">
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-card outlined>
      <v-card-title>
        <div class="headline">{{currentSelectedCar.payload.inputs.make}} {{currentSelectedCar.payload.inputs.model}}</div>
        <v-spacer />
        <v-btn icon text @click="carInfoWindow = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-subtitle>VIN: {{currentSelectedCar.payload.inputs.vin}}</v-card-subtitle>
      <v-card-subtitle class="subtitle-1">Registered by: {{currentSelectedCar.payload.inputs.dealer}} on {{new Date(parseInt(currentSelectedCar.payload.inputs.time)).toDateString()}}</v-card-subtitle>
      <v-card-text>
        <div>Txn Hash: <span class="font-weight-light">{{currentSelectedCar.transaction_hash}}</span></div>
        <div>IPFS Hash: <span class="font-weight-light">{{currentSelectedCar.payload.inputs._bundleHash}}</span></div>
      </v-card-text>
      <v-expand-transition>
        <v-card-text v-if="report !== null">
          <v-divider />
          <div class="headline white--text mt-2">Report</div>
          <div class="subtitle-1">Inspector by <span class="font-weight-light">{{report.payload.inputs.inspector}} on {{new Date(parseInt(report.payload.inputs.time)).toDateString()}}</span></div>
          <div class="subtitle-1">Condition: <span class="font-weight-light">{{report.payload.inputs.condition}}</span></div>
          <div>Txn Hash: <span class="font-weight-light">{{report.transaction_hash}}</span></div>
        </v-card-text>
      </v-expand-transition>
      <v-expand-transition>
        <v-card-text v-if="sale !== null">
          <v-divider />
          <div class="headline white--text mt-2">Sale</div>
          <div class="subtitle-1">Sold to <span class="font-weight-light">{{sale.payload.inputs.buyer}} on {{new Date(parseInt(sale.payload.inputs.time)).toDateString()}}</span></div>
          <div class="subtitle-1">Price: <span class="font-weight-light">{{sale.payload.inputs.price}}</span></div>
          <div>Txn Hash: <span class="font-weight-light">{{report.transaction_hash}}</span></div>
        </v-card-text>
      </v-expand-transition>

      <v-form
        ref="form"
        onSubmit="return false;">
        <v-expand-transition>
          <div v-if="addingReport">
            <v-divider></v-divider>
            <v-card-subtitle class="primary--text">Add an inspection report as an intent for sale</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Inspector*" v-model="reportParams.inspector" required :disabled="loading"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Condition*" v-model="reportParams.condition" required :disabled="loading"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <div v-if="addingSell">
            <v-divider></v-divider>
            <v-card-subtitle class="primary--text">Add a sell report and mark it as sold</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Buyer*" v-model="saleParams.buyer" required :disabled="loading"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Price*" v-model="saleParams.price" required :disabled="loading"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-form>

      <v-card-actions>
        <div v-if="loading" class="font-weight-light ml-2 primary--text">Checking Data...</div>
        <div v-if="sale !== null" class="font-weight-light ml-2 green--text">This transaction is complete, no further action can be taken</div>
        <template v-else>
          <small v-if="addingReport" class="font-weight-light ml-2 yellow--text">
            {{walletStatus !== 'unlocked' ? 'Please wait wallet getting ready...' : ''}}
          </small>
          <v-spacer></v-spacer>
          <div v-show="!loading">
            <v-btn v-if="!addingReport && report === null" color="primary" @click="addingReport = true">Add Report</v-btn>
            <v-btn v-if="!addingSell && sale === null && report !== null" color="primary" @click="addingSell = true">Sale</v-btn>
            <v-btn v-if="addingReport || addingSell" color="primary" :disabled="walletStatus !== 'unlocked'" @click="post">Post</v-btn>
          </div>
        </template>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

  export default {
    data: () => ({
      addingReport: false,
      addingSell: false,
      reportParams: {
        inspector: null,
        condition: null,
      },
      saleParams: {
        buyer: null,
        price: null
      },
      loading: false,
      report: null,
      sale: null,
      rules: [v => !!v || 'Field is required']
    }),
    mounted() {
      this.getReport()
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
      cars() {
        return this.$store.state.info.cars
      },
      currentSelectedCarId() {
        return this.$store.state.layout.currentSelectedCarId
      },
      currentSelectedCar() {
        return this.cars.find(car => car.payload.inputs.__car === this.currentSelectedCarId)
      },
      walletStatus() {
        return this.$store.state.info.walletStatus
      },
    },
    methods: {
      async post() {
        if(!this.$refs.form.validate()) {
          return
        }
        this.loading = true
        this.$store.commit('layout/SET', {type: 'snackbar', data: {content: 'Updating Report...', color: 'primary'}})
        let simba = this.$store.getters['info/getSimba']
        try {
          await simba.callMethod(
            this.addingReport ? 'report' : 'sale',
            {...(this.addingReport ? this.reportParams : this.saleParams), __car: this.currentSelectedCarId, time: Date.now()}
          )
          this.$store.commit('layout/SET', {type: 'snackbar', data: {content: 'Transaction Posted', color: 'green'}})
          this.addingReport ? this.getReport() : this.getSale()
          this.addingReport = false
          this.addingSell = false
        } catch (e) {
          this.$store.commit('layout/SET', {type: 'snackbar', data: {content: 'Transaction Post Aborted', color: 'red'}})
          this.loading = false
        }
      },
      async getReport() {
        this.loading = true
        let simba = this.$store.getters['info/getSimba']
        let res = await simba.getMethodTransactions('report', { __car_exact: this.currentSelectedCarId })
        if (res.results.length) {
          this.report = res.results[0]
          this.getSale()
          return
        }
        this.loading = false
      },
      async getSale() {
        let simba = this.$store.getters['info/getSimba']
        let res = await simba.getMethodTransactions('sale', { __car_exact: this.currentSelectedCarId })
        if (res.results.length) {
          this.sale = res.results[0]
        }
        this.loading = false
      }
    }
  }
</script>