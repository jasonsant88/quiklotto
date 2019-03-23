<template>
  <section>
    <Header />
    <div class="container">
      <div class="game-container">
        <div class="title text-center" v-if="$store.getters.tickets.length > 0">
          <h1>It's Game Time!!</h1>
          <h5>Click the "Let's Play" button below to start the draw. Good luck!</h5>

          <button class="btn btn-default" v-show="!inPlay" @click="playSound('https://s3.eu-west-3.amazonaws.com/quiklotto/loading.wav'); drawNumber()">Let's Play</button>

          <div class="draw" v-show="inPlay">
            <div class="drawn_numbers">
              <div v-for="(number, index) in drawNumbers" :key="index" class="number"> {{ number }} </div>
            </div>

            <figure class="ball">{{ current_draw_number }}</figure>
          </div>

          <div class="user-tickets">
            <h4>My Tickets</h4>
            <div class="betslips">
              <div class="betslip-ticket" :class="{ 'winner' : ticket.winnings }" v-for="(ticket, index) in $store.getters.tickets" :key="index">
                <div class="numbers">
                  <div class="number" :class="drawNumbers.includes(number) ? 'drawn' : ''" v-for="(number, k) in ticket.numbers" :key="k">{{ number }}</div>
                </div>
                <span class="winnings" v-if="ticket.winnings">Ticket won: {{ ticket.winnings || 0}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="title text-center" v-if="$store.getters.tickets.length == 0">
          <h1>Oh No!!</h1>
          <h5>Seems like you forgot to pick your lucky numbers!</h5>
          <p>
            <nuxt-link to="/">Click here to buy your first ticket.</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      ticketNumbers: [],
      drawNumbers: [],
      current_draw_number: null,
      inPlay: false
    }
  },

  methods: {
    playSound(sound) {
      if (sound) {
        const audio = new Audio(sound)
        audio.play()
      }
    },

    drawNumber() {
      this.inPlay = true
      console.time('draw')
      if (this.drawNumbers.length < 35) {
        const draw = setInterval(() => {
          this.current_draw_number = this.ticketNumbers[Math.floor(Math.random() * Math.floor(this.ticketNumbers.length))]
        }, 100)

        setTimeout(() => {
          clearInterval(draw)
          this.drawNumbers.push(this.current_draw_number)
          this.ticketNumbers.splice(this.ticketNumbers.indexOf(this.current_draw_number), 1)
          this.drawNumber()
        }, 250)
      } else {
        this.calculateWinnings()
      }
    },

    calculateWinnings() {
      const drawNumbers = this.drawNumbers
      this.$store.getters.tickets.forEach((ticket) => {
        ticket.guessed = 0
        ticket.numbers.forEach((number) => {
          if (drawNumbers.includes(number)) {
            ticket.guessed++
          }
        })

        if (ticket.guessed === 6) {
          this.playSound('https://s3.eu-west-3.amazonaws.com/quiklotto/numberguess.mp3')
          ticket.winnings = ticket.stake * 10
          this.$store.commit('increaseBalance', ticket.winnings)
        }
      })
      console.timeEnd('draw')
      setTimeout(() => {
        this.$store.commit('reset')
        this.$router.push('/')
      }, 10000)
    },

    initialiseTicketNumbers() {
      // Initialise array with possible numbers
      for (let i = 1; i <= 48; i++) {
        this.ticketNumbers.push(i)
      }
    }
  },

  created() {
    this.initialiseTicketNumbers()
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/global.less');
  .game-container {
    .drawn_numbers {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      padding: 80px;

      @media @mobile {
        padding: 0;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }
    }

    .ball {
      border: 1px solid #eeeeee;
      border-radius: 100px;
      margin: 30px auto;
      padding: 10px;
      width: 100px;
      height: 100px;
      font-weight: bold;
      text-align: center;
      cursor:pointer;
      color: #ffffff;
      background-color: @backgroundprimary;
      font-size: 50px;
    }
    .user-tickets {
      h4 {
        font-family: @bodyfont;
      }
      margin-top: 20px;
      .betslips {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 50px;

        @media @mobile {
          grid-template-columns: 1fr;
          grid-gap: 0px;
        }
          .betslip-ticket {
            margin: 20px auto;
            .numbers {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

              grid-gap: 10px;
              .number {
                filter: grayscale(100);
                &.drawn {
                  filter: grayscale(0);
                }
              }
            }

            &.winner {
              background-color: gold;
            }
        }
      }
    }

  }
</style>
