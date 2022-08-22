//Dymond script sandbox
//Declare global vars

var foodApiKey = "&app_key=9e715a0764f4ea504885da5433e5c920";
var foodAppId = "&app_id=69d122e0";
var foodFormEl = $("#food-form");

//Set arrays for local storage of searched and saved meals
var mealRecipeSearchHistory = JSON.parse(
  localStorage.getItem("Dinner recipe search")
);
if (!mealRecipeSearchHistory) {
  mealRecipeSearchHistory = [];
}
var savedMeals = JSON.parse(localStorage.getItem("saved meals"));
if (!savedMeals) {
  savedMeals = [];
}
//Handle submissions from drink form
function handleFoodSearchSubmit() {
  var userFoodType = $("#food-search").val();

  //Declare edamamAPI url
  var foodURL =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    foodAppId +
    foodApiKey +
    "&cuisineType=" +
    userFoodType +
    "&mealType=Dinner&random=true";

  //Request api url
  fetch(foodURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //Declare local vars from api recipe data
        var foodImg = data.hits[0].recipe.images.SMALL.url;
        var recipeLabel = data.hits[0].recipe.label;
        var ingList = data.hits[0].recipe.ingredientLines;
        var foodSource = data.hits[0].recipe.source;
        var foodLink = data.hits[0].recipe.url;

        let foodIngList = "<ul>";

        //Creat <a> and link recipe url
        let fullRecipe =
          "<a class='drink-ext-link' href=" +
          foodLink +
          ">Click here for complete directions.</a>";

        //make recipe.ingredientsLines array into <li>
        for (var i = 0; i < ingList.length; i++) {
          foodIngList += "<li class=food-ing-list>" + ingList[i] + "</li><br>";
        }
        foodIngList += "</ul>";

        //Display results on page
        $("#food-img").html($("#food-img").attr("src", foodImg));
        $("#food-label").text(recipeLabel);
        $("#food-list").html(foodIngList);
        $("#food-source").text("Recipe from " + foodSource + ".");
        $("#food-link").html(fullRecipe);
        //Make save button visibe when user submits form
        $("#food-save").removeClass("invisible");
        $("#food-save").addClass("visible");

        const mealData = {
          mealTitle: data.hits[0].recipe.label,
          mealImage: data.hits[0].recipe.images.SMALL.url,
          mealIngList: data.hits[0].recipe.ingredientLines,
          mealSource: data.hits[0].recipe.source,
          mealLink: data.hits[0].recipe.url,
        };

        //Add all saved search recipes to local storage
        mealRecipeSearchHistory.unshift(mealData);
        localStorage.setItem(
          "Dinner recipe search",
          JSON.stringify(mealRecipeSearchHistory)
        );
      });
    }
  });
}

//Local storage functions
function storeMealRecipe() {
  const savedMeal = {
    mealTitle: mealRecipeSearchHistory[0].mealTitle,
    mealImage: mealRecipeSearchHistory[0].mealImage,
    mealIngList: mealRecipeSearchHistory[0].mealIngList,
    mealSource: mealRecipeSearchHistory[0].mealSource,
    mealLink: mealRecipeSearchHistory[0].mealLink,
  };

  //Add saved recipes to local storage
  savedMeals.unshift(savedMeal);
  localStorage.setItem("saved meals", JSON.stringify(savedMeals));

  var savedRecipe = document.createElement("a");
  savedRecipe.id = "savedMeal";
  //When saved recipe is clicked, user is directed to the recipe's website
  savedRecipe.href = savedMeals[0].mealLink;
  savedRecipe.innerHTML = savedMeals[0].mealTitle;

  //Append recipe to sidebar
  $("#savedMealRecipes").append(savedRecipe);
}

//append all recipes in local storage
function addMealToSaved() {
  for (var i = 0; i < savedMeals.length; i++) {
    var savedRecipe = document.createElement("a");
    savedRecipe.id = "savedMeal";
    savedRecipe.href = savedMeals[i].mealLink;
    savedRecipe.innerHTML = savedMeals[i].mealTitle;

    $("#savedMealRecipes").append(savedRecipe);
  }
}

