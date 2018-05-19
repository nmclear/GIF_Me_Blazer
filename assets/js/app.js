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
            $('.gifDisplay').append(button);
        }
    }


createButton();


//========================================================================================================================
// AJAX FUNCTION
//========================================================================================================================
    // Button event listener
    $("button").on("click", function() {
        // store data-name from button clicked
        var person = $(this).attr("data-name");
  
        // Creating URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=1S5pFMN37AVDaiKL2Tf1dLIue0cXXVYB&limit=10";
  
        // AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // starts once AJAX call is delivered back
          .then(function(response) {
            
          });
      });



});