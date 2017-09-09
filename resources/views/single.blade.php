@extends('layout')
@section('scripts')
	<script src="/js/single.js"></script>
@stop

@section('content')
	<div id="help-module">
		<i class="fa fa-remove close-help"></i>
		<h2>How the game works</h2>

		<p>
			You guess higher or lower than the card on the table. If you get 5 correct in a row you win. But if you fail you drink equivalent the card you messed up (f.e you get card 4 wrong you drink 4 sips) and the counter resets.
			<br><br>
			If you get all the card correct the next player takes a turn. 
			<br><br>
			Deck wont shuffle until there are 2 cards left.
			<br>
			<small><i class="fa fa-arrow-up"></i></small> <span>Higher</span> <br>
			<small><i class="fa fa-arrow-down"></i></small> <span>Lower</span> <br>
			<small>R</small> <span>Random</span> <br>
			<small>N</small> <span>New game</span> <br>
		</p>
	</div>
	<div class="show-actions">

	</div>
	<div class="s-message">
		<div class="message-content"><div class="message-text">Welcome. Start by selecting higher or lower.</div></div>
		<div class="count-content">0</div>
	</div>
	<div class="single-playing-cards">
		<div class="single-card-holder">
	</div>
	<div class="clear"></div>
	<div class="actions">
		<ul>
			<a href="#" class="action-button" id="higher"><li><i class="fa fa-arrow-up"></i> </li></a>
			<a href="#" class="action-button" id="lower"><li><i class="fa fa-arrow-down"></i> </li></a>
			<a href="#" class="action-button" id="help"><li class="help-action"> <i class="fa fa-info"></i></li></a>
			<a href="#" class="action-button" id="random"><li><i class="fa fa-random"></i> </li></a>
			<a href="#" class="action-button" id="newGame"><li class="new-game"> <i class="fa fa-refresh"></i></li></a>
		</ul>
	</div>
@stop