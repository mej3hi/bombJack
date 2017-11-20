// =====
// INTRO
// =====

/*

An intro sequence that is played at the start of a new game of Bomb Jack

*/

var intro = {

hasBeenPlayed: false,
isIntroPlaying:false,

cx: 300,
cy: 300,
scale: 2,
rotation: 0,

jackCy: 500,
jackCx: 0,
jackAnimate: [
    [5, 3, 13, 17],
    [25, 3, 14, 17],
    [45, 3, 14, 17],
    [66, 3, 14, 17],
    [86, 3, 13, 17],
],
renderFrame: 0,
jackFrame: 0,
nextFrame:0,
duPerAnimFrame:12,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",


lifeSpan: 70/ NOMINAL_UPDATE_INTERVAL,


frame: [3,300,195,80],

introSound: "sounds/arcade/Arcade-Intro.mp3",
background: "img/backgroundEgypt.png",

callBack: undefined,


playIntro: function (call) {
  this.callBack = call;
  this.isIntroPlaying = true;
  soundManager.setBackgroundMusic(this.introSound);
  backgroundManager.setBackground(this.background);
},


update : function(du){

  if(this.isIntroPlaying){

    this.lifeSpan -= du;

  	if(this.jackCx < 300){

  		this.jackCx+=du*1.5
  		this.jackFrame = this.jackAnimate[this.renderFrame + 1];
      if (this.nextFrame % this.duPerAnimFrame === 0) {
          this.renderFrame = (this.renderFrame + 1) % 4;
      }
      this.nextFrame++;

  	}else{
  		this.jackFrame = this.jackAnimate[0];
  	}

  	if(this.lifeSpan < 0){
  		this.hasBeenPlayed = true;
      this.callBack();
  	}

  }

},

render : function(ctx){

		var origScale = g_sprites.intro.scale;

    g_sprites.intro.scale = this.scale;
		g_sprites.intro.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.frame)

		g_sprites.jack.scale = this.scale;
		g_sprites.jack.drawCentredAt(ctx,this.jackCx,this.jackCy,0,this.jackFrame);

	 	g_sprites.intro.scale = origScale;

		util.fillText(ctx,
			this.cx-100,
			50 ,
			"LEFT: LEFT ARROW",
			this._fontSize,
			this._fontFamliy,
			this._fontColor);

			util.fillText(ctx,
			this.cx-100,
			100,
      //this.cy+this.frame[3]+20 ,
			"RIGHT: RIGHT ARROW",
			this._fontSize,
			this._fontFamliy,
			this._fontColor);

			util.fillText(ctx,
			this.cx-100 ,
			150 ,
			"JUMP: SPACE",
			this._fontSize,
			this._fontFamliy,
			this._fontColor);

      util.fillText(ctx,
      this.cx-100 ,
      200 ,
      "PARACHUTE: UP ARROW",
      this._fontSize,
      this._fontFamliy,
      this._fontColor);

},

}
