// ==================
// SCOREBOARD MANAGER
// ==================

/*

This module keeps track of the score Jack has obtained in the current game.

*/

var scoreboardManager = {

_score : 0,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",





addScore: function(score){
	this._score += score;
},

clearScore: function(){
	this._score = 0;
},

update : function(du){

},


render : function(ctx){
	util.fillText(ctx,
		500,
		575,
		"SCORE",
		this._fontSize,
		this._fontFamliy,
		this._fontColor);

	util.fillText(ctx,
		500,
		595,
		this._score,
		this._fontSize,
		this._fontFamliy,
		this._fontColor);
}



}
