var formSearchEl = document.getElementById('user-form');
var ingredientSearchEl = document.getElementById('ingredient-form');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var foodTypeEl = document.getElementById('food-type');
    var searchEl = foodTypeEl.value.trim();
    console.log("User entered ", searchEl);
    if (!searchEl) {
        console.error("You need to enter a food input value");
        return;
    }
    var queryString ='./search-results.html?q=' + searchEl;
// redirects user to the URL specified in the queryString variable.
    location.assign(queryString);
};

// Get user input search
formSearchEl.addEventListener('submit', formSubmitHandler);


  

