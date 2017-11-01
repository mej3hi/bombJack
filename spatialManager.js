/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    return this._nextSpatialID++;

    // TODO: YOUR STUFF HERE!

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

   this._entities.push(entity);

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    for (var i in this._entities) {
      if(spatialID === this._entities[i].getSpatialID()) {
        this._entities.splice(i, 1);
        break;
      }
   };

    // TODO: YOUR STUFF HERE!

},

findEntityInRange: function(posX, posY, radius) {

    var g_canvasHeight = g_canvas.height;
    var g_canvasWidth = g_canvas.width;

    for(var i in this._entities){

        var e = this._entities[i];
        var entityPos = e.getPos();
        var entityRadius = e.getRadius();

        var wrappedDistSq = util.wrappedDistSq(
            entityPos.posX,  entityPos.posY, 
            posX, posY,
            g_canvasWidth, g_canvasHeight);

        var radiusDistSq = util.square(entityRadius) + util.square(radius);

        if ( wrappedDistSq < radiusDistSq){
            return e;
        }

    }



    // TODO: YOUR STUFF HERE!

},

render: function(ctx) {
    //console.log("render");
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {     
        var e = this._entities[ID];
        var entityPos = e.getPos();
        var entityRadius = e.getRadius();
        util.strokeCircle(ctx, entityPos.posX, entityPos.posY, entityRadius);       
    }
    ctx.strokeStyle = oldStyle;
}

}
