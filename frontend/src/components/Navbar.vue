<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand px-5" href="#" onclick="location.reload();"><img src="../assets/servicify.png" height="45px" width="auto"> </a>

    <button class="navbar-toggler" @click="collapse=!collapse" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="{'collapse':collapse, 'navbar-collapse':true}">
      <ul class="navbar-nav ml-auto">
        <!--<navbar-link to="/" label="All services"/>-->
        <!--<navbar-link to="/movies" label="Movies"/>-->
        <movie-bar/>
      </ul>
    </div>
  </nav>
</template>

<script>
//import NavbarLink from './NavbarLink'
import MovieBar from './movies/MovieNav'
export default {
  components: {
    //NavbarLink,
    MovieBar
  },
  data () {
    return {
      collapse: true
    }
  }
}
</script>
