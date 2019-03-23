<template>
  <section>
    <Header />
    <div class="container">
      <div class="game-container">
        <div class="title text-center">
          <h1>Your QuikLotto Betslip</h1>
          <h5>Number of tickets left: {{ 10 - $store.getters.tickets.length }}</h5>
          <BetslipTicket v-for="(ticket, index) in $store.getters.tickets" :key="index" :ticket="ticket" />

          <nuxt-link to="/" v-if="$store.getters.tickets.length < 10 && $store.getters.userBalance > 0 && $store.getters.tickets.length > 0"><button class="btn">Get more Tickets</button></nuxt-link>
          <p class="alert alert-info" v-if="$store.getters.tickets.length == 0">
            You have not yet placed any betslips. <nuxt-link to="/">Click here to buy your first ticket.</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/Header.vue'
import BetslipTicket from '~/components/BetslipTicket.vue'

export default {
  components: {
    Header,
    BetslipTicket
  },
  data() {
    return {
      ticketNumbers: 48
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/global.less');
</style>
