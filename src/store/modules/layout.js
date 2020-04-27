// initial state
const state = {
  snackbar: null,
  drawer: false,

  carRegWindow: false,
  carInfoWindow: false,
  currentSelectedCarId: null,

  helpDocWindow: false
}

// getters
const getters = {}

// actions
const actions = {

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
