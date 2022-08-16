//Dymond script sandbox

//Gia script sandbox
var movieAPIKey = "k_4qje020e";

var requestURL =
  "https://imdb-api.com/API/AdvancedSearch/k_4qje020e/?genres=action,adventure";

function getInput() {
    $("#movie-search").each(function() {
        var input = $(this).text();
        console.log(input)

        if(getInput === "Select a Genre") {
            console.log("select a genre")
        };
    });
}
getInput();

fetch(requestURL, {
  method: "Get",
  credential: "same-origin",
  redirect: "follow",
})
  .then(function (response) {
    return response.json();
})
  .then(function(data){
    console.log(data);

    var movieTitle = $(data.results[0].title);
    console.log(movieTitle)
    var movieImage = $(data.results.image);
    var movieRating = $(data.results.contentRating);
    var moviePlot = $(data.results.plot);
    var movieGenres = $(data.results.genres);
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
