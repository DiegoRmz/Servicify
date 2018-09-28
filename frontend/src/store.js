import Vue from 'vue'
import Vuex from 'vuex'
import MovieService from './services/MovieService'

// Plugins
import createPersistedState from 'vuex-persistedstate'
const vuexLocalStorage = createPersistedState({
  key: 'movies-semanai'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hello: 'world',
    movies: [],
    genres: [],
    selectedGenre: null,
    currentPage: 1,
    pages: 1,
    loading: false,
    currentSection: 'discover',
    savedMovies: []
  },
  actions: {
    fetchMovies (context, page = 1) {
      context.commit('setLoading', true)
      MovieService.getMovies({
        page,
        genre: context.state.selectedGenre
      })
      .then(response => {
        context.commit('setMovies', response.data)
      }).finally(() => {
        context.commit('setLoading', false)
      })
    },
    fetchGenres (context) {
      MovieService.getGenres()
      .then(response => {
        context.commit('setGenres', response.data)
      })
    },
    fetchByGenre (context, genre) {
      context.commit('setSelectedGenre', genre)
      context.dispatch('fetchMovies')
    },
    fetchPage (context, page) {
      context.dispatch('fetchMovies', page)
    }
  },
  mutations: {
    setMovies (state, movieData) {
      state.movies = movieData.results
      state.currentPage = movieData.page
      state.pages = movieData.total_pages
    },
    setGenres (state, genresData) {
      state.genres = genresData.genres
    },
    setSelectedGenre (state, genre) {
      state.selectedGenre = genre
    },
    setLoading (state, isLoading) {
      state.loading = isLoading
    },
    setSection (state, section) {
      state.currentSection = section
    },
    saveMovie (state, movieObject) {
      state.savedMovies.push(movieObject)
    },
    removeMovie (state, movieObject) {
      const movieIndex = this.getters.savedMoviesIds.indexOf(movieObject.id)
      if (movieIndex >= 0) {
        state.savedMovies.splice(movieIndex, 1)
      }
    }
  },
  getters: {
    movieCards (state) {
      if (state.currentSection === 'backlog') {
        return state.savedMovies
      }

      const imageBasePath = 'http://image.tmdb.org/t/p/w370_and_h556_bestv2'
      return state.movies.map(movie => {
        return {
          id: movie.id,
          image: `${imageBasePath}${movie.poster_path}`,
          title: movie.title,
          description: movie.overview,
          voteAverage: movie.vote_average
        }
      })
    },
    selectedGenreName (state) {
      const selectedGenre = state.genres.filter(genre => genre.id === state.selectedGenre)
      return selectedGenre[0] ? selectedGenre[0].name : null
    },
    savedMoviesIds (state) {
      if (!state.savedMovies) return []
      return state.savedMovies.map(movie => movie.id)
    }
  },
  plugins: [
    vuexLocalStorage
  ]
})
