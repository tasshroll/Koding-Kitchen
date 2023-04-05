
var formSearchEl = document.getElementById('user-form');
var foodTypeEl = document.getElementById('food-type');
var recipeOutput = document.getElementById('recipe')


var getRecipe = function (searchEl) {
    var apiKey = "0d5211b3d5ad40da820938ae55017af1"; // Tifni

    var apiKey = "45c6a7194e1245fe9dafafb7ccb5c20f" //BreeAnn
    var giphyKey = "IajHaZagRh0q9o7Rd7K7kXBo8gcIFogM"; // BreeAnn
    //GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
    //GET https://api.spoonacular.com/recipes/complexSearch
    console.log("Searching with :", searchEl);

    var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch' + '?apiKey=' + apiKey + '&query=' + searchEl;
    // var apiUrl = 'https://api.spoonacular.com/recipes/716429/information' + '?apiKey=' + apiKey + "&query=" + searchEl;

    // After first search then use
    // GET 
    // var apiUrl3 = 'https://api.spoonacular.com/recipes/complexSearch' + '?apiKey=' + apiKey + "&query=" + searchEl;
    console.log(apiUrl);
    //pasta&maxFat=25&number=2



    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log("Returned data is :", data);
                    var recipes = [];
                    var length = 9;

                    // Get 10 recipes, 
                    for (var i = 0; i < length; i++) {
                        var recipeTitle = data.results[i].title;
                        var recipeImg = data.results[i].image;
                        var recipeId = data.results[i].id;
                        console.log("Recipe title is : ", recipeTitle);
                        recipes.push(recipeTitle);
                    }

                    for (var i = 0; i < recipes.length; i++) {
                        var recipeHtml = '<div class="recipe">' + recipes[i] + '</div>';
                        recipeOutput.innerHTML += recipeHtml;
                    }

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    var searchEl = foodTypeEl.value.trim();
    console.log("User entered ", searchEl);

    if (searchEl) {
        recipeOutput.innerHTML = searchEl;



        getRecipe(searchEl);

    } else {
        alert('Please enter a food type');
    }
};


// Get user input search
formSearchEl.addEventListener('submit', formSubmitHandler);


