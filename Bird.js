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
    this.sprite = this.sprite || g_sprites.birdLeft;
    this.scale  = this.scale  || 2;
    this._isWarping = false;

    this.movingRight = this.movingRight || false;
/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

}

Bird.prototype = new Entity();

Bird.prototype.animate = [
    [201, 53, 15, 15],
    [221, 53, 15, 15],
    [240, 53, 17, 15],
    [139, 53, 18, 15],
    [159, 53, 18, 15],
    [179, 53, 18, 15],
    [260, 53, 17, 15],
    [325, 53, 18, 15],
    [305, 53, 18, 15],
    [285, 53, 18, 15],
    [204, 53, 17, 15]
];

Bird.prototype.renderFrame = 0;
Bird.prototype.duPerAnimFrame = 8;
Bird.prototype.nextFrame = 0;

Bird.prototype.origVelX = this.velX;
Bird.prototype.origVelY = this.velY;

//Bird.prototype.startX = this.cx;
//Bird.prototype.startY = this.cy;

Bird.prototype.update = function (du) {

    //Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    if (this._isWarping ) {
        this._updateWarp(du);
        return;
    }

    if (entityManager._jack.length > 0 && this.canSeeJack()) {
        var jackX = entityManager._jack[0].cx;
        var jackY = entityManager._jack[0].cy;

        var distX = jackX - this.cx;
        var distY = jackY - this.cy;
        var distJack = Math.sqrt(distX * distX + distY * distY);
        if (distJack === 0) {
            distJack = 0.1;
        }

        var birdVel = Math.sqrt(this.velX * this.velX + this.velY * this.velY);

        if (birdVel === 0) {
            this.velX = distX * 2 / distJack;
            this.velY = distY * 2 / distJack;
        } else {
            this.velX = distX * birdVel / distJack;
            this.velY = distY * birdVel / distJack;
        }
    }

    for (var i = 0; i < entityManager._platforms.length; i++) {
        if(entityManager._platforms[i].collidesWith(this.cx, this.cy, this.cx + this.velX * du, this.cy + this.velY * du, this.getRadius())) {
            this.velX *= -1;
            this.velY *= -1;
        }
    }

    if (this.cx + this.velX * du > g_canvas.width - this.getRadius || this.cx + this.velX * du < this.getRadius) {
        this.velX *= -1;
    }
    if (this.cy + this.velY * du > g_canvas.height - this.getRadius || this.cy + this.velY * du < this.getRadius) {
        this.velY *= -1;
    }

    if (!this.movingRight){
        this.sprite = g_sprites.birdLeft;
        //this.cx -= this.velX * du;
        //if (this.cx < this.origX - this.range/2 ){

        //    this.movingRight = true;
        //    this.cx += this.velX * du;
        //}
    }
    if (this.movingRight){
        this.sprite = g_sprites.birdRight;
        //this.cx += this.velX * du;
        //if (this.cx > this.origX + this.range/2 ){

        //    this.movingRight = false;
        //    this.cx += this.velX * du;
        //}
    }

    this.cx += this.velX * du;
    this.cy += this.velY * du;
    
    //(Re-)Register
    spatialManager.register(this);
     

};

Bird.prototype.getRadius = function () {
    return this.scale * (this.animate[0][3]/2) * 0.9;
};

Bird.prototype.canSeeJack = function () {
    var jackX = entityManager._jack[0].cx;
    var jackY = entityManager._jack[0].cy;

    var distX = jackX - this.cx;
    var distY = jackY - this.cy;

    var distSteps = Math.sqrt(distX * distX + distY + distY);

    for (var i = 0; i < entityManager._platforms.length; i++) {
        for (var j = 0; j < distSteps; j++) {
            if (entityManager._platforms[i].isWithin(this.cx + (j * (distX / distSteps)), this.cy + (j * (distY / distSteps)))) {
                return false;
            } 
        }
    }
    return true;
};

Bird.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Bird.prototype.warp = function () {

    this._isWarping = true;
    this._scaleDirn = -1;
    
    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

Bird.prototype._updateWarp = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this.scale += this._scaleDirn * SHRINK_RATE * du;

    if (this.scale < 0.2 ) {

        this.cx = this.origX;
        this.cy = this.origY;
        this.halt();
        this._scaleDirn = 1;

    } else if (this.scale > 2) {

        this.scale = 2;
        this._isWarping = false;

        // Reregister me at my new posistion
        // ...so that I can be collided with again
        spatialManager.register(this);

    }
};

Bird.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    var frame;

    if (this.velX === 0) {
        frame = this.animate[this.renderFrame];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 3;
        }
        this.nextFrame++;
    } else if (this.movingRight) {
        frame = this.animate[this.renderFrame + 7];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 4;
        }
        this.nextFrame++;
    } else {
        frame = this.animate[this.renderFrame + 3];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 4;
        }
        this.nextFrame++;
    }

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;

    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, frame); 

    this.sprite.scale = origScale;
};