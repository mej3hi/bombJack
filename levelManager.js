// =============
// LEVEL MANAGER
// =============

/*

The different levels of Bomb Jack are defined here, with the locations of platforms and bombs
as well as the locations and speed of enemies.

*/

var levelManager = {

level : 1,

mapWidth : 600,
mapHeight :560,

startCx: -50,
startCy: 300,
renderStarSprite: false,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",

lifeSpan: 5000/ NOMINAL_UPDATE_INTERVAL,

update : function(du){
	if(entityManager._bombs.length <= 0){

		if(this.level < 5){
			// play start theme
			if(!this.renderStarSprite){
				this.clearLevel();
				backgroundManager.setBackground(this.getMap(this.level+1).background)
				this.renderStarSprite = true;
			}

			this.lifeSpan -=du;

			if(this.lifeSpan < 0){
				this.nextLevel();
				this.createLevel(this.level);
				this.lifeSpan = 5000/ NOMINAL_UPDATE_INTERVAL;
				this.startCx=-50;
				this.renderStarSprite = false;
			}

			this.startCx +=du*4;
			if(this.startCx >= 300){
				this.startCx=300;
			}


		}else{
			// play winning theme
				this.clearLevel();
				this.level = 1;
				scoreboardManager.clearScore();
				winningScene.play(initialFirstLevel);
				lifeManager._jackLife = 3;
		}


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


	if(this.renderStarSprite){
		var origScale = g_sprites.bombJack.scale;
		g_sprites.bombJack.scale = 3;

		g_sprites.bombJack.drawCentredAt(ctx,this.startCx,this.startCy,0,[240, 260, 50,15]);
		g_sprites.bombJack.drawCentredAt(ctx,600-this.startCx,this.startCy,0,[300, 260, 50,15]);

		g_sprites.bombJack.scale = origScale;
	}


},


backToFirstLevel : function() {
	this.clearLevel();
	this.level = 1;
	this.createLevel(this.level);
},


changeLevel : function() {
	this.clearLevel();
	this.nextLevel();
	if (this.level > 5 && this.level % 5 == 0){
		this.createLevel(1);
	}
},



clearLevel : function() {
	entityManager.eraseAllEntities();
},

nextLevel : function(){
	//this.playLevelChangeSound();
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

	case 3:
		return this._levelInfo.three;
		break;
	case 4:
		return this._levelInfo.four;
		break;
	case 5:
		return this._levelInfo.five;
		break;


	}

},



playLevelChangeSound : function(){
    var levelChangeSound = new Audio(
        "sounds/levelChangeSound.wav");
    levelChangeSound.volume = 0.2;
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

	if(level.bird){
		for (var i = 0; i < level.bird.length; i++) {
			entityManager.generateBird(level.bird[i]);
		};
	}

	if(level.bomb){
		var ignite = 350;
		for (var i = 0; i < level.bomb.length; i++) {
			entityManager.generateBomb(level.bomb[i]);
			if (i%2 == 0){
				entityManager._bombs[i].timeToIgnite = ignite;
				ignite = ignite + 350;
			}

		};
	}

	if(level.powerup){
		for (var i = 0; i < level.powerup.length; i++) {
			entityManager.generatePowerup(level.powerup[i]);
		};
	}

	backgroundManager.setBackground(level.background);
	soundManager.setBackgroundMusic(level.backgroundSound);


},


// Level info for each level
_levelInfo : {


	one:{

	background: "img/backgroundEgypt.png",
	backgroundSound : "sounds/arcade/Arcade-Track1.mp3",

	// JACK
	jack:{cx : 300,cy : 500},

	// PLATFORMS
	platform:[

		//Top Left Platform
		{cx : 5*30, cy : 5*30, width : 3*30, color : 1},

		//Top Right Platform
		{cx : 14*30, cy : 4*30, width : 3*30, color : 1},

		//Middle Platform
			{cx : 11*30, cy : 11*30, width : 3*30, color : 1},

		//Bottom Left Platform
		{cx : 4*30, cy : 15*30, width : 3*30, color : 1},

		//Bottom Right Platform
			{cx : 15*30, cy : 15*30, width : 7*30, color : 1},

	],

	// ENEMIES
	enemy:[
			//Bottom Left Enemy
			//{cx : 4*30, cy : 15*30-20, range : 100, velX: 1.2},
			//Top Left Enemy
			{cx : 5*30, cy : 4*30+10, range : 3*30, velX: 0.9},
			//Top Right Enemy
			{cx : 14*30, cy : 3*30+10, range : 3*30, velX: 1}
	],

	// BIRDS
	bird:[

		//{cx : 10*30, cy : 2*30, range : 400, velX: 2}

	],

	// BOMBS
	bomb:[
		/*{cx: 80, cy: 20},
			{cx: 140, cy: 20},
			{cx: 200, cy: 20},*/

			{cx: 3*30,    cy: 1*30},
			{cx: 5*30,    cy: 1*30},
			{cx: 7*30,    cy: 1*30},

			{cx: 13*30,    cy: 3*30},
			{cx: 15*30,    cy: 3*30},
			{cx: 17*30,    cy: 3*30},


			{cx: 11*30,    cy: 5*30},
			{cx: 13*30,    cy: 5*30},
			{cx: 15*30,    cy: 5*30},
			{cx: 17*30,    cy: 5*30},

			{cx: 1*30, cy: 7*30},
			{cx: 1*30, cy: 9*30},
			{cx: 1*30, cy: 11*30},
			{cx: 1*30, cy: 13*30},

			{cx: 19*30, cy: 7*30},
			{cx: 19*30, cy: 9*30},
			{cx: 19*30, cy: 11*30},
			{cx: 19*30, cy: 13*30},

			{cx: 13*30,    cy: 14*30},
			{cx: 15*30,    cy: 14*30},
			{cx: 17*30,    cy: 14*30},

			{cx: 3*30,    cy: 18*30},
			{cx: 5*30,    cy: 18*30},
			{cx: 7*30,    cy: 18*30},


	],

	// POWERUPS
	powerup:[{cx: 1*30,    cy: 14*30}]


},

two:{

	background: "img/backgroundGreek.png",
	backgroundSound : "sounds/arcade/Arcade-Track2.mp3",

	jack: {cx : 300,cy : 450},


	// PLATFORMS
	platform: [

			//Top Left Platform
			{cx : 3*30, cy : 6*30, width : 6*30, color : 2},

			//Top Right Platform
			{cx : 17*30, cy : 6*30, width : 6*30, color : 2},

			//Middle Left
			{cx : 4*30, cy : 11*30, width : 3*30, color : 2},

			//Middle Right
			{cx : 16*30, cy : 11*30, width : 3*30, color : 2},

			//Bottom Left
			{cx : 7*30, cy : 15*30, width : 3*30, color : 2},

			//Bottom Right
			{cx : 13*30, cy : 15*30, width : 3*30, color : 2},

		],

		// ENEMIES
		enemy : [
			//Top RightL
			{cx : 17*30, cy :  5*30+10, range :  6*30, velX: 0.8},
			//Top RightR
			{cx : 17*30, cy : 5*30+10, range : 6*30, velX: 0.8, movingRight : true},
			//Top Left
			{cx :  3*30, cy :  5*30+10, range :  5*30, velX: 1.2},
			//Bottom Left
			{cx :  7*30, cy : 14*30+10, range :  3*30, velX: 1.1},

		],

		// BIRDS
		bird : [
			//{cx : 6*30, cy : 5*30, range : 200, velX: 1.5}

		],


		// BOMBS
		 bomb: [

			//Bottom Left Bombs
			{cx: 3*30,    cy: 14*30},
			{cx: 5*30,    cy: 14*30},
			{cx: 7*30,    cy: 14*30},

			//Bottom Right Bombs
			{cx: 13*30,    cy: 14*30},
			{cx: 15*30,    cy: 14*30},
			{cx: 17*30,    cy: 14*30},

			//Middle Left Bombs
			{cx: 3*30,    cy: 10*30},
			{cx: 5*30,    cy: 10*30},
			{cx: 7*30,    cy: 10*30},

			//Middle Right Bombs
			{cx: 13*30,    cy: 10*30},
			{cx: 15*30,    cy: 10*30},
			{cx: 17*30,    cy: 10*30},

			//Top Left Bombs
			{cx: 1*30,    cy: 4*30},
			{cx: 3*30,    cy: 4*30},
			{cx: 5*30,    cy: 4*30},

			//Top Right Bombs
			{cx: 15*30,   cy: 4*30},
			{cx: 17*30,   cy: 4*30},
			{cx: 19*30,   cy: 4*30},

			//Upper Top Middle Bombs
			{cx: 7*30,    cy: 2*30},
			{cx: 9*30,    cy: 2*30},
			{cx: 11*30,   cy: 2*30},
			{cx: 13*30,   cy: 2*30},

			//Lower Top Middle Bombs
			{cx: 7*30,    cy: 6*30},
			{cx: 9*30,    cy: 6*30},
			{cx: 11*30,   cy: 6*30},
			{cx: 13*30,   cy: 6*30},

		],

		// POWERUPS
		powerup: []
},

three:{

	background: "img/backgroundCastle.png",
	backgroundSound : "sounds/arcade/Arcade-Track3.mp3",

	jack: {cx : 300,cy : 250},


	// PLATFORMS
	platform: [

			//Top Left Platform
			{cx : 6*30, cy : 5*30, width : 3*30, color : 1},

			//Top Right Platform
			{cx : 14*30, cy : 5*30, width : 3*30, color : 1},

			//Bottom Left
			{cx : 3*30, cy : 15*30, width : 3*30, color : 1},

			//Bottom Right
			{cx : 17*30, cy : 15*30, width : 3*30, color : 1},

			//Bottom Middle
			{cx : 10*30, cy : 13*30, width : 3*30, color : 1},

		],

		// ENEMIES
		enemy : [

			//{cx : 6*30,  cy : 130, range : 90, velX: 1.2},
			{cx : 14*30, cy : 4*30+10, range : 90, velX: 1},
			{cx : 10*30, cy : 18*30+10, range : 300, velX: 1.5},

		],

		// BIRDS
		bird : [
			{cx : 10*30, cy : 16*30, range : 16*30, velX: 1.5},

			//{cx : 300, cy : 340, range : 500, velX: 4},

			//{cx : 300, cy : 70, range : 400, velX: 2}
		],


		// BOMBS
		 bomb: [

			//Bottom Left Bombs
			//{cx: 1*30,    cy: 14*30},
			{cx: 3*30,    cy: 14*30},
			{cx: 5*30,    cy: 14*30},

			//Bottom Right Bombs
			{cx: 15*30,    cy: 14*30},
			{cx: 17*30,    cy: 14*30},
			{cx: 19*30,    cy: 14*30},

			//Ground Left Bombs
			{cx: 8*30,    cy: 18*30},
			{cx: 6*30,    cy: 18*30},

			//Ground Right Bombs
			{cx: 12*30,    cy: 18*30},
			{cx: 14*30,    cy: 18*30},

			//Middle Left Bombs
			{cx: 8*30,    cy: 8*30},
			{cx: 8*30,    cy: 10*30},
			{cx: 8*30,    cy: 12*30},

			//Middle Right Bombs
			{cx: 12*30,    cy: 8*30},
			{cx: 12*30,    cy: 10*30},
			{cx: 12*30,    cy: 12*30},

			//Top Left Platform Bombs
			{cx: 5*30,    cy: 4*30},
			{cx: 7*30,    cy: 4*30},

			//Top Right Platform Bombs
			{cx: 13*30,   cy: 4*30},
			{cx: 15*30,   cy: 4*30},

			//Top Left Bombs
			{cx: 2*30,    cy: 1*30},
			{cx: 4*30,    cy: 1*30},

			//Top Right Bombs
			{cx: 16*30,    cy: 1*30},
			{cx: 18*30,    cy: 1*30},

		],

		// POWERUPS
		powerup:[{cx: 1*30,    cy: 14*30}]
},


four:{

	background: "img/backgroundCity.png",
	backgroundSound : "sounds/arcade/Arcade-Track4.mp3",

	jack: {cx : 300,cy : 450},


	// PLATFORMS
	platform: [

			//Top Left Platform
			{cx : 5*30, cy : 5*30, width : 3*30, color : 1},

			//Top Right Platform
			{cx : 15*30, cy : 5*30, width : 3*30, color : 1},


			//Bottom Left
			{cx : 5*30, cy : 15*30, width : 3*30, color : 1},

			//Bottom Right
			{cx : 15*30, cy : 15*30, width : 3*30, color : 1},



		],

		// ENEMIES
		enemy : [

			{cx : 5*30, cy : 14*30+10, range : 3*30, velX: 1.2, movingRight: true},
			{cx : 15*30, cy : 4*30+10, range : 3*30, velX: 1.5},
			//{cx : 15*30, cy : 430, range : 100, velX: 1.8, movingRight: true},
			{cx : 5*30, cy : 4*30+10, range : 3*30, velX: 2},
			//{cx : 3*30, cy : 545, range : 100, velX: 2, movingRight: true},
			{cx : 17*30, cy : 545, range : 3*30, velX: 1.5}

		],

		// BIRDS
		bird : [
			//{cx : 150, cy : 325, range : 300, velX: 2},
			{cx : 15*30, cy : 11*30, range : 10*30, velX: 1.5}
		],


		// BOMBS
		 bomb: [

			//Bottom Left Bombs
			//{cx: 1*30,    cy: 14*30},
			{cx: 4*30,    cy: 14*30},
			{cx: 6*30,    cy: 14*30},
			{cx: 8*30,    cy: 14*30},

			//Bottom Right Bombs
			{cx: 12*30,    cy: 14*30},
			{cx: 14*30,    cy: 14*30},
			{cx: 16*30,    cy: 14*30},

			//Ground Left Bombs
			{cx: 1*30,    cy: 18*30},
			{cx: 3*30,    cy: 18*30},
			{cx: 5*30,    cy: 18*30},

			//Ground Right Bombs
			{cx: 15*30,    cy: 18*30},
			{cx: 17*30,    cy: 18*30},
			{cx: 19*30,    cy: 18*30},

			//Middle Left Bombs
			{cx: 15*30,    cy: 9*30},
			{cx: 17*30,    cy: 9*30},
			{cx: 19*30,    cy: 9*30},

			//Middle Right Bombs
			{cx: 1*30,    cy: 9*30},
			{cx: 3*30,    cy: 9*30},
			{cx: 5*30,    cy: 9*30},

			//Top Left Platform Bombs
			{cx: 1*30,    cy: 4*30},
			{cx: 3*30,    cy: 4*30},
			{cx: 5*30,    cy: 4*30},

			//Top Right Platform Bombs
			{cx: 13*30,    cy: 4*30},
			{cx: 15*30,    cy: 4*30},
			{cx: 17*30,    cy: 4*30},



		],

		// POWERUPS
		powerup:[{cx: 1*30,    cy: 14*30}]
},

five:{

	background: "img/backgroundCityNight.png",
	backgroundSound : "sounds/arcade/Arcade-Track5.mp3",

	jack: {cx : 300,cy : 450},


	// PLATFORMS
	platform: [


		],

		// ENEMIES
		enemy : [

			{cx : 4*30, cy : 18*30+10, range : 3*30, velX: 1.2},
			{cx : 420, cy : 18*30+10, range : 3*30, velX: 1},

		],

		// BIRDS
		bird : [

			{cx : 3*30, cy : 14*30, range : 15*30, velX: 1.5},
			{cx : 17*30, cy : 14*30, range : 15*30, velX: 1.8, movingRight: true}

		],


		// BOMBS
		 bomb: [

		//First column from left

			{cx: 3*30,    cy: 12*30},
			{cx: 3*30,    cy: 14*30},
			{cx: 3*30,    cy: 16*30},


			{cx: 3*30,    cy: 4*30},
			{cx: 3*30,    cy: 6*30},
			{cx: 3*30,    cy: 8*30},

			//Second column from left
			{cx: 7*30,    cy: 12*30},
			{cx: 7*30,    cy: 14*30},
			{cx: 7*30,    cy: 16*30},

			{cx: 7*30,    cy: 4*30},
			{cx: 7*30,    cy: 6*30},
			{cx: 7*30,    cy: 8*30},

			//Second column from left
			{cx: 13*30,    cy: 12*30},
			{cx: 13*30,    cy: 14*30},
			{cx: 13*30,    cy: 16*30},

			{cx: 13*30,    cy: 4*30},
			{cx: 13*30,    cy: 6*30},
			{cx: 13*30,    cy: 8*30},


			//Bottom Right Bombs
			{cx: 17*30,    cy: 12*30},
			{cx: 17*30,    cy: 14*30},
			{cx: 17*30,    cy: 16*30},

			{cx: 17*30,    cy: 4*30},
			{cx: 17*30,    cy: 6*30},
			{cx: 17*30,    cy: 8*30},




			//Top Right Bombs

		],

		// POWERUPS
		powerup:[
		{cx: 1*30,    cy: 14*30},
			{cx: 19*30,    cy: 14*30}
		],

	}


}

}