//Run function when form is submited
foodFormEl.on("submit", function (e) {
  e.preventDefault();

  handleFoodSearchSubmit();
});

//Run local storage function when 'save recipe' button is clicked
$($("#food-save")).on("click", function (e) {
  e.preventDefault();

  storeMealRecipe();
});

//Run function to append saved recipes to sidebar
addMealToSaved();

//Gia script sandbox
//global variables
var movieAPIKey = "k_4qje020e";
var movieContentEl = document.querySelector("#movie-results-print");
var movieForm = document.getElementById("movie-form");
var genreInput = document.getElementById("movie-search");

// var testURL =
//   "https://imdb-api.com/API/AdvancedSearch/k_4qje020e/?genres=action";

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
  var partialURL = "https://imdb-api.com/API/AdvancedSearch/";

  if (genreInput) {
    newMovieURL =
      partialURL + movieAPIKey + "/?genres=" + genreInputVal + "&count=250";
  }

  //fetching new url each time a genre input is entered
  fetch(newMovieURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);

      data.results.sort(function () {
        return Math.floor(Math.random() * 2) * 2 - 1;
      });

      data.results.splice(50);
      //looping through all movie data and pulling 5 movies
      for (var i = 0; i < 5; i++) {
        // console.log(data.results[i]);
        displayMovie(data.results[i]);
      }
    });
}

//getting value of user input
function handleMovieSearchSubmit(event) {
  event.preventDefault();

  //clears out the searches each time
  movieContentEl.innerHTML = "";

  var genreInputVal = document.getElementById("movie-search").value;

  searchMovieAPI(genreInputVal);
}

//when submit the form gets the user input and get
movieForm.addEventListener("submit", handleMovieSearchSubmit);

//Reed script sandbox
var drinkAPIKey = "da333d9db486c458f3dfb0ea2d6b6ecd";
var appID = "1e7f6e54";
var drinkFormEl = document.querySelector("#drink-form");
var drinkSearchInputEl = document.querySelector("#drink-search-input");
var userDrinkInput = drinkSearchInputEl.value.trim();

var displayToSidebar = document.querySelector("#historySidebar");
var saveDrink = document.querySelector("#save-btn");

//set up the array for drink search history and saved drink history
var allDrinkSearchHistory = JSON.parse(localStorage.getItem("all drinks"));
if (!allDrinkSearchHistory) {
  allDrinkSearchHistory = [];
}
var savedDrinkHistory = JSON.parse(localStorage.getItem("saved drinks"));
if (!savedDrinkHistory) {
  savedDrinkHistory = [];
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
          // console.log(data.hits[0].recipe.images.SMALL.url);
          // console.log(userDrinkInput);

          var drinkName = data.hits[0].recipe.label;
          var ingredientsList = data.hits[0].recipe.ingredientLines;
          var recipeSource = data.hits[0].recipe.source;
          var drinkImage = data.hits[0].recipe.images.SMALL.url;
          var drinkLink = data.hits[0].recipe.url;
          var drinkSource = $("#drink-source");

          //display the recipe
          $("#drink-title").text(drinkName);

          // console.log(ingredientsList);
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
            "<button class='save-recipe rounded-md p-2 mt-2' id='save-btn' onclick='javascript:saveDrinksToLocal();'>Save Recipe</button";
          for (let i = 0; i < ingredientsList.length; i++) {
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

          //to reduce the need for multiple fetches, drinkData saves everything I need to call back saved recipes without more fetches.
          var drinkData = {
            drinkName: data.hits[0].recipe.label,
            ingredientsList: data.hits[0].recipe.ingredientLines,
            recipeSource: data.hits[0].recipe.source,
            drinkImage: data.hits[0].recipe.images.SMALL.url,
            drinkLink: data.hits[0].recipe.url,
          };
          console.log(drinkData);
          console.log(save);
          //YEs! unshift adds an item to the beginning of an array, so I can always grab the zero position for saving drinks (without getting the whol array or making a function to get the ever changing last item..)
          allDrinkSearchHistory.unshift(drinkData);
          localStorage.setItem(
            "all drinks",
            JSON.stringify(allDrinkSearchHistory)
          );
        });
      }
    });
  }
};
// check on data status -- need to know the value of saved drinks so that I can set up the 'if' statement correctly
// console.log(allDrinkSearchHistory);
// console.log(savedDrinkHistory);

