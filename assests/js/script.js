// //for the tabs /RM

//Dymond script sandbox
var foodApiKey = "&app_key=d20058a43c19a20e533d6b06c2c26156";
var foodAppId = "&app_id=9fc7bc31";

var foodInputEl= $("#food-search-input")
var foodTypeEl = $("#food-search")


//For testing
var userFoodInput = "Steak";
var userFoodType = "asian";
var foodURL =

  "https://api.edamam.com/api/recipes/v2?type=public&q=" + userFoodInput
  +foodAppId +
  foodApiKey +
  "&cuisineType=" + userFoodType
  +"&mealType=Dinner&random=true";


fetch(foodURL).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {

      console.log(data)
    })
  }
})

//Handle food form submission
function getFoodApi() {

  var userFoodInput = foodInputEl.value;
  var userFoodType = foodTypeEl.value;

  var foodURL =

  "https://api.edamam.com/api/recipes/v2?type=public&q=" + userFoodInput
  +foodAppId + userFoodType
  foodApiKey +
  "&cuisineType=" +
  +"&mealType=Dinner&random=true";

   //when user inputs are true --> request api URL --> run recipe function
   if (userFoodInput && userFoodType) {
    fetch(foodURL).then(function (response) {
      if(response.ok) {
        response.json().then(function (data) {
          //run recipe function
          getFoodRecipe(data);
        })
      }
    })
  }
}

function getFoodRecipe(data) {
  //var for label, imgSmall, url, ingredientLines
  //display to html food tab
}


$("#food-btn").on("click", function(e) {
  e.preventDefault();

  getFoodApi();

}) 


//Gia script sandbox
var movieAPIKey = "k_4qje020e";
var movieContentEl = document.querySelector("#movie-results-print");
var movieForm = document.getElementById("movie-form")
var genreInput = document.getElementById("movie-search")


var testURL =
  "https://imdb-api.com/API/AdvancedSearch/k_4qje020e/?genres=action";

//append movie cards on screen
function displayMovie(movieResults) {
  // console.log(movieResults);

  var resultCard = document.createElement("div");
  resultCard.classList.add("movie-card", "background-dark", "text-light");

  var resultBody = document.createElement("div");
  resultBody.classList.add("movie-card-body");
  resultCard.append(resultBody);

  var movieImage = document.createElement("img");
  movieImage.src = movieResults.image;
  movieImage.classList.add("movie-image");
  // console.log(movieImage)

  var movieTitle = document.createElement("h1");
  movieTitle.textContent = movieResults.title;
  movieTitle.classList.add("movie-title");

  var bodyContentEl = document.createElement("div");
  bodyContentEl.classList.add("movie-content");

  var bodyContent = document.createElement("p");
  if (movieResults.contentRating) {
    bodyContent.innerHTML += "Rating: " + movieResults.contentRating + "<br/>";
  } else {
    bodyContent.innerHTML += "Ratings: No Results";
  }

  if (movieResults.genres) {
    bodyContent.innerHTML += "Genres: " + movieResults.genres + "<br/>";
  } else {
    bodyContent.innerHTML += "Genres: No Results";
  }

  if (movieResults.plot) {
    bodyContent.innerHTML += "Plot: " + movieResults.plot + "<br/>";
  } else {
    bodyContent.innerHTML += "Plot: No Results";
  }

  bodyContentEl.append(bodyContent);

  resultBody.append(movieImage, movieTitle, bodyContentEl);

  movieContentEl.append(resultCard);
}

//search IMDB API
function searchMovieAPI(genreInputVal) {

  var partialURL = "https://imdb-api.com/API/AdvancedSearch/"

  if(genreInput) {
    newMovieURL = partialURL + movieAPIKey + "/?genres=" + genreInputVal
  }

  fetch(newMovieURL)
    .then(function(response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function(data) {
      console.log(data);

      for (var i = 0; i < data.results.length; i++ ) {
        console.log(data.results[i]);
        displayMovie(data.results[i])
      }
    })
}

//getting value of user input
function handleMovieSearchSubmit(event) {
  event.preventDefault();

  var genreInputVal = document.getElementById("movie-search").value

  searchMovieAPI(genreInputVal)
}

//when submit the form gets the user input and get 
movieForm.addEventListener("submit", handleMovieSearchSubmit)

//Reed script sandbox
var drinkAPIKey = "5618241aea289752355d852d3165a903";
var appID = "f77c6a8d";
var drinkFormEl = document.querySelector("#drink-form");
var drinkSearchInputEl = document.querySelector("#drink-search-input");
var userDrinkInput = "Whiskey";
var userDrinkStyleInput = "alcohol-cocktail";

var displayToSidebar = document.querySelector("#historySidebar");
var saveDrink = document.querySelector("#save-btn");

//set up the array for drink search history
var drinkSearchHistory = JSON.parse(localStorage.getItem("drinks"));
if (!drinkSearchHistory) {
  drinkSearchHistory = [];
}
// for handling submission of the drink form
var drinkFormSubmitHandler = function (event) {
  event.preventDefault();

  //to get the user input data
  var userDrinkInput = drinkSearchInputEl.value.trim();
  //to get the API
  var querydrinkAPI =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    userDrinkInput +
    "&app_id=f77c6a8d&app_key=5618241aea289752355d852d3165a903&health=alcohol-cocktail&random=true";

  if (userDrinkInput) {
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
          let drinkPic =
            "<img class='drink-pic rounded-lg' src=" +
            drinkImage +
            " alt='Drink image'>";
          let ingreText = "<ul>";
          let source =
            "<a class='drink-ext-link' href=" +
            drinkLink +
            ">Click here for complete directions.</a>";
          let save =
            "<button class='save-recipe rounded-md p-2 mt-2' id='save-btn' onclick='createNav()'>Save Recipe</button";
          for (let i = 0; i < ingeLinesLength; i++) {
            ingreText += "<li>" + ingredientsList[i] + "</li<br>";
          }
          ingreText += "</ul>";
          //display list
          document.getElementById("drink-ingredients").innerHTML = ingreText;
          //a line for the source link
          document.getElementById("drink-image").innerHTML = drinkPic;
          drinkSource.text("Recipe from " + recipeSource + ".");
          document.getElementById("drink-link").innerHTML = source;
          document.getElementById("drink-save").innerHTML = save;

          var drink = {
            name: recipeName,
            url: drinkLink,
          };
          //set to localStorage
          drinkSearchHistory.push(drink);
          localStorage.setItem("drinks", JSON.stringify(drinkSearchHistory));
        });
      }
    });
  }
};

function createNav() {
  // get the drink name from storage on click
  for (let i = 0; i < drinkSearchHistory.length; i++) {
    console.log(drinkSearchHistory[i]);

    // display the saved recipe in the sidebar and make it clickable
    document.getElementById("savedDrinks").innerHTML =
      "<a id='savedDrink' href=" +
      drinkSearchHistory[i].url +
      " target='_blank'>" +
      drinkSearchHistory[i].name +
      "</a>";

    console.log(drinkSearchHistory);

    // }
  }
}


drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);