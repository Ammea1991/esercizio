<template>
  <Loading v-if="showHideSpinner" />
  <div v-else class="home">
    <v-alert
      outlined
      :value="alert.show"
      dismissible
      elevation="3"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
    <!-- Movies -->
    <div class="container movies">
      <!-- Now Streaming  -->
      <div id="movie-grid" class="movies-grid">
        <v-card
          elevation="3"
          class="movie"
          v-for="(movie, index) in movies"
          :key="index"
        >
          <div class="movie-img">
            <v-img
              aspect-ratio="1"
              contain
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            >
              <p class="review">{{ movie.vote_average }}</p>
              <p class="overview">{{ movie.overview }}</p>
              <p class="bookmark" @click="addBookmark(index)">
                <v-icon v-if="bookma">mdi-bookmark</v-icon>
                <v-icon v-else>mdi-bookmark-outline</v-icon>
              </p>
            </v-img>
          </div>
          <div class="movie-info">
            <v-card-title class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </v-card-title>
            <v-card-subtitle class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </v-card-subtitle>
            <div>
              <v-card elevation="0" class="d-flex mb-2">
                <v-card elevation="0" class="pa-2 mr-auto">
                  <v-btn
                    color="primary"
                    :to="{ name: 'movies-id', params: { id: movie.id } }"
                  >
                    More Info +
                  </v-btn>
                </v-card>
              </v-card>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import global from "~/mixins.js/global.js";
import Loading from "~/components/Loading";

export default {
  mixins: [global],
  components: {
    Loading,
  },
  data: () => ({
    bookma: false,
    bookmark: [],
  }),
  mounted() {
    this.getMovies();
  },
  methods: {
    async addBookmark(param) {
      this.bookma = true;
      this.bookmark.push({ id: param });
    },
  },
};
</script>
