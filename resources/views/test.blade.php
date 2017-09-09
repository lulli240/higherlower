@extends('layout')

@section('scripts')
	<script src="/js/normal.js"></script>
@stop
@section('content')
	<div id="help-module">
		<i class="fa fa-remove close-help"></i>
		<h2>How the game works</h2>

		<p>
			The point of the game is to guess correctly higher or lower for all the cards from left to right.<br>
			If you guess wrong then you drink equivalent the card you messed up (f.e you get card 4 wrong you drink 4 sips).
			<br><br>
			The third card is a wild card, you have to guess higher or lower before the card is flipped. Once guessed the card will flip <br>
			and another will be drawn.
			<br><br>
			If you get all the card correct the next player takes a turn. 
			<br><br>
			Active card has orange background. Deck wont shuffle until there are 2 cards left.
			<br>
			<small><i class="fa fa-arrow-up"></i></small> <span>Higher</span> <br>
			<small><i class="fa fa-arrow-down"></i></small> <span>Lower</span> <br>
			<small>R</small> <span>Random</span> <br>
			<small>N</small> <span>New game</span> <br>
		</p>
	</div>
	<div class="show-actions">

	</div>
	<div class="message">
		<div class="message-content">Welcome. Start by selecting higher or lower.</div>
	</div>
	<div class="playing-cards">
		<div class="card-holder holder-1"></div>
		<div class="card-holder holder-2"></div>
		<div class="card-holder holder-3"></div>
		<div class="card-holder holder-4"></div>
		<div class="card-holder holder-5"></div>
	</div>
	<div class="clear"></div>
	<div class="actions">
		<ul>
			<a href="#" class="action-button" id="higher"><li><i class="fa fa-arrow-up"></i> Higher</li></a>
			<a href="#" class="action-button" id="lower"><li><i class="fa fa-arrow-down"></i> Lower</li></a>
			<a href="#" class="action-button" id="help"><li class="help-action"> <i class="fa fa-info"></i></li></a>
			<a href="#" class="action-button" id="random"><li><i class="fa fa-random"></i> Random</li></a>
			<a href="#" class="action-button" id="newGame"><li class="new-game"> <i class="fa fa-refresh"></i> New game</li></a>
		</ul>
	</div>
@stop