

var winningScene = {

hasBeenPlayed: false,
isPlaying:false,

_fontSize : "30px",
_fontFamliy : "Georgia",
_fontColor : "yellow",
youWonCx: -50,
youWonCy: 300,

jack: {
  cy: 500,
  cx: 300,
  scale: 3,
  animate: [
      [5, 30, 13, 17],
      [25, 30, 14, 17],
      [45, 30, 14, 17],
      [66, 30, 14, 17],
  ],

  renderFrame: 0,
  frame: 0,
  nextFrame:0,
  duPerAnimFrame:18,

  update : function() {
    this.frame = this.animate[this.renderFrame + 0];
    if (this.nextFrame % this.duPerAnimFrame === 0) {
        this.renderFrame = (this.renderFrame + 1) % 4;
    }
    this.nextFrame++;

    if(this.renderFrame ===  3){
          this.cy = 490;
    }else{
      this.cy = 500;
    }

  },

  render : function(){
    var origScale = g_sprites.bombJack.scale;
    g_sprites.bombJack.scale = this.scale;
    g_sprites.bombJack.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.frame );
    g_sprites.bombJack.scale = origScale;

  },
},

fireWork: {
  cx: 300,
  cy: 300,
  scale: 2,
  isDone: false,

  animate: [
    [174,155,33,33],
    [208,155,33,33],
    [243,155,33,33],
    [279,155,33,33],
    [319,155,33,33],
    [319,155,33,33],
    [319,155,33,33],
    [319,155,33,33],
  ],

  renderFrame: 0,
  frame: 0,
  nextFrame:0,
  duPerAnimFrame:16,

update : function(du) {

  this.frame = this.animate[this.renderFrame + 0];
  if (this.nextFrame % this.duPerAnimFrame === 0) {
      this.renderFrame = (this.renderFrame + 1) % 8;
  }
  this.nextFrame++;
},

render : function(ctx){
  var origScale = g_sprites.bombJack.scale;
  g_sprites.bombJack.scale = this.scale;
  g_sprites.bombJack.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.frame );
  g_sprites.bombJack.scale = origScale;


},


},




lifeSpan: 10000/ NOMINAL_UPDATE_INTERVAL,

introSound: "sounds/arcade/Arcade-GameFinish.mp3",
background: "img/backgroundEgypt.png",

callBack: undefined,
fireWorks: [],


play: function (call) {
  this.callBack = call;
  this.isPlaying = true;
  this.fireWorks.push(Object.assign({}, this.fireWork));
  this.fireWorks.push(Object.assign({}, this.fireWork));
  this.fireWorks.push(Object.assign({}, this.fireWork));
  soundManager.setBackgroundMusic(this.introSound);
  backgroundManager.setBackground(this.background);
},


update : function(du){

  if(this.isPlaying){

    this.lifeSpan -= du;

    if(this.lifeSpan < 500){
      this.fireWorks[0].cy = 250;
      this.fireWorks[0].cx = 100;
      this.fireWorks[0].update(du);
    }
    if(this.lifeSpan < 300 ){
      this.fireWorks[1].cy = 200;
      this.fireWorks[1].cx = 300;
      this.fireWorks[1].update(du);
    }
    if(this.lifeSpan < 400){
      this.fireWorks[2].cy = 250;
      this.fireWorks[2].cx = 500;
      this.fireWorks[2].update(du);
    }

    this.jack.update(du);

    this.youWonCx +=du*4;
    if(this.youWonCx >= 300){
      this.youWonCx=300;
    }

  	if(this.lifeSpan < 0){
  		  this.hasBeenPlayed = true;
        this.isPlaying = false;
        this.lifeSpan =  10000/ NOMINAL_UPDATE_INTERVAL;
        this.callBack();
  	}

  }

},

render : function(ctx){

    this.fireWorks[0].render(ctx);
    this.fireWorks[1].render(ctx);
    this.fireWorks[2].render(ctx);
    this.jack.render(ctx);


		util.fillText(ctx,
			this.youWonCx-30,
			this.youWonCy,
			"YOU",
			this._fontSize,
			this._fontFamliy,
			this._fontColor);


      util.fillText(ctx,
  			600-this.youWonCx-30,
  			this.youWonCy+30,
  			"WON",
  			this._fontSize,
  			this._fontFamliy,
  			this._fontColor);






},




}
