import * as libsimba from '@simbachain/libsimba-js'

const url = 'yourApiUrl'
const apiKey = 'YourApiKey'

let wallet = new libsimba.LocalWallet()
let simba = null

// initial state
const state = {
  address: null,
  walletStatus: null,
  simbaInitialized: false,
  cars: [],
  carsImg:[]
}

// getters
const getters = {
  getSimba: () => simba,
  getWallet: async () => await wallet
}

// actions
const actions = {
  async setSimba ({ commit, dispatch }) {
    commit('SET', { type: 'simbaInitialized',  data: false })
    simba = await libsimba.getSimbaInstance(url, null, apiKey)
    commit('SET', { type: 'simbaInitialized',  data: true })
    setInterval(() => dispatch('getCars'), 8000)
  },
  async getCars ({ state, commit, dispatch}) {
    let txns = await simba.getMethodTransactions('car', {})
    commit('SET', { type: 'cars',  data: txns.data() })
    state.cars.filter(car => !state.carsImg.find(carImg => carImg.id === car.id)).forEach(noImg => dispatch('getCarImg', noImg.id))
  },
  async getCarImg({ state, commit }, payload) {
    let blob = await simba.getFileFromBundleForTransaction(payload, 0, false)
    if (state.carsImg.find(carImg => carImg.id === payload)) {
      return
    }
    commit('SET', { type: 'carsImg', data: [...state.carsImg, { id: payload, file: URL.createObjectURL(blob) }]})
  },
  async setWallet ({ commit }) {
    commit('SET', { type: 'walletStatus', data: 'init' })

    if (wallet.walletExists()) {
      commit('SET', { type: 'walletStatus', data: 'unlocking' })
      await wallet.unlockWallet('password')
    } else {
      commit('SET', { type: 'walletStatus', data: 'generating' })
      await wallet.generateWallet('password')
    }
    simba.setWallet(wallet)
    commit('SET', { type: 'walletStatus', data: 'unlocked' })
    commit('SET', { type: 'address', data: await wallet.getAddress() })
  }
}

// mutations
const mutations = {
  SET (state, payload) {
    state[payload.type] = payload.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
