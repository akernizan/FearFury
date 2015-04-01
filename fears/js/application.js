// add array of funtion for each step 
// after each scroll set off function
// arry = [f1,f1,f3]

// function(currentfunction)

$(function(){
	$('#layer1').css('background-color', '#fff');
	// $('#layer1').append('<p class="words"></p>');
	// $('.words').css({
	// 	'margin-top': '10%',
	// 	'display': 'block',
	// 	'width': 30
	// });
	$('.eye').css({
		'background-color':'#fff',
		'border': '1px solid #222'
});
	$('#next').on('click', function(){
		$('.advice').css('display', 'none');
		$('#layer1').css('background-color', '#222');
		// $('.eye').css('background-color','#222');
		$('.eye').css('background-color','#fff');
		$('#layer1').append('<div class="monster-div"></div>');
		$('#layer1').append('<p class="message">There is nothing in the dark.</p>');
		$('.message').css({
			'color': '#fff'
		})
		$('.monster-div').append('<div class="monster"><span class="eye-ball">.</span></div>').append('<div class="monster2"><span class="eye-ball">.</span></div>');
		$('.monster').css({
			'background-color': 'yellow',
			'width': 50,
			'height' : 25,
			'z-index': 1,
			'margin-top': 10,
			'margin-left': 10,
			'display': 'inline-block',
			'webkit-transform': 'skewY(30deg)',
			'border-bottom-right-radius':25,
			'border-bottom-left-radius': 25,
			'font-size': 50,
			'text-align': 'center',
			'padding-bottom': 15,
			
		})
		$('.monster2').css({
			'background-color': 'yellow',
			'width': 50,
			'height' : 25,
			'z-index': 1,
			'margin-top': 10,
			'margin-left': 10,
			'display': 'inline-block',
			'webkit-transform': 'skewY(-30deg)',
			'border-bottom-right-radius':25,
			'border-bottom-left-radius': 25,
			'font-size': 50,
			'text-align': 'center',
			'padding-bottom': 15
		})
		$('.eye-ball').css({
			'font-size': 40,
			'z-index': 2,
			'height': 20,
			'width': 20,
			'text-align': 'left'
		})
	})
})