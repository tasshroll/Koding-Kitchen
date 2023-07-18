var formSearchEl = document.getElementById('user-form');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var foodTypeEl = document.getElementById('food-type');

    // searchEl contains the user ingredients or food cuisine to search on
    var searchEl = foodTypeEl.value.trim();
    if (!searchEl) {
        console.error("You need to enter a food input value");
        return;
    }
    var queryString = './search-results.html?q=' + searchEl;
    // redirects user to the URL specified in the queryString variable.
    location.assign(queryString);
};

// Listen for when user submits their entry
formSearchEl.addEventListener('submit', formSubmitHandler);
