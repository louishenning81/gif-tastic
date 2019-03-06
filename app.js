
// Initial array of TV Shows
var tvShows = ["Six Feet Under", "Breaking Bad", "Game of Thrones", "Lost", "Band of Brothers", "Deadwood", "Mad Men", "The Wire", "The Office", "The West Wing", "Parks and Recreation", "30 Rock", "Stranger Things", "Friday Night Lights", "Seinfeld", "Curb Your Enthusiasm"];

function displaytvShowGifs() {

  var tvShow = $(this).attr("data-name");
  console.log($(this).attr("data-name"));
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=sp0gcY8joadxeTkHV7YlQy4m1ZLsPHvU&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    $("#tvShow-Gifs").empty();
    var ratedDiv = $("<div class=rated>");
    var rating = response.Rated;
    var ratingP = $("<p>").text("Rated: " + rating);
    ratedDiv.append(ratingP);
    var gifstill = response.data.original_still;
    var gif = response.data.original;
    var gifDiv = $("<div class=gif>");
    gifDiv.append(ratedDiv);
    gifDiv.prepend(gifstill);
    $("#tvShow-Gifs").prepend(gifDiv);
  })
}

// Function for displaying movie data
function renderButtons() {
  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();
  // Looping through the array of movies
  for (var i = 0; i < tvShows.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var newButton = $("<button>");
    // Adding a class
    newButton.addClass("show-btn");
    // Adding a data-attribute with a value of the movie at index i
    newButton.attr("data-name", tvShows[i]);
    // Providing the button's text with a value of the movie at index i
    newButton.text(tvShows[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(newButton);
  }
}

// This function handles events where one button is clicked
$("#add-tvShow").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var tvShow = $("#tvShow-input").val().trim();
  // The movie from the textbox is then added to our array

  tvShows.push(tvShow);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".show-btn", displaytvShowGifs);
// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();
