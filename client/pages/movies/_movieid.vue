<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <v-btn
      class="mb-5"
      color="primary"
      elevation="2"
      :to="{ name: 'streaming' }"
    >
      <v-icon>mdi-keyboard-backspace</v-icon>
    </v-btn>
    <div class="movie-info">
      <div class="movie-img">
        <v-img
          max-width="500"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString("en-us", {
              style: "currency",
              currency: "USD",
            })
          }}
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";

export default {
  name: "singleMovie",
  async fetch() {
    await this.getSingleMovie();
  },

  // delay for fetching
  fetchDelay: 1000,

  head() {
    return {
      title: this.movie.title,
    };
  },

  data() {
    return {
      movie: "",
    };
  },
  methods: {
    async getSingleMovie() {
      const data = this.$axios.get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`
      );
      const result = await data;
      this.movie = result.data;
    },
  },
};
</script>
