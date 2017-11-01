var scoreboardManager = {

_score : 0,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",





addScore: function(score){
	this._score += score;
},

update : function(du){
  
},


render : function(ctx){

	var posX =  g_canvas.width - 100;
	var posY = g_canvas.height - 5; 
	util.fillText(ctx, 
		posX,
		posY-20,
		"SCORE",
		this._fontSize,
		this._fontFamliy,
		this._fontColor);

	util.fillText(ctx, 
		posX,
		posY,
		this._score,
		this._fontSize,
		this._fontFamliy,
		this._fontColor);
}



}