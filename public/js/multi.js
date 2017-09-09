$(document).ready(function(){
	//Sounds 
	var booSound = document.createElement('audio');
        booSound.setAttribute('src', 'sounds/boo.wav');
    var cheerSound = document.createElement('audio');
        cheerSound.setAttribute('src', 'sounds/cheer.wav');
    var flipSound = document.createElement('audio');
        flipSound.setAttribute('src', 'sounds/flip.wav');

    booSound.mute = true;

	//Variables
	var deck = null,
		holder1 = $('.holder-1'),
		holder2 = $('.holder-2'),
		holder3 = $('.holder-3'),
		holder4 = $('.holder-4'),
		holder5 = $('.holder-5'),
		allHolders = $('.card-holder'),
		card1 = null,
		card2 = null,
		card3 = null,
		card4 = null,
		card5 = null,
		activeHolder = 1,
		turnInProgress = false,
		soundMute = false;


	function newGame() {
		activeHolder = 1;
		flashAction('<div class="show-action"><i class="fa fa-refresh"></i> New game</div>')
		updateMessage(null, 0, activeHolder);
		newDeck();
		deal();
		$('.message-content').fadeOut(200, function(){
					$(this).html('Welcome! Start by selecting higher or lower.');
			}).fadeIn();
		setTimeout(function(){
			centerActiveHolder(activeHolder);
		},500);

		return true;
	}
	function newDeck() {
		deck = ['h_1', 'h_2', 'h_3', 'h_4', 'h_5', 'h_6', 'h_7', 'h_8', 'h_9' ,'h_10', 'h_11', 'h_12', 'h_13',
				's_1', 's_2', 's_3', 's_4', 's_5', 's_6', 's_7', 's_8', 's_9' ,'s_10', 's_11', 's_12', 's_13',
				'd_1', 'd_2', 'd_3', 'd_4', 'd_5', 'd_6', 'd_7', 'd_8', 'd_9' ,'d_10', 'd_11', 'd_12', 'd_13',
				'c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9' ,'c_10', 'c_11', 'c_12', 'c_13',];

		return deck;
	}

	function refreshDeck() {

		newDeck();
		removeFromDeck(card1);
		removeFromDeck(card2);
		removeFromDeck(card3);
		removeFromDeck(card4);
		removeFromDeck(card5);
		
		return true;
	}

	function removeFromDeck(card){
		deck = jQuery.grep(deck, function(value) {
		  return value != card1;
		});

		return true;
	}

	function deal() {
		holder1.html('');
		holder2.html('');
		holder3.html('');
		holder4.html('');
		holder5.html('');
		drawCard(1, holder1, false, 0);
		drawCard(2, holder2, false, 0);
		drawCard(3, holder3, true, 0);
		drawCard(4, holder4, false, 0);
		drawCard(5, holder5, false, 0);

		return true;
	}

	function turn(guess) {
		 if(turnInProgress === false){

		 	turnInProgress = true;

			var card = null,
				holder = null;
			if(activeHolder === 1){
				card = card1;
				holder = holder1;
			} else if(activeHolder === 2){
				card = card2;
				holder = holder2;
			} else if(activeHolder === 3){
				card = card3;
				holder = holder3;
			} else if(activeHolder === 4){
				card = card4;
				holder = holder4;
			} else if(activeHolder === 5){
				card = card5;
				holder = holder5;
			}

			var card_array = card.split('_');
			var oldValue = card_array[1];

			// Flip center card
			if(activeHolder === 3){
				holder.html('<div class="card '+card+'"><img src="./images/cards/'+card+'.png"></div>');
				var newValue = drawCard(activeHolder, holder, false, 500);
			} else {
				var newValue = drawCard(activeHolder, holder, false, 0);
			}
			

			var higher = null;

			if(parseInt(newValue) > parseInt(oldValue)){
				higher = 'true';
			} else if (parseInt(oldValue) === parseInt(newValue)){
				higher = guess;
			} 
			else { higher = 'false'; }

			if(guess === higher){
				if(activeHolder > 2){
					drawCard(3, holder3, true, 2500);
				}
				if(activeHolder == 5){
					if(soundMute === false){
						cheerSound.play();
					}
					activeHolder = 1;
					updateMessage('Congratulations you\'ve won the game! Next player.', 0, activeHolder);
				} else {
					if(activeHolder === 3){
						activeHolder = activeHolder + 1;
						updateMessage('Correct! Good Job.', 1000, activeHolder);
					} else {
						activeHolder = activeHolder + 1;
						updateMessage('Correct! Good Job.', 0, activeHolder);
					}
				}
			} else {
				if(soundMute === false){
					booSound.play();
				}
				if(activeHolder > 2){
					drawCard(3, holder3, true, 2500);
				}

				if(activeHolder === 3){
					var sips = activeHolder;
					activeHolder = 1;
					updateMessage('Wrong! Drink '+sips+' sips and try again.', 1000, activeHolder);
				} else {
					var sips = activeHolder;
					activeHolder = 1;
					updateMessage('Wrong! Drink '+sips+' sips and try again.', 0, activeHolder);
				}

			}

			if(deck.length < 2){
				refreshDeck();
			}

			setTimeout(function () {
				turnInProgress = false;
			}, 1100);

			flashAction(guess);
			return higher;
		}

		return false;
	}

	function drawCard(number, holder, hidden, delay) {
		if(soundMute === false){
			flipSound.play();
		}
		var drawn = deck[Math.floor(Math.random()*deck.length)];
		//remove card from deck
		removeFromDeck(drawn);

		if(number === 1){
			card1 = drawn;
		} else if(number === 2){
			card2 = drawn;
		} else if(number === 3){
			card3 = drawn;
		} else if(number === 4){
			card4 = drawn;
		} else if(number === 5){
			card5 = drawn;
		}
		// add card to new deck (player, dealer etc.)

		setTimeout(function () {
	        if(hidden){
				holder.html('<div class="back-card"><img src="./images/cards/back.png"></div>');
			} else {
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

			}
	    }, delay);

		var card_array = drawn.split('_');
		var cardValue = card_array[1];
		return cardValue;
	}

	function updateMessage(message, delay, active){
		if(message !== null){
			$('.message-content').fadeOut(200, function(){
					$(this).html(message);
			}).delay(delay).fadeIn(function(){
				updateActive(active);
			});
		}
		else {
			updateActive(active);
		}

		return true;
	}

	function updateActive(active){
		activeHolder = active;
		var holder = null;
		if(activeHolder === 1){
			holder = holder1;
		} else if(activeHolder === 2){
			holder = holder2;
		} else if(activeHolder === 3){
			holder = holder3;
		} else if(activeHolder === 4){
			holder = holder4;
		} else if(activeHolder === 5){
			holder = holder5;
		}

		allHolders.each(function(){
			$(this).removeClass('active');
		});

		holder.addClass('active');

		centerActiveHolder(activeHolder);

		return true;
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

		return true;
	}

	function centerActiveHolder(i){
		var windowWidth = $('#wrapper').width();
		var holderWidth = $('.holder-1').width() + 20;
		var cardWidth = $('.holder-1 .card').width();
		fringe = (windowWidth - holderWidth) / 2;
		leftMargin = fringe - ((i -1) * holderWidth);


		$('.playing-cards').animate({marginLeft: leftMargin}, 600);

		return true;
	}

	newGame();
	
	$( window ).resize(function() {
		centerActiveHolder(activeHolder);
	});

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