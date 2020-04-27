<template>
  <v-row >
    <v-dialog v-model="carRegWindow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <div class="headline">Register Car</div>
          <v-spacer />
          <v-btn icon text @click="carRegWindow = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              onSubmit="return false;">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Make*" v-model="params.make" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Model*" v-model="params.model" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field :rules="rules" dense label="VIN*" v-model="params.vin" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field :rules="rules" dense label="Car Dealer Name*" v-model="params.dealer" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-file-input :rules="rules" v-model="file" dense accept="image/*" label="Car Image*"></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <small class="font-weight-light ml-2 yellow--text">
            {{walletStatus !== 'unlocked' ? 'Please wait wallet getting ready...' : ''}}
          </small>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="post" :disabled="walletStatus !== 'unlocked'">Post</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { uuid } from 'vue-uuid'

  export default {
    data: () => ({
      params: {
        make: null,
        model: null,
        vin: null,
        dealer: null
      },
      rules: [v => !!v || 'Field is required'],
      file: null
    }),
    computed: {
      carRegWindow: {
        get() {
          return this.$store.state.layout.carRegWindow
        },
        set(data) {
          this.$store.commit('layout/SET', { type: 'carRegWindow', data: data })
        }
      },
      walletStatus() {
        return this.$store.state.info.walletStatus
      }
    },
    methods: {
      async post() {
        if(!this.$refs.form.validate()) {
          return
        }
        this.carRegWindow = false
        this.$store.commit('layout/SET', {type: 'snackbar', data: {content: 'Registering Car...', color: 'primary'}})
        let simba = this.$store.getters['info/getSimba']
        try {
          await simba.callMethodWithFile('car', {...this.params, __car: uuid.v4(), time: Date.now()},[this.file])
          this.$store.commit('layout/SET', {type: 'snackbar', data: {content: 'Transaction Posted', color: 'green'}})
        } catch (e) {
          this.$store.commit('layout/SET', {type: 'snackbar', data: {content: 'Transaction Post Aborted', color: 'red'}})
        }
      }
    }
  }
</script>