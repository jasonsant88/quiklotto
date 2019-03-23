<template>
  <div class="ticket">
    <div class="number" :class="drawNumbers.contains(number) ? 'drawn' : ''" v-for="(number, index) in ticket.numbers" :key="index">{{ number }}</div>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'draw_numbers']
}
</script>

<style lang="less" scoped>
  .ticket {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    margin: 40px auto;
    width: 80%;
    padding: 20px;
    border: 1px solid #bebebe;
    background: #f0f0f0;
    border-radius: 10px;

    .number {
      padding: 15px;
      max-width: 50px;
      text-align: center;
      margin: 0 auto;
      border-radius: 100%;
      font-weight: bold;
      background: #ffffff;
      color: #ffffff;
    }
  }
</style>
