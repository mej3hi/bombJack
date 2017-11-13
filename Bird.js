// ====
// BIRD
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bird(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;

    this.origX = this.cx;
    this.origY = this.cy;

    this.velX = this.velX || 1;
    this.velY = this.velY || 0;

    this.range = this.range || 200;
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.bird;
    this.scale  = this.scale  || 2;

    this.movingRight = false;
/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};


Bird.prototype = new Entity();

/*Enemy.prototype.setVelocity = function (velX,velY) {
    this.velX = velX;
    this.velY = velY;
};*/

Bird.prototype.animate = [
    [201, 53, 15, 15],
    [221, 53, 15, 15],
    [240, 53, 17, 15],
    [139, 53, 18, 15],
    [159, 53, 18, 15],
    [179, 53, 18, 15],
    [260, 53, 17, 15]
];

Bird.prototype.renderFrame = 0;
Bird.prototype.duPerAnimFrame = 12;
Bird.prototype.nextFrame = 0;

Bird.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    if (!this.movingRight){
        this.cx -= this.velX * du;
        if (this.cx < this.origX - this.range/2 ){

            this.movingRight = true;
            this.cx += this.velX * du;
        }
        
    }
    if (this.movingRight){
        this.cx += this.velX * du;
        if (this.cx > this.origX + this.range/2 ){

            this.movingRight = false;
            this.cx += this.velX * du;
        }
    }
    this.cy += this.velY * du;
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
     

};

Bird.prototype.getRadius = function () {
    return this.scale * (this.animate[0][3]/2) * 0.9;
};


// HACKED-IN AUDIO (no preloading)
Bird.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Bird.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");


Bird.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    var frame;

    if (this.movingRight) {
        frame = this.animate[this.renderFrame];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 3;
        }
        this.nextFrame++;
    } else {
        frame = this.animate[this.renderFrame + 3];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 3;
        }
        this.nextFrame++;
    }

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, frame); 

    this.sprite.scale = origScale;
};