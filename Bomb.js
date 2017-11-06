// ====
// Bomb
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bomb(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.bomb;
    this.scale  = this.scale  || 1;

    this.points =  this.points || 100;


/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};



Bomb.prototype = new Entity();

Bomb.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
     

};

Bomb.prototype.collectBomb = function(){
    this.playCollectBombSound();
    this.kill();
    return this.points;
}

Bomb.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};
Bomb.prototype.playCollectBombSound = function(){
    Bomb.prototype.collectBombSound = new Audio(
        "sounds/collectBomb.wav");
    this.collectBombSound.play();
}

Bomb.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;

    var frame = [0,0,14,16];
    this.sprite.drawWrappedCentredAt(ctx, this.cx, this.cy, this.rotation, frame);

    this.sprite.scale = origScale;

};
