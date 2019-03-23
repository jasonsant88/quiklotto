<template>
  <section>
    <div class="header">
      <div>
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand href="#" class="brand">QuikLotto</b-navbar-brand>

          <b-navbar-toggle target="nav_collapse" />

          <b-collapse is-nav id="nav_collapse">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <a href="#" @click="toggleAudio()"><i class="fas" :class="$store.getters.audio ? 'fa-volume-up' : 'fa-volume-mute'"></i></a>
              <nuxt-link to="/">Play</nuxt-link>
              <nuxt-link to="/betslip">Betslip</nuxt-link>
              <nuxt-link to="/draw">Draw</nuxt-link>
              <span class="balance">Balance: &euro;{{ $store.getters.userBalance }}</span>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    toggleAudio() {
      this.$store.commit('toggleAudio')
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../css/global.less');

  .header {
    min-height: 450px;
    background: linear-gradient(120deg, #F8BB8F 0%, #FBD640 100%);

    @media @mobile {
      min-height: 0;
    }

    .navbar {
      background: linear-gradient(120deg, @backgroundprimary 0%, @backgroundsecondary 100%);

      .brand {
        font-size: 2rem;
        font-family: @fancyfont;

        @media @mobile {
          font-size: 1.5rem;
        }
      }

      a, .balance {
        color: #ffffff;
        padding: 10px 20px;
        font-size: 1.2rem;
        font-family: @bodyfont;

        @media @mobile {
          font-size: 1em;
        }
      }
    }
  }
</style>
