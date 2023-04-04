// This file runs when the user lands on the search-results.html 
// page after submitting the form in the script.js file.


recipeOutput = document.querySelector('#recipes');

// api KEYS for Spoonacular
// If you get error 402, rotating to a new key
// Limit is 150 calls per day
//var apiKey = "0d5211b3d5ad40da820938ae55017af1"; // Tifni
//var apiKey = "45c6a7194e1245fe9dafafb7ccb5c20f" // BreeAnn
//var apiKey = "e8f4fbaee191412ebf5f8768cfb7e9fa" // Bill
var apiKey = "67c16e203ad04f6295ec9d77abb5cb68" // David

// api KEYS for Giphy, limit?
var giphyKey = "IajHaZagRh0q9o7Rd7K7kXBo8gcIFogM"; // BreeAnn
var giphyKey = "KnVF7VtjV4lwzxMznTgH2xA4rbz0PnBS" // Bill

// array to hold recipes
recipeArr = [];

// This function parses the query parameters
function getParams() {

    console.log("Inside display-search.js");
    // Get the search params out of the URL (?q=eggs)
    var searchParamsArr = document.location.search.split('?');

    // Get the query value
    var query = searchParamsArr[1].split('=').pop();
    console.log("Query is : ", query);

    recipeOutput.innerHTML = query;
    searchApi(query);
};


var getRecipeApi = function (id, url) {
    // GET https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
    var apiUrl = 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false' + '&apiKey=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (recData) {
                    console.log("Returned data is :", recData);
                    url = recData.spoonacularSourceUrl;
                    console.log("Recipe URL is :", url);
                })
                    .catch(function (error) {
                        alert('Unable to connect to Spoonacular');
                        throw error;
                    });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Spoonacular');
        });
}; // END searchApi




function searchApi(searchEl) {
    //GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
    //GET https://api.spoonacular.com/recipes/complexSearch
    console.log("Searching with :", searchEl);

    var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch' + '?apiKey=' + apiKey + '&query=' + searchEl;
    // var apiUrl = 'https://api.spoonacular.com/recipes/716429/information' + '?apiKey=' + apiKey + "&query=" + searchEl;

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log("Returned data is :", data);
                    var length = 9;

                    // Each call returns 10 recipes
                    for (var i = 0; i < length; i++) {
                        // Pull out dta
                        var recipeTitle = data.results[i].title;
                        var recipeImg = data.results[i].image;
                        var recipeId = data.results[i].id;
                        var recipeUrl = "";
                        getRecipeApi(recipeId, recipeUrl);

                        var recipeObj = {
                            title: "",
                            img: "",
                            id: "",
                            url: ""
                        }
                        console.log("Recipe title is : ", recipeTitle);
                        recipeObj.title = recipeTitle;
                        recipeObj.img = recipeImg;
                        recipeObj.id = recipeId;
                        recipeObj.url = recipeUrl;
                        //debugger;
                        recipeArr.push(recipeObj);
                    }

                    console.log("Recipe Array is :", recipeArr);
debugger;
                    // Print the recipes name to the display
                    for (var i = 0; i < recipeArr.length; i++) {
                         title = recipeArr[i].title;
                     var recipeHtml = '<div class="recipe">' + title + '</div>';
                     var image = recipeArr[i].img;
                     recipeHtml += 
                    '<div class="recipe">'
                     '<h2>' + title + '</h2>'
                     '<img src="' + image + '" alt="' + title + '">'
                    //  '<p>Ingredients: ' + ingredientsList + '</p>'
                    '</div>'
                    
                    }
                });
            };
        });
    // List names of recipes 
    recipeOutput.innerHTML = recipeHtml;
}
// Make a button here SHOW MORE



getParams();



