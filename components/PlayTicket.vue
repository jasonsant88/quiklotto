<template>
  <div class="wrapper">
    <transition name="pulse-number" enter-active-class="animated bounceIn">
      <div class="ticket" v-show="showTicket" v-if="$store.getters.tickets.length < 10 && $store.getters.userBalance > 0">
        <div class="header">Your Lucky Ticket</div>
        <div class="numbers">
            <div class="number" :class="{'chosen' : chosenNumbers.includes(n)}" v-for="n in ticketNumbers" :key="n" @click="addRemoveNumber(n)">
                <span>{{ n }}</span>
            </div>
        </div>
      </div>
    </transition>
    <p class="alert alert-danger" v-if="$store.getters.tickets.length == 10">Ticket played limit reached.</p>
    <p class="alert alert-danger" v-if="$store.getters.userBalance == 0">Insufficient Balance</p>
    <p class="alert alert-success" v-if="success">{{ success }}</p>
    <p class="alert alert-danger" v-if="error">{{ error }}</p>

    <div class="stake" v-if="chosenNumbers.length == 6">
      <div class="form-group">
        <label>Place your bet</label>
        <input
        class="form-control"
        type="number"
        step="1"
        min="1"
        max="100"
        placeholder="Enter the amount of money you want to bet"
        v-model="stake"
        />
      </div>
      <button class="btn btn-block" v-show='stake' @click="buyTicket">Buy Ticket</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticketNumbers: 48,
      maximumNumberOfChoices: 6,
      chosenNumbers: [],
      stake: '',
      error: '',
      success: '',
      showTicket: false
    }
  },
  methods: {
    resetMessages() {
      this.error = ''
      this.success = ''
    },

    addRemoveNumber(n) {
      this.resetMessages()
      if (this.chosenNumbers.includes(n)) {
        // Check if number is already included. If included then remove
        this.chosenNumbers.splice(this.chosenNumbers.indexOf(n), 1)
      } else if (this.chosenNumbers.length < this.maximumNumberOfChoices) {
        // If not included then verify that ticket is not full and add
        this.chosenNumbers.push(n)
        this.playSound('https://s3.eu-west-3.amazonaws.com/quiklotto/ding.wav')
      } else {
        this.displayError('You have reached the maximum numbers for this ticket. Please choose your wager and create a new ticket.')
        this.playSound('https://s3.eu-west-3.amazonaws.com/quiklotto/denied.wav')
      }
    },

    buyTicket() {
      this.resetMessages()
      if (this.stake > this.$store.getters.userBalance) {
        this.displayError('Insufficient Balance.')
      } else {
        this.$store.commit('addTicket', {
          numbers: this.chosenNumbers,
          stake: this.stake
        })
        this.chosenNumbers = []
        this.stake = ''
        this.displaySuccess('Ticket has been added to your ticket list.')
        this.playSound('https://s3.eu-west-3.amazonaws.com/quiklotto/buyticket.wav')
        setTimeout(() => {
          this.success = ''
        }, 3000)
      }
    },

    displayError(error) {
      this.error = error
    },

    displaySuccess(success) {
      this.success = success
    }
  },

  created() {
    setTimeout(() => {
      this.showTicket = true
      this.showNumbers = true
    }, 0)
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/global.less');
  .wrapper {
    width: 60%;
    margin: 40px auto;
    @media @mobile {
      width:100%;
    }

    .ticket {
      margin-bottom: 40px;
      box-shadow: @shadow;

      .header {
        font-size: 20px;
        background: linear-gradient(120deg, #FFB427 0%, #FF9239 100%);
        text-align: center;
        font-weight: bold;
        color: #fff;
        padding: 10px;
      }

      .numbers {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        padding: 20px;
        grid-gap: 20px;

        @media @mobile {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          padding: 10px;
          grid-gap: 10px;
        }

        @media @tablet {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          padding: 10px;
          grid-gap: 10px;
        }
      }
    }

    label {
      font-weight: bold;
    }

    .form-control {
      font-size: 1.5rem;

      @media @mobile {
        font-size: 0.8rem;
      }
    }
  }
</style>
