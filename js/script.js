var app = new Vue ({

  el: "#app",

  data: {
    movies: [],
    PosterPath : "https://image.tmdb.org/t/p/w220_and_h330_face/"
  },

  methods: {

  },

  mounted: function() {

    axios
      .get("")
      .then( result => {
        this.movies = result.data.response;
    });

  }

});
