# gif-tastic - TV Shows in a Gihpy!

##Louis Henning created this code and read me

### deployed page: https://louishenning81.github.io/gif-tastic/

This homework assignment is asking us to do the following items. I've displayed the code that does each item below the bullet point.

1. Render some initial buttons on an HTML page based upon an array and give data attributes to those buttons that can later be used to return a specific value that describes the button when it is clicked
`var tvShows = ["Six Feet Under", "Breaking Bad", "Game of Thrones", "Lost", "Band of Brothers", "Deadwood", "Mad Men", "The Wire", "The Office", "The West Wing", "Parks and Recreation", "30 Rock", "Stranger Things", "Friday Night Lights", "Seinfeld", "Curb Your Enthusiasm"];

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
}`
2. Create a search button that would also add additional buttons to the list of already rendered buttons and also give that newly rendered button a data attribute that describes the button
`$("#add-tvShow").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var tvShow = $("#tvShow-input").val().trim();
  // The movie from the textbox is then added to our array

  tvShows.push(tvShow);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});`
3. Create a click listening function that makes a .ajax call to the Giphy search API using the data attribute that is returned when one of the non-search buttons on the page is clicked with the data attribute being the search term in the API call
4. Limit the GIFs that are returned by the Giphy search API to only 10 GIFs that are a G or PG rating.
5. Display these GIFs on the HTML page as still images
`function displaytvShowGifs() {

  var tvShow = $(this).attr("data-name");
  console.log($(this).attr("data-name"));
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=sp0gcY8joadxeTkHV7YlQy4m1ZLsPHvU&rating=G&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response.data);
    $("#tvShow-Gifs").empty();
    for (var i = 0; i < response.data.length; i++) {
      var rated = response.data[i].rating;
      var ratedP = $("<p>").text("Rated: " + rated);
      var gifstill = response.data[i].images.fixed_height_still.url;
      var gif = response.data[i].images.fixed_height.url;
      var image = $("<img>");
      image.attr("src", gifstill);
      image.attr("data-still", gifstill);
      image.attr("data-animate", gif);
      image.attr("data-state", "still");
      image.addClass("gifClick");
      $("#tvShow-Gifs").prepend(ratedP, image);
    }
  })
}`
6. Create an additional click listener for each of the GIF images that toggles the GIF between a still image and an animated GIF when clicked on. 
`$(document).on("click", ".gifClick", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log($(this).attr("data-state"))
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});`

## Things I struggled with
+ I still need to work on using Jquery to display results on the webpage.  
+ I also need some work on using CSS to display images how I want them to look
+ Had some trouble deciphering Giphy's API documentation, there's quite a bit of verbiage there that's kind of like Greek to me.
+ getting better at introducing for loops

