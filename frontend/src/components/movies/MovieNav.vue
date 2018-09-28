<template>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a :class="{'nav-link':true, 'active': section==='discover'}"
        href="#" @click.prevent="clicked('discover')">
        Services
      </a>
    </li>

    <li class="nav-item px-5">
      <a :class="{'nav-link':true, 'active': section==='backlog'}"
        href="#" @click.prevent="clicked('backlog')">
        Favorites
      </a>
    </li>
    <li class="nav-item">
      <button type="button" class="btn">Sign Up</button>
    </li>
    <li class="nav-item px-3">
      <button type="button" class="btn">Login</button>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    clicked (section) {
      // TODO change section
      this.$store.commit('setSection', section)
    }
  },
  computed: {
    section () {
      return this.$store.state.currentSection
    }
  }
}
</script>
