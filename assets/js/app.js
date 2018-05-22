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
        "Modern Family",
        "New Girl"
    ];

    var limitNum = 10;

//========================================================================================================================
// FUNCTIONS
//========================================================================================================================

    function createButton(){
        for(var i = 0; i < topics.length; i++){
            var button = $("<button>").text(topics[i]);
            button.attr('data-name', topics[i]);
            button.addClass('gifButton');
            $('.buttonDisplay').append(button);
        }
    }


createButton();


//========================================================================================================================
// AJAX FUNCTION AND EVENT LISTENERS
//========================================================================================================================
    // Event listener to display new buttons
    $("#searchSubmit").on("click", function(){
        var text = $('#searchInput').val().trim();
        topics.push(text);
        $('.buttonDisplay').empty();
        createButton();
        $('#searchInput').val('');
    });

// Button event listener to display GIFs
    $('body').on("click", 'button.gifButton', function() {
        //clears display for new gifs
        $('.gifDisplay').empty();
        // store data-name from button clicked
        var topic = $(this).attr("data-name");

        // Creating URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=1S5pFMN37AVDaiKL2Tf1dLIue0cXXVYB" + "&limit=" + limitNum;
  
        // AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            var results = response.data;

            for(var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gifDiv'>");

                var gifRating = results[i].rating.toUpperCase();
                var pRating = $('<div class="rating">').text("Rating: " + gifRating);
                // var pRating = "Rating: " + gifRating;
                var gif = $("<img>");

                gif.addClass('gif');
                gif.attr('src', results[i].images.fixed_height_still.url);
                gif.attr('data-state', 'still');
                gif.attr('data-still', results[i].images.fixed_height_still.url);
                gif.attr('data-animate', results[i].images.fixed_height.url);


                gifDiv.append(gif);
                gifDiv.append(pRating);
                $(".gifDisplay").prepend(gifDiv);
            }
          });
    });

    // Switches GIFs between still and animate on click
    $('body').on('click', 'img.gif', function() {  
        var state = $(this).attr("data-state");
        // if gif still, will switch source link to animated
        if(state === 'still'){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        // if gif animated, will switch source link to still
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });

    $('body').on("click", 'button#moreGifs', function() {
        if(limitNum < 50) {
            limitNum = limitNum + 10;
            console.log(limitNum);
            $('.gifButton').triggerHandler('click');
        }
        else {
            alert("no more than 50");
        }

    });


    // click listen to submit input on enter key
    $("input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#searchSubmit").click();
            $('#searchInput').val('');
        }
    });


});