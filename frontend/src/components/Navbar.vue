<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#" onclick="location.reload();"><img src="../assets/servicify.png" height="55px" width="auto"> </a>

    <button class="navbar-toggler" @click="collapse=!collapse" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="{'collapse':collapse, 'navbar-collapse':true}">
      <ul class="navbar-nav">
        <!--<navbar-link to="/" label="All services"/>-->
        <!--<navbar-link to="/movies" label="Movies"/>-->
        <movie-bar/>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <button type="button" class="btn">Login</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import NavbarLink from './NavbarLink'
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
