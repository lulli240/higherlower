$(document).ready(function(){
	//Sounds 
	var booSound = document.createElement('audio');
        booSound.setAttribute('src', 'sounds/boo.wav');
    var cheerSound = document.createElement('audio');
        cheerSound.setAttribute('src', 'sounds/cheer.wav');
    var flipSound = document.createElement('audio');
        flipSound.setAttribute('src', 'sounds/flip.wav');

	//Variables
	var deck = null,
		holder = $('.single-card-holder'),
		card = null,
		count = 0,
		turnInProgress = false,
		soundMute = false;

	function newGame(){
		newDeck();
		deal();
	}

	function newDeck() {
		deck = ['h_1', 'h_2', 'h_3', 'h_4', 'h_5', 'h_6', 'h_7', 'h_8', 'h_9' ,'h_10', 'h_11', 'h_12', 'h_13',
				's_1', 's_2', 's_3', 's_4', 's_5', 's_6', 's_7', 's_8', 's_9' ,'s_10', 's_11', 's_12', 's_13',
				'd_1', 'd_2', 'd_3', 'd_4', 'd_5', 'd_6', 'd_7', 'd_8', 'd_9' ,'d_10', 'd_11', 'd_12', 'd_13',
				'c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9' ,'c_10', 'c_11', 'c_12', 'c_13',];
	}

	function refreshDeck(){
		newDeck();

		deck = jQuery.grep(deck, function(value) {
		  return value != card;
		});
	}

	function deal(){
		holder.html('');
		drawCard(0);
	}

	function drawCard(delay){
		if(soundMute === false){
			flipSound.play();
		}
		var drawn = deck[Math.floor(Math.random()*deck.length)];
		//remove card from deck
		deck = jQuery.grep(deck, function(value) {
		  return value != drawn;
		});

		card = drawn;

		// add card to new deck (player, dealer etc.)
	    setTimeout(function () {
			var oldCard = holder.children('.card');
			var oldCardCount = holder.children('.card').length;
			if(oldCardCount > 0){
				var newHeight = 0.82 * holder.height();
				holder.append('<div class="card new-card '+drawn+'" style="margin-top:-'+newHeight+'px;"><img src="./images/cards/'+drawn+'.png"></div>');
				setTimeout(function () {
					newCard = holder.children('.new-card').stop().animate({marginTop: '0px'}, 400).dequeue();
					oldCard.stop().slideUp(400).dequeue();
					newCard.removeClass('new-card');
				}, 1000);
			}
			else {
				holder.html('<div class="card '+drawn+'"><img src="./images/cards/'+drawn+'.png"></div>');
			}
	    }, delay);

		var card_array = drawn.split('_');
		var cardValue = card_array[1];
		return cardValue;
	}

	function turn(guess) {
		 if(turnInProgress === false){

		 	turnInProgress = true;

			var card_array = card.split('_');
			var oldValue = card_array[1];


			var newValue = drawCard(0);
			

			var higher = null;

			if(parseInt(newValue) > parseInt(oldValue)){
				higher = 'true';
			} else if (parseInt(oldValue) === parseInt(newValue)){
				higher = guess;
			} 
			else { higher = 'false'; }

			if(guess === higher){
				count = count + 1;
				updateCounter(count);

				if(parseInt(count) === 5){
					if(soundMute === false){
						cheerSound.play();
					}
					count = 0;
					updateCounter(count);
					updateMessage('Congratulations you\'ve won the game! Next player.', 0);
				} else {
					updateMessage('Correct! Good Job.', 0);
				}
			} else {
				if(soundMute === false){
					booSound.play();
				}

				var sips = count + 1;
				count = 0;
				updateCounter(count);
				updateMessage('Wrong! Drink '+sips+' sips and try again.', 0);
			}

			if(deck.length < 2){
				refreshDeck();
			}

			setTimeout(function(){
				turnInProgress = false;
			}, 1000);

			flashAction(guess);
			return higher;
		}
	}

	function random(){
		var rand = Math.floor(Math.random() * 10) + 1;
		var guess = null;
		if(rand < 6){
			guess = 'false';
		} else {
			guess = 'true';
		}
		turn(guess);
		return guess;
	}

	function updateMessage(message, delay){
		$('.message-text').fadeOut(200, function(){
				$(this).html(message);
		}).delay(delay).fadeIn();
	}

	function flashAction(guess){
		var message = null;
		if(guess === 'true'){
			message = '<div class="show-action"><i class="fa fa-arrow-up"></i> Higher</div>';
		} else if(guess === 'false'){
			message = '<div class="show-action"><i class="fa fa-arrow-down"></i> Lower</div>';
		} else {
			message = guess;
		}
		var actionDiv = $('.show-actions');

		actionDiv.append(message).slideDown();

		$('.show-action').delay(2000).slideUp();
	}

	function updateCounter(count){
		var counter = $('.count-content');
		counter.slideUp(200).html(count).slideDown(200);
	}

	newGame();

	$('.action-button').click(function(){
		var guess = $(this).attr('id');
		if(guess === 'newGame'){
			newGame();
		} else if(guess === 'random'){
			random();
		}else if(guess === 'help'){
			$('#help-module').slideDown();
		} else {
			if(guess === 'higher'){
				turn('true');
			}else {
				turn('false');
			}
		}

		return false;
	});

	$('.close-help').click(function(){
		$('#help-module').slideUp();
	});

	$('.mute-button').click(function(){
		if(soundMute === false){
			$(this).html('<i class="fa fa-volume-off"></i>');
			soundMute = true;
		} else {
			$(this).html('<i class="fa fa-volume-up"></i>');
			soundMute = false;
		}
	});

	$('.close-help').click(function(){
		$('#help-module').slideUp();
	});

	$(document).keydown(function(e){
	    if (e.keyCode == 38) { 
			turn('true');
	       return false;
	    }

	    if(e.keyCode == 40) {
	    	turn('false');
	    	return false;
	    }

	    if(e.keyCode == 82) {
	    	random();
	    	//return false;
	    }

	    if(e.keyCode == 78) {
	    	newGame();
	    	return false;
	    }
	});
});