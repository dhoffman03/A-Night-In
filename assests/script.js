//Dymond script sandbox





//Gia script sandbox






//Reed script sandbox
var drinkAPIKey = "5618241aea289752355d852d3165a903";
var appID = "f77c6a8d";
// var queryAPI = "https://api.edamam.com/api/recipes/v2?type=public&q=whiskey&app_id=f77c6a8d&app_key=5618241aea289752355d852d3165a903&health=alcohol-cocktail&imageSize=REGULAR"

var drinkSearchInputEl = document.querySelector("#drink-search-input");
var drinkStyleSearchEl = document.querySelector("#drink-search");
var userDrinkInput = "Whiskey";
// drinkSearchInputEl.value.trim();
var userDrinkStyleInput = "alcohol-cocktail";
//drinkStyleSearchEl.value.trim();
var querydrinkAPI = "https://api.edamam.com/api/recipes/v2?type=public&q=" + userDrinkInput + "&app_id=f77c6a8d&app_key=5618241aea289752355d852d3165a903&health=" + userDrinkStyleInput + "&imageSize=REGULAR";



fetch(querydrinkAPI)
.then(function(response){
    if(response.ok) {
        response.json().then(function(data){
        
        console.log(data);
        
        //here are the objetcts we need for the site
        var recipeName = $(data.hits[0].recipe.label);
        //ing. list,images and steps will need functions to get at all the objects within
        var ingredientsList = $(data.hits[0].recipe.ingredientLines);
        var recipeSteps = $(data.hits[0].recipe.ingredients);
        var recipeSource = $(data.hits[0].recipe.source);
        var recipeImage = $ (data.hits[0].recipe.images);
        // var recipeLink = $(data.hits[0].recipe.url); this line isn't working for some reason..

    })
    
    };
})