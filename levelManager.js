// ==========
// LEVEL STUFF
// ==========

// LEVEL STUFF

var levelManager = {

level : 1,
totalBomb : 0,

mapWidth : 600,
mapHeight :560,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",



update : function(du){
	if(entityManager._bombs.length <= 0 && this.level <3){		
		this.changeLevel();
		//this.demo();		
	}

},

render : function(ctx){

	util.fillText(ctx, 
		270,
		575,
		"LEVEL",
		this._fontSize,
		this._fontFamliy,
		this._fontColor);

	util.fillText(ctx, 
		292,
		595,
		this.level,
		this._fontSize,
		this._fontFamliy,
		this._fontColor);
	
},

backToFirstLevel : function() {
	//lifeManager._jackLife = 3;
	this.clearLevel();		
	this.level = 1;
	this.createLevel(this.level);
},

changeLevel : function() {

	this.clearLevel();		
	this.nextLevel();
	this.createLevel(this.level);
},

clearLevel : function() {
	entityManager.eraseAllEntities();
},

nextLevel : function(){
	this.playLevelChangeSound();
	this.level++;	
},

getLevel : function(){
	return this.level;	
},

getMap: function(level){

	switch(level){

	case 1:
		return this._levelInfo.one;
		break;

	case 2:
		return this._levelInfo.two;
		break;
	
	}

},



playLevelChangeSound : function(){
    var levelChangeSound = new Audio(
        "sounds/levelChangeSound.wav");
    levelChangeSound.play();
},


createLevel : function (level) {
	var level = this.getMap(level)

	if(level.jack){
		entityManager.generateJack(level.jack)
	}

	if(level.platform){
		for (var i = 0; i < level.platform.length; i++) {
			entityManager.generatePlatform(level.platform[i]);
		};
	}

	if(level.enemy){
		for (var i = 0; i < level.enemy.length; i++) {
			entityManager.generateEnemy(level.enemy[i]);
		};
	}

	if(level.bomb){
		for (var i = 0; i < level.bomb.length; i++) {
			entityManager.generateBomb(level.bomb[i]);
			this.totalBomb++;
		};
	}

	backgroundManager.setBackground(level.background)
	
},


// Level info for each level 
_levelInfo : {
	

	one:{

		background: "img/backgroundEgypt.png",

		jack:{cx : 300,cy : 500}, 

		platform:[
			{cx : 120, cy : 450, width : 100},
		    {cx : 220, cy : 150, width : 100},
		    {cx : 420, cy : 100, width : 100},
		    {cx : 350, cy : 350, width : 100},
		    {cx : 450, cy : 450, width : 200},

		],

		enemy:[
			{cx : 120, cy : 430, range : 100, velX: 1.2},
		   	{cx : 220, cy : 130, range : 100, velX: 0.9},
		   	{cx : 420, cy : 80, range : 100, velX: 1}
		],

		bomb:[
		 	/*{cx: 80, cy: 20},
		    {cx: 140, cy: 20},
		    {cx: 200, cy: 20},*/
		    
		    {cx: 20, cy: 200},
		    {cx: 20, cy: 260},
		    {cx: 20, cy: 320},
		    {cx: 20, cy: 380},

		    {cx: 400, cy: 420},
		    {cx: 460, cy: 420},
		    {cx: 520, cy: 420},

		   /* {cx: 400, cy: 20},
		    {cx: 460, cy: 20},
		    {cx: 520, cy: 20},*/

		    {cx: 80, cy: 540},
		    {cx: 140, cy: 540},
		    {cx: 200, cy: 540},

		    {cx: 580, cy: 200},
		    {cx: 580, cy: 260},
		    {cx: 580, cy: 320},
		    {cx: 580, cy: 380},

		    {cx: 400, cy: 140},
		    {cx: 460, cy: 140},
		    {cx: 520, cy: 140},
		]
	

	},

	two:{

		background: "img/backgroundLevel2.png",

		jack: {cx : 300,cy : 500},
   

		// PLATFORMS
		platform: [
		    {cx : 220, cy : 350, width : 100},
		    {cx : 120, cy : 250, width : 100},
		    {cx : 420, cy : 100, width : 100},
	    ],

    	// ENEMIES
    	enemy : [
		    {cx : 120, cy : 425, scale : 1, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, scale : 1, range : 100, velX: 1},
    	],


    	// BOMBS
	     bomb: [
		    {cx: 80, cy: 20},
		    {cx: 140, cy: 20},
		    {cx: 200, cy: 20},
		    

		    {cx: 20, cy: 200},
		    {cx: 20, cy: 260},
		    {cx: 20, cy: 320},
		    {cx: 20, cy: 380},

		    {cx: 400, cy: 420},
		    {cx: 460, cy: 420},
		    {cx: 520, cy: 420},

		    {cx: 400, cy: 20},
		    {cx: 460, cy: 20},
		    {cx: 520, cy: 20},

		    {cx: 80, cy: 540},
		    {cx: 140, cy: 540},
		    {cx: 200, cy: 540},

		    {cx: 580, cy: 200},
		    {cx: 580, cy: 260},
		    {cx: 580, cy: 320},
		    {cx: 580, cy: 380},

		    {cx: 400, cy: 140},
		    {cx: 460, cy: 140},
		    {cx: 520, cy: 140},

	    ],
	},

}






}