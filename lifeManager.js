var lifeManager = {

_jackLife : 3,

takeJackLife : function(life){
	this._jackLife -= life;
},

update : function(du){
  
},


render : function(ctx){
	//console.log(",life manager render",g_sprites.jack)
	var origScale = g_sprites.jack.scale;
	var scale = 0.6;

	g_sprites.jack.scale = scale;
	var width = g_sprites.jack.width*scale;

	for (var i = 0; i < this._jackLife; i++) {

		var a = width * i;
		g_sprites.jack.drawCentredAt(ctx,30+a,580,0);
	};

	g_sprites.jack.scale = origScale;
}



}