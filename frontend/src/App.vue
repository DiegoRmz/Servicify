<template>
  <div id="app">
    <navbar/>
    <router-view/>
    <footerbar/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import TodoPage from './components/movies/MoviePage'
import Footerbar from './components/Footerbar'
export default {
  name: 'App',
  components: {
    Navbar,
    TodoPage,
    Footerbar
  }
}
</script>
