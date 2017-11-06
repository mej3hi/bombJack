// ==========
// BACKGROUND STUFF
// ==========

// BACKGROUND STUFF

var backgroundManager = {

image : undefined,

// Set background image 
setBackground : function(img){
	var backgroundImage = new Image();
	backgroundImage.src = img;
	this.image = backgroundImage;
},

update : function(du){

},

render : function(ctx){
	if(!this.image){
		//console.log("No image for the background")
	}
	else ctx.drawImage(this.image,0,0,600,560);
	// var width = levelManager.mapWidth;
	// var height = levelManager.mapHeight;
	
}

}

