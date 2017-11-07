// ====
// ROCK
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Platform(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;
    this.width = this.width || 100;
    this.height = this.height || 10;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    // Default sprite and scale, if not otherwise specified
    

/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};


Platform.prototype = new Entity();

Platform.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
     

};

Platform.prototype.getRadius = function () {
    //return this.scale * (this.sprite.width / 2) * 0.9;
};

Platform.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var platformEdgeTop = this.cy - this.halfHeight;
    var platformEdgeBottom = this.cy + this.halfHeight;
    
    // Check Y coords

    
    if ((nextY + r > platformEdgeTop && prevY + r <= platformEdgeTop)||
        (nextY - r < platformEdgeBottom && prevY - r >= platformEdgeBottom)) {

        // Check X coords
        if (nextX + r/2 >= this.cx - this.halfWidth &&
            nextX - r/2 <= this.cx + this.halfWidth) {

            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

// HACKED-IN AUDIO (no preloading)
Platform.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Platform.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");


Platform.prototype.render = function (ctx) {
    
    util.fillBox(ctx, this.cx - this.halfWidth, this.cy - this.halfHeight, this.width,this.height, "yellow")

};
