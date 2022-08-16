//Dymond script sandbox





//Gia script sandbox
var movieAPIKey = "k_4qje020e"

var requestURL = "https://imdb-api.com/API/AdvancedSearch/k_4qje020e/?genres=action,adventure"

function getInput() {
    $("#movie-search").each(function() {
        var input = $(this).text();
        console.log(input)

        if(getInput === "Select a Genre") {
            console.log("select a genre")
        };
    });
}
getInput()

fetch (requestURL, {
    method: "Get",
    credential: "same-origin",
    redirect: "follow",
})
  .then(function(response){
    return response.json();
   })
   .then (function(data){
    console.log(data)

    var movieTitle = ;
    var movieImage = ;
    var movieRating = ;
    var movieGenres = ;
    var moviePlot = ;
   })



//Reed script sandbox
var drinkAPIKey = "5618241aea289752355d852d3165a903";
var appID = "f77c6a8d";
var queryAPI = "https://api.edamam.com/api/recipes/v2?type=public&q=whiskey&app_id=f77c6a8d&app_key=5618241aea289752355d852d3165a903&health=alcohol-cocktail&imageSize=REGULAR"