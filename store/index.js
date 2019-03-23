import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      tickets: [],
      userBalance: 100,
      audio: true
    },
    mutations: {
      addTicket(state, ticket) {
        state.tickets.push(ticket)
        state.userBalance = state.userBalance - ticket.stake
      },

      increaseBalance(state, amount) {
        state.userBalance = state.userBalance + amount
      },

      reset(state) {
        state.tickets = []
      },

      toggleAudio(state) {
        state.audio = !state.audio
      }
    },
    actions: {
      addResult(context, ticket) {
        context.commit('addTicket', ticket)
      },

      increaseBalance(context, amount) {
        context.commit('increaseBalance', amount)
      },

      reset(context) {
        context.commit('reset')
      },

      toggleAudio(context) {
        context.commit('toggleAudio')
      }
    },
    getters: {
      tickets(state) {
        return state.tickets
      },
      userBalance(state) {
        return state.userBalance
      },
      audio(state) {
        return state.audio
      }
    }
  })
}

export default createStore
