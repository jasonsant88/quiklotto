import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      tickets: [],
      userBalance: 100
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
      }
    },
    getters: {
      tickets(state) {
        return state.tickets
      },
      userBalance(state) {
        return state.userBalance
      }
    }
  })
}

export default createStore
