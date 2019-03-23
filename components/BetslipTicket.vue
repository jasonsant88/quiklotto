<template>
  <section>
    <div class="betslip-ticket">
      <div class="number" v-for="(number, index) in ticket.numbers" :key="index">{{ number }}</div>
    </div>
    <span class="winnings" v-if="ticket.winnings">Ticket won: {{ ticket.winnings || 0}}</span>
  </section>
</template>

<script>
export default {
  props: ['ticket']
}
</script>

<style lang="less" scoped>
  @import url('../css/global.less');
</style>
