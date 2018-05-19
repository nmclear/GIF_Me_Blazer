//DOCUMENT READY
$(document).ready(function() {

//========================================================================================================================
// VARIABLES
//========================================================================================================================
    
    
    var topics = [
        "The Office",
        "Parks n Rec",
        "Arrested Development",
        "Workaholics",
        "Friends",
        "Modern Family"
    ];


//========================================================================================================================
// FUNCTIONS
//========================================================================================================================


    function createButton(){
        for(var i = 0; i < topics.length; i++){
            var button = $("<button>").text(topics[i]);
            button.attr('data-name', topics[i]);
            $('.buttonDisplay').append(button);
        }
    }


createButton();


//========================================================================================================================
// AJAX FUNCTION
//========================================================================================================================
    // Button event listener
    $("button").on("click", function() {
        // store data-name from button clicked
        var topic = $(this).attr("data-name");
  
        // Creating URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=1S5pFMN37AVDaiKL2Tf1dLIue0cXXVYB&limit=10";
  


        // AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            var results = response.data;


            for(var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var gifRating = results[i].rating;
                var pRating = $("<p>").text("Rating: " + gifRating);

                var topicGIF = $("<img>");

                topicGIF.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(pRating);
                gifDiv.append(topicGIF);

                $(".gifDisplay").prepend(gifDiv);


            }





          });
    });






});