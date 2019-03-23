import Vue from 'vue'

Vue.mixin({
  methods: {
    playSound(sound) {
      if (sound && this.$store.getters.audio) {
        const audio = new Audio(sound)
        audio.play()
      }
    }
  }
})
