// This file runs when the user lands on the search-results.html 
// page after submitting the form in the script.js file.

// api KEYS for Spoonacular
// If you get error 402, rotating to a new key
// Limit is 150 calls per day
//var apiKey = "0d5211b3d5ad40da820938ae55017af1"; // Tifni
//var apiKey = "45c6a7194e1245fe9dafafb7ccb5c20f" // BreeAnn
var apiKey = "e8f4fbaee191412ebf5f8768cfb7e9fa" // Bill
//var apiKey = "67c16e203ad04f6295ec9d77abb5cb68" // David

// api KEYS for Giphy, limit?
var giphyKey = "IajHaZagRh0q9o7Rd7K7kXBo8gcIFogM"; // BreeAnn
var giphyKey = "KnVF7VtjV4lwzxMznTgH2xA4rbz0PnBS" // Bill

// SHOW MORE recipes button
var generateBtn = document.getElementById("show-more");

// array to hold recipes
recipeArr = [];

// User's search input
var query;


// This function parses the query parameters
function getParams() {
    // Get the search params out of the URL (?q=eggs)
    var searchParamsArr = document.location.search.split('?');

    // Get the query value
    query = searchParamsArr[1].split('=').pop();
    console.log("Query is : ", query);

    searchApi(query);
};

// Render the recipes to the page
function printRecipeResults() {

    var recipeOutput = document.querySelector('#recipes');
    // Create a header element
    var header = document.createElement("h2");
    header.textContent = "Query Results - click on text for recipe";
    recipeOutput.appendChild(header);

    for (var i = 0; i < recipeArr.length; i++) {
        var title = recipeArr[i].title;
        var img = recipeArr[i].img;
        var url = recipeArr[i].url;

        var recipeHtml = '<br><a href="' + url + '">' + title + '</a>\n<img src="' + img + '"><br>';

        // <a class = "card" href = {url}>TITLE,</a>
        // <img src="file.jpg">
        recipeOutput.innerHTML += recipeHtml;
    }pu
};

var offset=0;
// Call Spoonacular API using the query parameters input by user
async function searchApi(searchEl) {
    console.log("Searching with :", searchEl);

// Make API call with the current offset
var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch' + '?apiKey=' 
+ apiKey + '&query=' + searchEl + '&number=10&offset=' + offset;

    console.log(apiUrl);

    try {
        var response = await fetch(apiUrl);
        if (response.ok) {
            var data = await response.json();
            console.log("Returned data is :", data);
            var length = data.results.length;

         //   recipeArr.length = 0;
            for (var i = 0; i < length; i++) {
                var recipeTitle = data.results[i].title;
                var recipeImg = data.results[i].image;
                var recipeId = data.results[i].id;

                var recipeObj = {
                    title: recipeTitle,
                    img: recipeImg,
                    id: recipeId,
                    url: ''
                }
                console.log("Recipe title is : ", recipeTitle);
                //recipeObj.url = await getRecipeApi(recipeId, recipeUrl);
                //debugger;
                recipeObj.url = `https://spoonacular.com/${recipeTitle
                    .toLowerCase()
                    .replace(" ", "-")}-${recipeId}`;
                recipeArr.push(recipeObj);
            }

            console.log("Recipe Array is :", recipeArr);

            printRecipeResults();

        } else {
            alert('Error: ' + response.statusText);
        }
    } catch (error) {
        alert('Unable to connect to Spoonacular');
    }
}; // END searchApi

// Call API to retreive recipes
function getMoreRecipes() {
    console.log("Button clicked, searching for more :", query);
    offset +=10;
    console.log ("Offset is :", offset);
    recipeArr.length = 0;
    searchApi(query); // How does spoonacular give us the next batch of recipes? Same ones keep coming up
}

// Listen for click if user wants more recipes
generateBtn.addEventListener("click", getMoreRecipes);

// Parse query params input by user from homepage
getParams();




