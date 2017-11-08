var lifeManager = {

_jackLife : 3,
gameOver  : false,

takeJackLife : function(life){
	this._jackLife -= life;
},

update : function(du){
	if (this._jackLife === 0){
		
		levelManager.backToFirstLevel();
		this._jackLife = 3;

	}
  
},

getJackLife : function(){
	return this._jackLife;
},

render : function(ctx){
	//console.log(",life manager render",g_sprites.jack)
	var origScale = g_sprites.jack.scale;
	var scale = 1.6;

	g_sprites.jack.scale = scale;
	var width = g_sprites.jack.width*scale;

	for (var i = 0; i < this._jackLife; i++) {

		var a = 25 * i;
		var frame = [5, 3, 13, 17];
		g_sprites.jack.drawCentredAt(ctx,30+a,580,0,frame);
	};

	g_sprites.jack.scale = origScale;
}



}