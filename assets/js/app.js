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
            console.log(button.attr('data-name'));
        }
    }


createButton();


//========================================================================================================================
// AJAX FUNCTION AND EVENT LISTENERS
//========================================================================================================================
    // Event listener to display new buttons
    $("#searchSubmit").on("click", function(){
        var text = $('#searchInput').val();
        topics.push(text);
        $('.buttonDisplay').empty();
        createButton();
    });

// Button event listener to display GIFs
    $('body').on("click", 'button.gifButton', function() {
        //clears display for new gifs
        $('.gifDisplay').empty();
        // store data-name from button clicked
        var topic = $(this).attr("data-name");

        // Creating URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=1S5pFMN37AVDaiKL2Tf1dLIue0cXXVYB&limit=" + limitNum;
  
        // AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(response) {
            var results = response.data;
console.log(results);
            for(var i = 0; i < results.length; i++) {
                var gifDiv = $("<span class='gifDiv'>");

                var gifRating = results[i].rating.toUpperCase();
                var pRating = $("<p>").text("Rating: " + gifRating);
                var gif = $("<img>");


                // var downloadButton = $('<a download class="button">');
                // downloadButton.attr('href', results[i].images.fixed_height_still.url);
                // downloadButton.attr('download');
                // downloadButton.text("Download");


                gif.addClass('gif');
                gif.attr('src', results[i].images.fixed_height_still.url);
                gif.attr('data-state', 'still');
                gif.attr('data-still', results[i].images.fixed_height_still.url);
                gif.attr('data-animate', results[i].images.fixed_height.url);


                gifDiv.append(gif);
                // gifDiv.append(pRating);
                // gifDiv.append(downloadButton);
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




    // $('body').on('click', 'a.button', function(event){
    //     event.preventDefault();
    // })
    


{/* <div id="download">
    <img src="http://www.glamquotes.com/wp-content/uploads/2011/11/smile.jpg" id="image" />
    <a class="button" href="http://www.glamquotes.com/wp-content/uploads/2011/11/smile.jpg" download="smile.jpg">Download image</a>
</div> */}





});