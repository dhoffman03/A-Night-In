//Dymond script sandbox

//Gia script sandbox
var movieAPIKey = "k_4qje020e";
var movieContentEl = document.querySelector("#movie-results-print")

var requestURL =
  "https://imdb-api.com/API/AdvancedSearch/k_4qje020e/?genres=action,adventure";

function getInput() {
  $("#movie-search").each(function () {
    var input = $(this).text();
    console.log(input)

    if (getInput === "Select a Genre") {
      console.log("select a genre")
    };
  });
}
getInput();

function displayMovie(movieResults) {
  console.log(movieResults);

  var resultCard = document.createElement("div");
  resultCard.classList.add("movie-card", "background-dark", "text-light", "search-form", "p-7", "m-5", "rounded-lg", "custom-form");

  var resultBody = document.createElement("div");
  resultBody.classList.add("movie-card-body");
  resultCard.append(resultBody);

  var movieTitle = document.createElement("h1");
  movieTitle.textContent = movieResults.title;
  movieTitle.classList.add("movie-title")
  console.log(movieTitle)

  var imageCard = document.createElement("div");
  imageCard.classList.add("movie-image")

  var movieImage = document.createElement ("img")
  movieImage.src = movieResults.image;
  movieImage.setAttribute("height", "25%")
  movieImage.setAttribute("width", "15%")
  imageCard.append(movieImage)
  console.log(movieImage)


  var bodyContent = document.createElement("p")
  if (movieResults.contentRating) {
    bodyContent.innerHTML +=
      "<strong>Rating:</strong> " + movieResults.contentRating + "<br/>";
  } else {
    bodyContent.innerHTML +=
      "<strong>Ratings:</strong> No Results";
  }

  if (movieResults.genres) {
    bodyContent.innerHTML +=
      "<strong>Genres:</strong> " + movieResults.genres + "<br/>";
  } else {
    bodyContent.innerHTML +=
      "<strong>Genres:</strong> No Results";
  }

  if (movieResults.plot) {
    bodyContent.innerHTML +=
      "<strong>Plot:</strong> " + movieResults.plot + "<br/>";
  } else {
    bodyContent.innerHTML +=
      "<strong>Plot:</strong> No Results";
  }

  resultBody.append(movieTitle, imageCard, bodyContent)

  movieContentEl.append(resultCard)
}


fetch(requestURL, {
  method: "Get",
  credential: "same-origin",
  redirect: "follow",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.results);

    for (var i = 0; i < data.results.length; i++) {
      // console.log(data.results[i]);
      displayMovie(data.results[i]);

      // var movieTitle = data.results[0].title;
      // console.log(movieTitle)
      // var movieImage = data.results[0].image;
      // console.log(movieImage)
      // var movieRating = data.results[0].contentRating;
      // console.log(movieRating)
      // var moviePlot = data.results[0].plot;
      // console.log(moviePlot)
      // var movieGenres = data.results[0].genres;
      // console.log(movieGenres)

    };
  });

//Reed script sandbox
var drinkAPIKey = "5618241aea289752355d852d3165a903";
var appID = "f77c6a8d";
var drinkFormEl = document.querySelector("#drink-form");
var drinkSearchInputEl = document.querySelector("#drink-search-input");
var drinkStyleSearchEl = document.querySelector("#drink-search");
var userDrinkInput = "Whiskey";
var userDrinkStyleInput = "alcohol-cocktail";
var querydrinkAPI =
  "https://api.edamam.com/api/recipes/v2?type=public&q=" +
  userDrinkInput +
  "&app_id=f77c6a8d&app_key=5618241aea289752355d852d3165a903&health=" +
  userDrinkStyleInput +
  "&imageSize=REGULAR";

//a place to store the saved drinks(a fridge @_@;)
var drinkSearchHistory = [];

//for tracking the data during the build
fetch(querydrinkAPI).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  }
});

//for handling submission of the drink form
var drinkFormSubmitHandler = function (event) {
  event.preventDefault();

  //to get the user input data
  var userDrinkInput = drinkSearchInputEl.value.trim();
  var userDrinkStyleInput = drinkStyleSearchEl.value.trim();
  //to get the API
  var querydrinkAPI =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    userDrinkInput +
    "&app_id=f77c6a8d&app_key=5618241aea289752355d852d3165a903&health=" +
    userDrinkStyleInput +
    "&imageSize=REGULAR";

  if (userDrinkInput || userDrinkStyleInput) {
    fetch(querydrinkAPI).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //check how the process is going
          console.log(data);

          //here are the objetcts we need for the site
          var recipeName = $(data.hits[0].recipe.label);
          //ing. list,images and steps will need functions to get at all the objects within
          var ingredientsList = $(data.hits[0].recipe.ingredientLines);
          var recipeSteps = $(data.hits[0].recipe.ingredients);
          var recipeSource = $(data.hits[0].recipe.source);
          var recipeImage = $(data.hits[0].recipe.images);
          // var recipeLink = $(data.hits[0].recipe.url); this line isn't working for some reason..


        });
      }
    });
  }
};

drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);
