var app = new Vue ({

  el: "#app",

  data: {
    movies: [],
    posterPath: "https://image.tmdb.org/t/p/w342/",
    userInput: ""
  },

  methods: {

    search() {

      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "149f6f231b74bbad3f1401daa78a4cce",
            query: this.userInput,
            language: "it-IT"
          }
        })
        .then( result => {
          this.movies = result.data.results;
      });

      axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: "149f6f231b74bbad3f1401daa78a4cce",
            query: this.userInput,
            language: "it-IT"
          }
        })
        .then( result => {
          this.movies = this.movies.concat(result.data.results);
          this.convertVoteAverage();
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

    }

  },

  // mounted: function() {
  //
  //   axios
  //     .get("https://api.themoviedb.org/3/search/movie", {
  //       params: {
  //         api_key: "149f6f231b74bbad3f1401daa78a4cce",
  //         query: "ritorno+al+futuro",
  //         language: "it-IT"
  //       }
  //     })
  //     .then( result => {
  //       this.movies = result.data.results;
  //   });
  //
  // }

});
