// =======
// POWERUP
// =======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Powerup(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.powerup;
    this.scale  = this.scale  || 2;

    this.points =  this.points || 500;
    this.collected = false;


/*
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};



Powerup.prototype = new Entity();

Powerup.prototype.animate = [
    [292, 116, 12, 12],
];


Powerup.prototype.pointsLifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;
Powerup.prototype.effectLifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Powerup.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    if(this.collected){
        this.pointsLifeSpan -= du;
    }

    if (this.pointsLifeSpan < 0) return entityManager.KILL_ME_NOW;

    // TODO: YOUR STUFF HERE! --- (Re-)Register
    if (!this.collected){
        spatialManager.register(this);
    }

};

Powerup.prototype.collectPowerup = function(){
    this.playCollectPowerupSound();
    this.collected = true;
    return this.points;
}



Powerup.prototype.getRadius = function () {
    return this.scale * 8 * 0.9;
};
Powerup.prototype.playCollectPowerupSound = function(){
    Powerup.prototype.collectPowerupSound = new Audio(
        "sounds/collectBomb.wav");
    this.collectPowerupSound.volume = 0.2;
    this.collectPowerupSound.play();
}

Powerup.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = this.scale;

    var frame = [0,0,14,16];



    if (this.collected) {
        ctx.font="20px Georgia";
        if (this.cx > 550) ctx.fillText(this.points,this.cx-50,this.cy);
        else if (this.cx < 50) ctx.fillText(this.points,this.cx+20,this.cy);
        else ctx.fillText(this.points,this.cx,this.cy);
    }
    else  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, this.animate[0]);

    this.sprite.scale = origScale;

};
