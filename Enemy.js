// ====
// Enemy
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Enemy(descr) {
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
    this.sprite = this.sprite || g_sprites.enemy;
    this.scale  = this.scale  || 2;

    this.movingRight = this.movingRight || false;
/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};


Enemy.prototype = new Entity();

/*Enemy.prototype.setVelocity = function (velX,velY) {
    this.velX = velX;
    this.velY = velY;
};*/

Enemy.prototype.animate = [
    [45, 53, 11, 15],
    [61, 53, 11, 15],
    [76, 53, 13, 15],
    [92, 53, 11, 15],
    [108, 53, 11, 15],
    [123, 53, 13, 15]
];

Enemy.prototype.renderFrame = 0;
Enemy.prototype.duPerAnimFrame = 12;
Enemy.prototype.nextFrame = 0;

Enemy.prototype.update = function (du) {

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

Enemy.prototype.getRadius = function () {
    return this.scale * (this.animate[0][3]/2) * 0.9;
};


// HACKED-IN AUDIO (no preloading)
Enemy.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Enemy.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");


Enemy.prototype.render = function (ctx) {
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
