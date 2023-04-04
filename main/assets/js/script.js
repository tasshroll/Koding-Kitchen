var formSearchEl = document.getElementById('user-form');

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

const spoonacularApiKey = '45c6a7194e1245fe9dafafb7ccb5c20f'; // BreeAnn Spoonacular API key
const giphyApiKey = 'IajHaZagRh0q9o7Rd7K7kXBo8gcIFogM'; // BreeAnn Giphy API key

const searchBtn = document.querySelector('#searchBtn');
const recipeResults = document.querySelector('#recipeResults');

$(document).ready(function() {
	const spoonacularApiKey = '45c6a7194e1245fe9dafafb7ccb5c20f'; // Replace with your own Spoonacular API key
	// call to search recipes by ingedients.
	$('#searchBtn').click(function() {
	  const ingredients = $('#ingredients').val();
	  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${spoonacularApiKey}`;
	  
	  $.ajax({
		url: url,
		method: 'GET',
		dataType: 'json',
		success: function(data) {
		  let recipeHtml = '';
		  for (let i = 0; i < data.length; i++) {
			const recipe = data[i];
			const title = recipe.title;
			const imageUrl = recipe.image;
			const ingredientsList = recipe.usedIngredients.map(ingredient => ingredient.name).join(', ');
			
			recipeHtml += `
			  <div class="recipe">
				<h2>${title}</h2>
				<img src="${imageUrl}" alt="${title}">
				<p>Ingredients: ${ingredientsList}</p>
			  </div>
			`;
		  }
		  
		  $('#recipeResults').html(recipeHtml);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		  console.error(textStatus, errorThrown);
		  $('#recipeResults').html('Unable to retrieve recipe data');
		}
	  });
	});
  });