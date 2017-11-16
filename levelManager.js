// ==========
// LEVEL STUFF
// ==========

// LEVEL STUFF

var levelManager = {

level : 1,
totalBomb : 0,

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
	if(entityManager._bombs.length <= 15){

		if(this.level < 1){
			// play start theman
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
			// play winnign theman
				this.clearLevel();
				this.level = 1;
				scoreboardManager.clearScore();
				winningScene.playIntro(initialFirstLevel);
				//console.log("render winningScene")

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
		for (var i = 0; i < level.bomb.length; i++) {
			entityManager.generateBomb(level.bomb[i]);
			this.totalBomb++;
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
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

		jack:{cx : 300,cy : 500},

		platform:[

				//Top Left Platform
		    {cx : 7*30, cy : 150, width : 100, color : 1},

				//Top Right Platform
				{cx : 14*30, cy : 3*30, width : 100, color : 1},

				//Middle Platform
		    {cx : 11*30, cy : 11*30, width : 100, color : 1},

				//Bottom Left Platform
				{cx : 4*30, cy : 15*30, width : 100, color : 1},

				//Bottom Right Platform
		    {cx : 15*30, cy : 15*30, width : 200, color : 1},

		],

		enemy:[
				//Bottom Left Enemy
				//{cx : 4*30, cy : 15*30-20, range : 100, velX: 1.2},
				//Top Left Enemy
		   	{cx : 7*30, cy : 5*30-20, range : 100, velX: 0.9},
				//Top Right Enemy
		   	{cx : 14*30, cy : 3*30-20, range : 100, velX: 1}
		],

		bird:[{cx : 4*30, cy : 15*30-20, range : 300, velX: 3}],

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
		],

		powerup:[]


	},

	two:{

		background: "img/backgroundGreek.png",
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

		jack: {cx : 300,cy : 500},


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
				/*
		    {cx : 120, cy : 425, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, range : 100, velX: 1},
				*/
    	],

    	// BIRDS
    	bird : [],


    	// BOMBS
	     bomb: [
		    {cx: 80, cy: 20},
		    {cx: 140, cy: 20},
		    {cx: 200, cy: 20},


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
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

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
				/*
		    {cx : 120, cy : 425, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, range : 100, velX: 1},
				*/
    	],

    	// BIRDS
    	bird : [{cx : 250, cy : 425, range : 600, velX: 2}],


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
		    {cx: 1*30,    cy: 1*30},
		    {cx: 3*30,    cy: 1*30},

				//Top Right Bombs
		    {cx: 17*30,    cy: 1*30},
		    {cx: 19*30,    cy: 1*30},

	    ],

	    // POWERUPS
	    powerup:[{cx: 1*30,    cy: 14*30}]
	},


	four:{

		background: "img/backgroundCity.png",
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

		jack: {cx : 300,cy : 250},


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
				/*
		    {cx : 120, cy : 425, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, range : 100, velX: 1},
				*/
    	],

    	// BIRDS
    	bird : [{cx : 250, cy : 425, range : 600, velX: 2}],


    	// BOMBS
	     bomb: [

				//Bottom Left Bombs
		    //{cx: 1*30,    cy: 14*30},
		    {cx: 3*30,    cy: 14*30},
		    {cx: 5*30,    cy: 14*30},
		    {cx: 7*30,    cy: 14*30},

				//Bottom Right Bombs
		    {cx: 13*30,    cy: 14*30},
		    {cx: 15*30,    cy: 14*30},
		    {cx: 17*30,    cy: 14*30},

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
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

		jack: {cx : 300,cy : 250},


		// PLATFORMS
		platform: [





	    ],

    	// ENEMIES
    	enemy : [
				/*
		    {cx : 120, cy : 425, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, range : 100, velX: 1},
				*/
    	],

    	// BIRDS
    	bird : [

    	{cx : 250, cy : 425, range : 600, velX: 2},
    	{cx : 150, cy : 225, range : 600, velX: 2}

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
	    powerup:[{cx: 1*30,    cy: 14*30}]
	}

}



}
