// ==========
// LEVEL STUFF
// ==========

// LEVEL STUFF

var levelManager = {

level : 1,
totalBomb : 0,

_gridWidth : 40,
_gridHeight : 40,
mapWidth : 600,
mapHeight :560,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",



update : function(du){
	if(this.totalBomb === 0 && this.level <3){		
		this.changeLevel();
		//this.demo();
		
	}

},
/*
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
	
    // for debug the the level
    if (g_renderLevelDebug){
		var grid = this.getLevel().grid;
		for (var i = 0; i < grid.length; i++) {             // row 
	 		for (var u = 0; u < grid[i].length; u++) {      // colum
	 			//console.log("row er "+i+" col er "+u+" það er "+grid[i][u])
	 			var posX = (u*this._gridWidth)+(this._gridWidth/2);
	 			var posY = (i*this._gridHeight)+(this._gridHeight/2);
	 			
	 			if(grid[i][u] !== 0) util.fillCircle(ctx,posX,posY,5,"red");
				util.strokeBox(ctx,u*this._gridWidth,i*this._gridHeight,this._gridWidth,this._gridHeight,"red");
	 		}
		} 

	}   
},


*/
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

createLevel : function (level) {

	//console.log(this.level)
	switch(level){

	case 1:
	    console.log(level)
		return this.levelOne();
		break;
	case 2:
		return this.levelTwo();
		break;
	
	}



},

playLevelChangeSound : function(){
    var levelChangeSound = new Audio(
        "sounds/levelChangeSound.wav");
    levelChangeSound.play();
},

/*
createLevel : function (grideLevel) {
	var grid = grideLevel.grid
	this.setMapHeight(grid);
	this.setmapWidth(grid);


 	for (var i = 0; i < grid.length; i++) {					  // row 
 		for (var u = 0; u < grid[i].length; u++) {			  // colum
 			
 			var posX = (u*this._gridWidth)+(this._gridWidth/2);
 			var posY = (i*this._gridHeight)+(this._gridHeight/2);

 				//console.log("row er "+i*this._gridHeight+" col er "+u*this._gridWidth+" það er "+grid[i][u])
 				//console.log("cx er "+posX+" cy er "+posY+" það er "+grid[i][u])

			switch(grid[i][u]){	   	
		   	case 1:
				console.log("add inn bomerJack")
				console.log("cx er "+posX+" cy er "+posY+" ID er "+grid[i][u])
				entityManager.generateJack({
					cx:posX,
					cy:posY,
					scale:.6
					});
				break;

			case 2:
				console.log("add inn óvinnir")
				console.log("cx er "+posX+" cy er "+posY+" ID er "+grid[i][u])
				
				
				if(i+1 < grid.length){
					var r = 0;
					var h = u-1;
					while(grid[i+1][h] === 4){
						r += this._gridWidth;
						h--;
					}		
				}

				entityManager.generateEnemy({
					cx:posX,
					cy:posY,
					range: r*2,
					scale:.2});
				break;
			
			case 3:
				console.log("add inn bómbur")
				console.log("cx er "+posX+" cy er "+posY+" ID er "+grid[i][u])
				//this.totalBomb++;
				entityManager.generateBomb({cx:posX,cy:posY,scale:0.5});
				break;

			case 4:
				console.log("add inn pallinn")
				console.log("cx er "+posX+" cy er "+posY+" ID er "+grid[i][u])

				var w = 0;
				var h = 10;
				while(grid[i][u] === 4){
					w += this._gridWidth;
					console.log("er í while fyri platform")
					u++
				}
				console.log("h er "+w)

				entityManager.generatePlatform({
					cx: posX + w/2 - this._gridWidth/2,
					cy: posY + h/2 - this._gridHeight/2,
					width: w,
					height:h});
				break;												
			}
 		}

	}


	backgroundManager.setBackground(grideLevel.background)

	
},
*/

levelOne : function () {
	entityManager.generateJack({
        cx : 300,
        cy : 500,
        scale: 1,
        //halfWidth : (g_sprites.jack.width * .2)/2,
        //halfHeight : (g_sprites.jack.height * .2)/2
    });

	// PLATFORMS
    entityManager.generatePlatform({ // *
        cx : 120, cy : 450, scale : .2, width : 100, height : 20

    });

    entityManager.generatePlatform({ // * * 
        cx : 220, cy : 150, scale : .2, width : 100, height : 20
    });
    entityManager.generatePlatform({
        cx : 420, cy : 100, scale : .2, width : 100, height : 20

    });

    entityManager.generatePlatform({
        cx : 350, cy : 350, scale : .2, width : 100, height : 20

    });
    entityManager.generatePlatform({
        cx : 450, cy : 450, scale : .2, width : 200, height : 20

    });


    // ENEMIES
    entityManager.generateEnemy({ // *
        cx : 120, cy : 425, scale : 1, range : 100, velX: 1.2
        
    });
    entityManager.generateEnemy({ // * * 
        cx : 220, cy : 125, scale : 1, range : 100, velX: 0.9
    });

    entityManager.generateEnemy({
        cx : 420, cy : 75, scale : 1, range : 100, velX: 1
    });



     // BOMBS
    entityManager.generateBomb({cx: 80, cy: 20, scale: 2.5});
    entityManager.generateBomb({cx: 140, cy: 20, scale: 2.5});
    entityManager.generateBomb({cx: 200, cy: 20, scale: 2.5});
    

    entityManager.generateBomb({cx: 20, cy: 200, scale: 2.5});
    entityManager.generateBomb({cx: 20, cy: 260, scale: 2.5});
    entityManager.generateBomb({cx: 20, cy: 320, scale: 2.5});
    entityManager.generateBomb({cx: 20, cy: 380, scale: 2.5});

    entityManager.generateBomb({cx: 400, cy: 420, scale: 2.5});
    entityManager.generateBomb({cx: 460, cy: 420, scale: 2.5});
    entityManager.generateBomb({cx: 520, cy: 420, scale: 2.5});

    entityManager.generateBomb({cx: 400, cy: 20, scale: 2.5});
    entityManager.generateBomb({cx: 460, cy: 20, scale: 2.5});
    entityManager.generateBomb({cx: 520, cy: 20, scale: 2.5});

    entityManager.generateBomb({cx: 80, cy: 540, scale: 2.5});
    entityManager.generateBomb({cx: 140, cy: 540, scale: 2.5});
    entityManager.generateBomb({cx: 200, cy: 540, scale: 2.5});

    entityManager.generateBomb({cx: 580, cy: 200, scale: 2.5});
    entityManager.generateBomb({cx: 580, cy: 260, scale: 2.5});
    entityManager.generateBomb({cx: 580, cy: 320, scale: 2.5});
    entityManager.generateBomb({cx: 580, cy: 380, scale: 2.5});

    entityManager.generateBomb({cx: 400, cy: 140, scale: 2.5});
    entityManager.generateBomb({cx: 460, cy: 140, scale: 2.5});
    entityManager.generateBomb({cx: 520, cy: 140, scale: 2.5});


    this.totalBomb = 5; //23;
    backgroundManager.setBackground("img/backgroundEgypt.png");
},

levelTwo : function () {
	entityManager.generateJack({
        cx : 300,
        cy : 500,
        scale: 1,
        //halfWidth : (g_sprites.jack.width * .2)/2,
        //halfHeight : (g_sprites.jack.height * .2)/2
    });

	// PLATFORMS
    entityManager.generatePlatform({ // *
        cx : 220, cy : 350, scale : .2, width : 100, height : 20

    });

    entityManager.generatePlatform({ // * * 
        cx : 120, cy : 250, scale : .2, width : 100, height : 20
    });
    entityManager.generatePlatform({
        cx : 420, cy : 100, scale : .2, width : 100, height : 20

    });

    // ENEMIES
    entityManager.generateEnemy({ // *
        cx : 120, cy : 425, scale : 1, range : 100, velX: 1.2
        
    });
   

    entityManager.generateEnemy({
        cx : 420, cy : 75, scale : 1, range : 100, velX: 1
    });



     // BOMBS
    entityManager.generateBomb({cx: 80, cy: 20, scale: 2.5});
    entityManager.generateBomb({cx: 140, cy: 20, scale: 2.5});
    entityManager.generateBomb({cx: 200, cy: 20, scale: 2.5});
    

    // entityManager.generateBomb({cx: 20, cy: 200, scale: 2.5});
    // entityManager.generateBomb({cx: 20, cy: 260, scale: 2.5});
    // entityManager.generateBomb({cx: 20, cy: 320, scale: 2.5});
    // entityManager.generateBomb({cx: 20, cy: 380, scale: 2.5});

    // entityManager.generateBomb({cx: 400, cy: 420, scale: 2.5});
    // entityManager.generateBomb({cx: 460, cy: 420, scale: 2.5});
    // entityManager.generateBomb({cx: 520, cy: 420, scale: 2.5});

    // entityManager.generateBomb({cx: 400, cy: 20, scale: 2.5});
    // entityManager.generateBomb({cx: 460, cy: 20, scale: 2.5});
    // entityManager.generateBomb({cx: 520, cy: 20, scale: 2.5});

    // entityManager.generateBomb({cx: 80, cy: 540, scale: 2.5});
    // entityManager.generateBomb({cx: 140, cy: 540, scale: 2.5});
    // entityManager.generateBomb({cx: 200, cy: 540, scale: 2.5});

    // entityManager.generateBomb({cx: 580, cy: 200, scale: 2.5});
    // entityManager.generateBomb({cx: 580, cy: 260, scale: 2.5});
    // entityManager.generateBomb({cx: 580, cy: 320, scale: 2.5});
    // entityManager.generateBomb({cx: 580, cy: 380, scale: 2.5});

    // entityManager.generateBomb({cx: 400, cy: 140, scale: 2.5});
    // entityManager.generateBomb({cx: 460, cy: 140, scale: 2.5});
    // entityManager.generateBomb({cx: 520, cy: 140, scale: 2.5});

    backgroundManager.setBackground("img/backgroundLevel2.png");

    this.totalBomb = 3;	
    //this.totalBomb = entityManager._bomb.length;
    //backgroundManager.setBackground("img/backgroundEgypt.png");
},

setMapHeight : function(grid){
	this.mapHeight = grid.length * this._gridHeight;
},

setmapWidth : function(grid){
	this.mapWidth = grid[0].length * this._gridWidth;
},



// Level info for each level 
_levelInfo : {
	

	one:{ 
	/*
		background: "img/backgroundEgypt.png",

		grid:[
			[   0,   0,   0,   0,   0,   0,   0,   0,   2,   0,   0,   0,   0,   0,   0],
			[   0,   3,   3,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
		    [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   0,   0,   2,   0,   0,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   4,   4,   4,   4,   4,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   0,   0,   0,   2]
		]

	},

	one:{ 

		background: "img/backgroundEgypt.png",

		grid:[
			[   0,   0,   0,   0,   0,   0,   0,   0,   2,   0,   0,   0,   0,   0,   0],
			[   0,   3,   3,   3,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
		    [   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   0,   0,   2,   0,   0,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   4,   4,   4,   4,   4,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   3,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
			[   0,   0,   0,   0,   0,   0,   0,   1,   0,   0,   0,   0,   0,   0,   2]
		]
	*/



	},


}






}