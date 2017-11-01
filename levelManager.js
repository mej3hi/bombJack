// ==========
// LEVEL STUFF
// ==========

// LEVEL STUFF

var levelManager = {

level : 1,
//totalBomb : 0,

_gridWidth : 40,
_gridHeight : 40,
mapWidth : 0,
mapHeight :0,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",



update : function(du){
	/*if(this.totalBomb === 0){
		console.log("næsta level");
		//this.nextLevel();
	}*/

},

render : function(ctx){
	var posX =  g_canvas.width - 330;
	var posY = g_canvas.height - 5; 

	util.fillText(ctx, 
		posX,
		posY-20,
		"LEVEL",
		this._fontSize,
		this._fontFamliy,
		this._fontColor);

	util.fillText(ctx, 
		posX+22,
		posY,
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



nextLevel : function(){
	this.level++;
	this.getLevel(this.getLevel());
},

getLevel : function(){
	switch(this.level){
	case 1:
		return this._levelInfo.one;
		break;
	}	
},


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

setMapHeight : function(grid){
	this.mapHeight = grid.length * this._gridHeight;
},

setmapWidth : function(grid){
	this.mapWidth = grid[0].length * this._gridWidth;
},



// Level info for each level 
_levelInfo : {
	

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

	},


}






}