//this function gets the saved drinks into local storage
function saveDrinksToLocal() {
  // console.log(allDrinkSearchHistory[0].drinkName);

  //set to the current recipe to localStorage
  var savedDrink = {
    name: allDrinkSearchHistory[0].drinkName,
    url: allDrinkSearchHistory[0].drinkLink,
    ingredientsList: allDrinkSearchHistory[0].ingredientsList,
    recipeSource: allDrinkSearchHistory[0].recipeSource,
    drinkImage: allDrinkSearchHistory[0].drinkImage,
    drinkLink: allDrinkSearchHistory[0].drinkLink,
  };

  savedDrinkHistory.unshift(savedDrink);
  localStorage.setItem("saved drinks", JSON.stringify(savedDrinkHistory));

  var saveDrinkToSidebar = document.createElement("a");
  saveDrinkToSidebar.id = "savedDrink";
  saveDrinkToSidebar.class = "savedDrink";
  saveDrinkToSidebar.href = "javascript:displaySaved();";
  saveDrinkToSidebar.innerHTML = savedDrinkHistory[0].name;

  document.getElementById("savedDrinks").appendChild(saveDrinkToSidebar);
}

function addDrinksToSidebar() {
  for (let i = 0; i < savedDrinkHistory.length; i++) {
    var saveDrinkToSidebar = document.createElement("a");
    saveDrinkToSidebar.id = "savedDrink";
    saveDrinkToSidebar.class = "savedDrink";
    saveDrinkToSidebar.href = "javascript:displaySaved();";
    saveDrinkToSidebar.innerHTML = savedDrinkHistory[i].name;

    document.getElementById("savedDrinks").appendChild(saveDrinkToSidebar);
  }
}
// console.log(JSON.parse(localStorage.getItem("saved drinks"))[1].name);

//this function displays the saved recipes after they are clicked in the sidebar
function displaySaved() {
  // console.log($("#savedDrink"));

  // var drinkSelect = document.querySelector("#savedDrink").innerHTML;
  for (let i = 0; i < savedDrinkHistory.length; i++) {
    console.log(savedDrinkHistory[i].name);
    console.log(savedDrinkHistory[i].url);

    // var getbutton = $("#savedDrink")
    // var getSavedDrink = getbutton[0].textContent;
    // console.log(savedDrinkHistory[i].getSavedDrink.url);

    var drinkName = savedDrinkHistory[i].name;
    var drinkLink = savedDrinkHistory[i].url;
    var ingredientsList = savedDrinkHistory[i].ingredientsList;
    var recipeSource = savedDrinkHistory[i].recipeSource;
    var drinkImage = savedDrinkHistory[i].drinkImage;
    var drinkSource = $("#drink-source");

    //display the recipe
    $("#drink-title").text(drinkName);

    //ingredient list
    let drinkPic =
      "<img class='drink-pic rounded-lg' src=" +
      drinkImage +
      " alt='Drink image'>";
    let ingreText = "<ul>";
    let source =
      "<a class='drink-ext-link' href=" +
      drinkLink +
      " target='_blank'" +
      ">Click here for complete directions.</a>";
    for (let i = 0; i < ingredientsList.length; i++) {
      ingreText += "<li>" + ingredientsList[i] + "</li<br>";
    }
    ingreText += "</ul>";
    //display list
    document.getElementById("drink-ingredients").innerHTML = ingreText;
    //a line for the source link
    document.getElementById("drink-image").innerHTML = drinkPic;
    drinkSource.text("Recipe from " + recipeSource + ".");
    document.getElementById("drink-link").innerHTML = source;
  }
}

drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);

//running this function here will show all saved drink history in the sidebar upon refresh
//this function appends the saved recipes to the html sidebar

addDrinksToSidebar();
