// This file runs when the user lands on the search-results.html 
// page after submitting the form in the script.js file.



// api KEYS for Spoonacular
// If you get error 402, rotating to a new key
// Limit is 150 calls per day
var apiKey = "0d5211b3d5ad40da820938ae55017af1"; // Tifni
//var apiKey = "45c6a7194e1245fe9dafafb7ccb5c20f" // BreeAnn
//var apiKey = "e8f4fbaee191412ebf5f8768cfb7e9fa" // Bill
//var apiKey = "67c16e203ad04f6295ec9d77abb5cb68" // David

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

    searchApi(query);
};

function printRecipeResults() {

    var recipeOutput = document.querySelector('#recipes');
    // Create a header element
    var header = document.createElement("h2");
    header.textContent = "Recipes Found";
    recipeOutput.appendChild(header);

    for (var i = 0; i < recipeArr.length; i++) {
        var title = recipeArr[i].title;
        var img = recipeArr[i].img;
        var url = recipeArr[i].url;

        var recipeHtml = '<a href="' + url + '">' + title + '</a>\n<img src="' + img + '">\n\n';

        // <a class = "card" href = {url}>TITLE,</a>
        // <img src="file.jpg">
        recipeOutput.innerHTML += recipeHtml;
    }

    var showMoreBtn = document.createElement("button");
    showMoreBtn.textContent = "Show More";
    var recipeHtmlTitle = '<h2>Recipes Found</h2>;'
    recipeOutput.appendChild(showMoreBtn);
};


var getRecipeApi = function (id, url) {
    return new Promise(function (resolve, reject) {
        var apiUrl = 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false' + '&apiKey=' + apiKey;
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (recData) {
                        console.log("Returned data is :", recData);
                        url = recData.spoonacularSourceUrl;
                        console.log("Recipe URL is :", url);
                        resolve(url);
                    })
                        .catch(function (error) {
                            alert('Unable to connect to Spoonacular');
                            throw error;
                        });
                } else {
                    alert('Error: ' + response.statusText);
                    reject(response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to Spoonacular');
                reject(error);
            });
    });
}; // END getRecipeApi

async function searchApi(searchEl) {
    console.log("Searching with :", searchEl);
    var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch' + '?apiKey=' + apiKey + '&query=' + searchEl;
    console.log(apiUrl);

    try {
        var response = await fetch(apiUrl);
        if (response.ok) {
            var data = await response.json();
            console.log("Returned data is :", data);
            var length = 9;

            for (var i = 0; i < length; i++) {
                var recipeTitle = data.results[i].title;
                var recipeImg = data.results[i].image;
                var recipeId = data.results[i].id;
                var recipeUrl = "";

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
                recipeObj.url = await getRecipeApi(recipeId, recipeUrl);
                //debugger;
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




// var getRecipeApi = function (id, url) {
//     // GET https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
//     var apiUrl = 'https://api.spoonacular.com/recipes/' + id + '/information?includeNutrition=false' + '&apiKey=' + apiKey;

//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (recData) {
//                     console.log("Returned data is :", recData);
//                     url = recData.spoonacularSourceUrl;
//                     console.log("Recipe URL is :", url);
//                 })
//                     .catch(function (error) {
//                         alert('Unable to connect to Spoonacular');
//                         throw error;
//                     });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to connect to Spoonacular');
//         });
// }; // END searchApi




// function searchApi(searchEl) {
//     //GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
//     //GET https://api.spoonacular.com/recipes/complexSearch
//     console.log("Searching with :", searchEl);

//     var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch' + '?apiKey=' + apiKey + '&query=' + searchEl;
//     // var apiUrl = 'https://api.spoonacular.com/recipes/716429/information' + '?apiKey=' + apiKey + "&query=" + searchEl;

//     console.log(apiUrl);

//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log("Returned data is :", data);
//                     var length = 9;

//                     // Each call returns 10 recipes
//                     for (var i = 0; i < length; i++) {
//                         // Pull out dta
//                         var recipeTitle = data.results[i].title;
//                         var recipeImg = data.results[i].image;
//                         var recipeId = data.results[i].id;
//                         var recipeUrl = "";

//                     var recipeObj = {
//                             title: "",
//                             img: "",
//                             id: "",
//                             url: ""
//                         }
//                         console.log("Recipe title is : ", recipeTitle);
//                         recipeObj.title = recipeTitle;
//                         recipeObj.img = recipeImg;
//                         recipeObj.id = recipeId;
//                         debugger;
//                         recipeObj.url = recipeUrl;
//                         //debugger;
//                         recipeArr.push(recipeObj);
//                     }

//                     console.log("Recipe Array is :", recipeArr);


//                     var recipeOutput = document.querySelector('#recipes');
//                     // Print the recipe name and image to the display
//                     for (var i = 0; i < recipeArr.length; i++) {
//                         var title = recipeArr[i].title;
//                         var img = recipeArr[i].img;
//                         var url = recipeArr[i].url;

//                         // Create HTML with List names of recipes, with anchor to it's URL

//                         var recipeHtml = '<a class="recipe" href="' + url + '">' + title + '<img src="' + img + '"></a>';
//                         // <a class="recipe" href= "URLtoRECIPE"> TITLE OF RECIPE </a>
//                         // <img src = IMG.PNG >

//                         recipeOutput.innerHTML += recipeHtml;
//                     }

//                     // Create a button to show more recipes
//                     var showMoreBtn = document.createElement("button");
//                     showMoreBtn.textContent = "Show More";
//                     recipeOutput.appendChild(showMoreBtn);

//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert('Unable to connect to Spoonacular');
//         });
// }; // END searchApi


getParams();




