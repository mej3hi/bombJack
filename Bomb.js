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
    this.scale  = this.scale  || 2;

    this.points =  this.points || 100;
    this.collected = false;

    this.timeToIgnite = this.timeToIgnite || -1;


/*
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};

Bomb.prototype = new Entity();

Bomb.prototype.animate = [
    [25, 134, 14, 18],
    [45, 134, 14, 18],
    [65, 134, 14, 18],
    [85, 134, 14, 18],
];


Bomb.prototype.frame = [45, 134, 14, 18];
Bomb.prototype.renderFrame = 0;
Bomb.prototype.duPerAnimFrame = 9;
Bomb.prototype.nextFrame = 0;

Bomb.prototype.pointsLifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Bomb.prototype.isIgnite = false;
Bomb.prototype.igniteTime = 10000 / NOMINAL_UPDATE_INTERVAL;


Bomb.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    if(this.collected){
        this.pointsLifeSpan -= du;
    }

    if (this.pointsLifeSpan < 0) return entityManager.KILL_ME_NOW;


   if(this.isIgnite){
        this.igniteTime -= du;
        if(this.igniteTime < 0){
          return entityManager.KILL_ME_NOW;
        }
    }

    // TODO: YOUR STUFF HERE! --- (Re-)Register
    if (!this.collected){
        spatialManager.register(this);
    }

    if(this.timeToIgnite > -1){
        this.timeToIgnite -= du;
        if(this.timeToIgnite < 250){
          this.frame = this.animate[0]
        }
        if( this.timeToIgnite  < 0){
              this.isIgnite = true;
              this.points = 300;
        }
    }

};

Bomb.prototype.collectBomb = function(){
    this.playCollectBombSound();
    this.collected = true;
    return this.points;
}

Bomb.prototype.getRadius = function () {
    return this.scale * 10 * 0.9;
};
Bomb.prototype.playCollectBombSound = function(){
    Bomb.prototype.collectBombSound = new Audio(
        "sounds/collectBomb.wav");
    this.collectBombSound.play();
}

Bomb.prototype.render = function (ctx) {

    var origScale = this.sprite.scale;

    this.sprite.scale = this.scale;

      if (this.collected) {
        ctx.font="20px Georgia";
        if (this.cx > 550) ctx.fillText(this.points,this.cx-50,this.cy);
        else if (this.cx < 50) ctx.fillText(this.points,this.cx+20,this.cy);
        else ctx.fillText(this.points,this.cx,this.cy);

    }
    else {
      if(this.isIgnite){
          this.frame = this.animate[this.renderFrame + 2];
          if (this.nextFrame % this.duPerAnimFrame === 0) {
              this.renderFrame = (this.renderFrame + 1) % 2;
          }
          this.nextFrame++;
        }
      this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.frame);
    }

    this.sprite.scale = origScale;

};
