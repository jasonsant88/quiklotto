<template>
  <section>
    <Header />
    <div class="container">
        <div class="game-container">
          <div class="title text-center">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
              <h1>Welcome to QuikLotto</h1>
            </transition>
            <h2>Pick 6 numbers from the ticket below and choose your stake. Good luck!</h2>
            <h5>Number of tickets left: {{ 10 - $store.getters.tickets.length }}</h5>
          </div>
          <PlayTicket />
        </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/Header.vue'
import PlayTicket from '~/components/PlayTicket.vue'

export default {
  components: {
    Header,
    PlayTicket
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
