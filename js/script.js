var app = new Vue ({

  el: "#app",

  data: {
    movies: [],
    posterPath: "https://image.tmdb.org/t/p/w220_and_h330_face/",
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
