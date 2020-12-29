const apiKey = "149f6f231b74bbad3f1401daa78a4cce";
let languageChoice = "it-IT";

var app = new Vue ({

  el: "#app",

  data: {
    movies: [],
    userInput: ""
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
          for (var i = 0; i < this.movies.length; i++) {
            const item = this.movies[i];
            item.cast = [];

            axios
              .get(`https://api.themoviedb.org/3/movie/${item.id}/credits`, {
                params: {
                  api_key: apiKey,
                }
              })
              .then( result => {
                for (var i = 0; i < result.data.cast.length; i++) {
                  if (item.cast.length < 5) {
                    item.cast.push(result.data.cast[i].name);
                  }
                }
                this.$forceUpdate();
            });

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
          for (var i = 0; i < this.movies.length; i++) {
            const item = this.movies[i];
            item.cast = [];

            axios
              .get(`https://api.themoviedb.org/3/tv/${item.id}/credits`, {
                params: {
                  api_key: apiKey,
                }
              })
              .then( result => {
                for (var i = 0; i < result.data.cast.length; i++) {
                  if (item.cast.length < 5) {
                    item.cast.push(result.data.cast[i].name);
                  }
                }
                this.$forceUpdate();
            });

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

});
