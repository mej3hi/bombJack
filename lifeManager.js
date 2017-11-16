var lifeManager = {

_jackLife : 3,
gameOver  : false,

lifeSpan: 5000/ NOMINAL_UPDATE_INTERVAL,
gameOverSprite: false,
gameOverCx:-50,
gameOverCy:300,

takeJackLife : function(life){
	this._jackLife -= life;
},

update : function(du){
	if (this._jackLife === 0){

				if(this.lifeSpan === (5000/ NOMINAL_UPDATE_INTERVAL) ){
					this.gameOverSprite = true;
				}

				this.lifeSpan -=du;

				if(this.lifeSpan < 0){
					this.lifeSpan = 5000/ NOMINAL_UPDATE_INTERVAL;
					this.gameOverCx= -50;
					this.gameOverSprite = false;
					levelManager.backToFirstLevel();
					this._jackLife = 3;
					scoreboardManager.clearScore();
				}

				this.gameOverCx +=du*4;
				if(this.gameOverCx >= 300){
					this.gameOverCx=300;
				}

	}

},

getJackLife : function(){
	return this._jackLife;
},

render : function(ctx){
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

	if(this.gameOverSprite){
		var origScale = g_sprites.bombJack.scale;
		g_sprites.bombJack.scale = 4;

		g_sprites.bombJack.drawCentredAt(ctx,this.gameOverCx,this.gameOverCy,0,[5, 156, 30,10]);
		g_sprites.bombJack.drawCentredAt(ctx,600-this.gameOverCx,this.gameOverCy+40,0,[5, 172, 30,10]);

		g_sprites.bombJack.scale = origScale;
	}





}



}
