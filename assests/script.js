// //for the tabs /RM

//Dymond script sandbox
var foodApiKey = "&app_key=d20058a43c19a20e533d6b06c2c26156";
var foodAppId = "&app_id=9fc7bc31"
var userFoodInput = $("#food-search-input")
var userFoodType = $("#food-search")

var foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" +  + foodAppId + foodApiKey + "&cuisineType=" + + "&mealType=Dinner&imageSize=REGULAR&random=true&field=image&field=url&field=ingredients";



//Gia script sandbox
var movieAPIKey = "k_qc3umdyg";
var movieContentEl = document.querySelector("#movie-results-print")

var requestURL =
  "https://imdb-api.com/API/AdvancedSearch/k_qc3umdyg/?genres=action";

// var searchURL =  "https://imdb-api.com/API/AdvancedSearch/" + movieAPIKey + "/genres=" + genreInput;

function getInput() {
  $("#movie-search").each(function () {
    var input = $(this).children().val();
    console.log(this)

    if (getInput === "Select a Genre") {
      console.log("select a genre")
    };
  });
}
getInput();

//append movie cards on screen
function displayMovie(movieResults) {
  // console.log(movieResults);

  var resultCard = document.createElement("div");
  resultCard.classList.add("movie-card", "background-dark", "text-light"); 

  var resultBody = document.createElement("div");
  resultBody.classList.add("movie-card-body");
  resultCard.append(resultBody);

  var movieImage = document.createElement ("img");
  movieImage.src = movieResults.image;
  movieImage.classList.add("movie-image");
  // console.log(movieImage)

  var movieTitle = document.createElement("h1");
  movieTitle.textContent = movieResults.title;
  movieTitle.classList.add("movie-title")

  var bodyContentEl = document.createElement("div")
  bodyContentEl.classList.add("movie-content");

  var bodyContent = document.createElement("p");
  if (movieResults.contentRating) {
    bodyContent.innerHTML +=
      "Rating: " + movieResults.contentRating + "<br/>";
  } else {
    bodyContent.innerHTML +=
      "Ratings: No Results";
  }

  if (movieResults.genres) {
    bodyContent.innerHTML +=
      "Genres: " + movieResults.genres + "<br/>";
  } else {
    bodyContent.innerHTML +=
      "Genres: No Results";
  }

  if (movieResults.plot) {
    bodyContent.innerHTML +=
      "Plot: " + movieResults.plot + "<br/>";
  } else {
    bodyContent.innerHTML +=
      "Plot: No Results";
  }

  bodyContentEl.append(bodyContent)

  resultBody.append(movieImage, movieTitle, bodyContentEl)

  movieContentEl.append(resultCard)
}

//fetching URL
fetch(requestURL, {
  method: "Get",
  credential: "same-origin",
  redirect: "follow",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);

    //looping through results to get all the movie data in the genre
    // for (var i = 0; i < data.results.length; i++) {
    //   // console.log(data.results[i]);
    //   displayMovie(data.results[i]);

    displayMovie(data.results[0])

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

    // };
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

// var drinkDisplayDiv = $("#drink-ingredients")
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

// for handling submission of the drink form
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
    "&random=true";

  if (userDrinkInput || userDrinkStyleInput) {
    fetch(querydrinkAPI).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //check how the process is going
          console.log(data.hits[0].recipe.images.SMALL.url);
          console.log(userDrinkInput);
          console.log(userDrinkStyleInput);
          //here are the objetcts we need for the site
          var recipeName = data.hits[0].recipe.label;
          //ing. list,images and steps will need functions to get at all the objects within
          var ingredientsList = data.hits[0].recipe.ingredientLines;
          var recipeSource = data.hits[0].recipe.source;
          var drinkImage = data.hits[0].recipe.images.SMALL.url;
          var drinkLink = data.hits[0].recipe.url;
          var drinkSource = $("#drink-source");
          var drinkIngredients = $("#drink-ingredients");
          console.log(recipeName);

          //display the recipe
          $("#drink-title").text(recipeName);

          //ingredient list
          let ingeLinesLength = ingredientsList.length;
          let drinkPic = "<img class='drink-pic rounded-lg' src=" + drinkImage + " alt='Drink image'>"
          let ingreText = "<ul>"
          let source = "<a class='drink-ext-link' href=" + drinkLink + ">Click here for complete directions.</a>"
          for(let i = 0; i <ingeLinesLength; i++) {
            ingreText += "<li>" + ingredientsList[i] + "</li<br>";
          }
          ingreText += "</ul>";
          //display list
          document.getElementById("drink-ingredients").innerHTML = ingreText;
          //a line for the source link
          document.getElementById("drink-image").innerHTML = drinkPic;
          drinkSource.text("Recipe from " + recipeSource + ".");
          document.getElementById("drink-link").innerHTML = source;

          //set to localStorage

          localStorage.setItem("drink-recipe", recipeName);
          //add new drink to the drink array
          drinkSearchHistory.push(recipeName);

          //store updates 
          storedDrinks();

        });
      }
    });
  }
};

function init() {
  //get stored drinks from localStorage
  var storedDrinks = JSON.parse(localStorage.getItem("drink-recipe"));

  // if drinks were retrieved from storage, update the drinks to the array
  if (storedDrinks !== null) {
    drinkSearchHistory = storedDrinks;
  }
}

function storedDrinks() {
  //stringify and set key in local storage array
  localStorage.setItem("drink-recipe", JSON.stringify(drinkSearchHistory));
}

drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);

init()
