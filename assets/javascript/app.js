//Create a function to generate a GIF from GIPHY API
function generateGif(){
	$('.gifButton').on('click',function(){
		$('#GIFarea').html(' ');
		//Attach data attribute from gifButton
		var button = $(this).data('search');
		console.log(button);
		//Create variable to obtain URL from GIPHY API with search parameters of button data attribute, limit of 10, and rating
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+button+"&api_key=dc6zaTOxFJmzC&limit=10&rating=g&rating=pg";
		console.log(queryURL);
			//AJAX call GIPHY API
			$.ajax({url: queryURL, method: 'GET'})
				.done(function(response){
				console.log(response);
					//Add GIF images and rating to html
					for(var i=0; i<response.data.length;i++){
						$('#GIFarea').prepend('<p>Rating: ' + response.data[i].rating+'</p>');
						var gif=$('#GIFarea').prepend('<img src="'+response.data[i].images.fixed_height_still.url+'"'+
							'data-still="'+response.data[i].images.fixed_height_still.url+'"'+
							' data-animate="'+response.data[i].images.fixed_height.url+'"'+' data-state="still"'+'class="gif"'+'/>');	
					}
					//Create on click event to animate/stop GIF when clicked
					$('.gif').on('click',function(){
						var state= $(this).data('state');
						console.log(state);
						if(state==='animate'){
							$(this).data('state','still');
							$(this).attr('src', $(this).data('still'));
						}else if(state==='still'){
							$(this).data('state','animate');
							$(this).attr('src', $(this).data('animate'));
						}else{
							console.log('error');
						}
					});
				})
			});
		}
		//Call generateGIF function	
		generateGif();

//Create function to add a new button (which has same functionality as previous buttons) to html when user enters input
function addButton() {
	var input = $('#userInput').val();
		if (input.length !== 0){
			console.log(input);
			$('#userInput').val('');
			$('#button-area').append('<button class="gifButton"' + 'data-search="' + input + '">' + input + '</button>');	
			generateGif();
		}
}