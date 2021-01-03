const apiKey = "149f6f231b74bbad3f1401daa78a4cce";
let languageChoice = "it-IT";

var app = new Vue ({

  el: "#app",

  data: {
    movies: [],
    userInput: "",
    genresMovies: []
  },

  methods: {

    search() {

      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: apiKey,
            query: this.userInput,
            language: languageChoice
          }
        })
        .then( result => {
          this.movies = result.data.results;

          // Cast
          for (let i = 0; i < this.movies.length; i++) {
            const item = this.movies[i];
            item.cast = [];

            axios
              .get(`https://api.themoviedb.org/3/movie/${item.id}/credits`, {
                params: {
                  api_key: apiKey,
                }
              })
              .then( result => {
                for (let i = 0; i < result.data.cast.length; i++) {
                  if (item.cast.length < 5) {
                    item.cast.push(result.data.cast[i].name);
                  }
                }
                this.$forceUpdate();
            });

            // Genres
            for (let j = 0; j < this.movies[i].genre_ids.length; j++) {

              for (let k = 0; k < this.genresMovies.length; k++) {
                if (this.movies[i].genre_ids[j] == this.genresMovies[k].id) {
                  this.movies[i].genre_ids[j] = this.genresMovies[k].name;
                }
              }

            }
            this.$forceUpdate();

          }

      });

      axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: apiKey,
            query: this.userInput,
            language: languageChoice
          }
        })
        .then( result => {
          this.movies = this.movies.concat(result.data.results);
          this.convertVoteAverage();

          // Cast
          for (let i = 0; i < this.movies.length; i++) {
            const item = this.movies[i];
            item.cast = [];

            axios
              .get(`https://api.themoviedb.org/3/tv/${item.id}/credits`, {
                params: {
                  api_key: apiKey,
                }
              })
              .then( result => {
                for (let i = 0; i < result.data.cast.length; i++) {
                  if (item.cast.length < 5) {
                    item.cast.push(result.data.cast[i].name);
                  }
                }
                this.$forceUpdate();
            });

            // Genres
            for (let j = 0; j < this.movies[i].genre_ids.length; j++) {

              for (let k = 0; k < this.genresMovies.length; k++) {
                if (this.movies[i].genre_ids[j] == this.genresMovies[k].id) {
                  this.movies[i].genre_ids[j] = this.genresMovies[k].name;
                }
              }

            }
            this.$forceUpdate();

          }

      });

    },

    convertVoteAverage() {

      this.movies.forEach( movie => {
        movie.vote_average = Math.ceil(movie.vote_average / 2)
      });

    },

    languageToFlag(movie) {

      switch (movie.original_language) {
        case "it":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png";
        case "en":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png";
        case "es":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png";
        case "fr":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png";
        default:
          return "https://www.artecreo.it/3681/prodotto-non-disponibile.jpg";
      }

    },

    getPosterPath(movie) {

      if (movie.poster_path !== null) {
        return "https://image.tmdb.org/t/p/w342/" + movie.poster_path;
      } else {
        return "https://i.pinimg.com/originals/d3/8c/87/d38c87b8f94c3d0417a632d82cdf752b.png";
      }

    }

  },

  mounted: function() {

    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: apiKey,
          language: languageChoice
        }
      })
      .then( result => {
        this.genresMovies = result.data.genres;
    });

    axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        params: {
          api_key: apiKey,
          language: languageChoice
        }
      })
      .then( result => {
        this.genresMovies = this.genresMovies.concat(result.data.genres);
    });

  }

});
