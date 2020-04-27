<template>
  <v-dialog
    v-model="helpDocWindow"
    max-width="800"
  >
    <v-card>
      <v-toolbar flat dense>
        <v-toolbar-title>Help Doc</v-toolbar-title>
        <v-spacer />
        <v-btn icon text @click="helpDocWindow = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          About
        </v-tab>
        <v-tab>
          Workflow
        </v-tab>
        <v-tab>
          Contract
        </v-tab>
        <v-tab>
          Wallet
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text >
              <div class="green--text"> What is Car Demo 2?</div>
              <div class="white--text mb-2">
                An updated version of the previous blockchain application(Car Demo) built with SIMBA API.
              </div>
              <div class="green--text">What does this demo do?</div>
              <div class="white--text mb-2">
                It simulates the process of car selling from car dealerships and provides transparent information(pre-owner cars, especially) to potential buyers.
              </div>
              <div class="green--text">What are the advantages?</div>
              <div class="white--text mb-2">
                It increases the transparency of pre-owner car markets and enhances data integrity.
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="green--text">How does Car Demo 2 work?</div>
              <div class="white--text mb-2">
                <div>For the car dealers:</div>
                <div class="ml-2">1. A car dealer owns a pre-owned car and posts the car information to blockchain as a registration in the system.</div>
                <div class="ml-2">2. When the car dealer wants to sell the car, an third party inspector is invited to inspect the registered car and attach a report to that car on blockchain. </div>
                <div class="ml-2">3. When the car is sold, the car dealer adds another report and marks the car as sold.</div>
                <div>For the car buyers:</div>
                <div class="ml-2">A buyer does not have to do anything except checking the information posted by car dealers</div>
              </div>
              <div class="yellow--text">You can find the example smart contract on SIMBA Dashboard.</div>
              <div class="yellow--text">The contract structure can be found below.</div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <img src="@/assets/graph.png" style="max-width: 100%"/>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text >
              <div class="green--text">Where is my wallet?</div>
              <div class="white--text mb-2">
                It is at the top corner with an icon <v-icon>mdi-wallet</v-icon>
              </div>
              <div class="green--text">Do I need to create/restore a wallet?</div>
              <div class="white--text mb-2">
                No. It is auto generated once you loaded this app. You are free to save the seed of the wallet.
              </div>
              <div class="green--text">Why the balance shows N/A?</div>
              <div class="white--text mb-2">
                This app is running on Quorum blockchain which does not require Ether for transactions.
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    computed: {
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