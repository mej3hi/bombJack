// ==========
// JACK STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Jack(descr) {
    console.log("búa til jack")

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;


    this.origX = this.cx;
    this.origY = this.cy;

    this.velX = this.velX || 0;
    this.velY = this.velY || 0;

    this.rotation = this.rotation || 0;

    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.jack;

    // Set normal drawing scale, and warp state off
    this.scale = this.scale || 2;
    this._isWarping = false;
    this._isJumping = false;

    this.lifesLeft = this.lifesLeft || 3;
};

Jack.prototype = new Entity();

Jack.prototype._score = 0;

//Jack.prototype.halfWidth = this.animate[0][2]/2;

Jack.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Jack.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Jack.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Jack.prototype.animate = [
    [5, 3, 13, 17],
    [25, 3, 14, 17],
    [45, 3, 14, 17],
    [66, 3, 14, 17],
    [86, 3, 13, 17],
    [105, 3, 14, 17],
    [125, 3, 14, 17],
    [145, 3, 13, 17],
    [165, 3, 13, 17],
    [185, 3, 13, 17],
    [205, 3, 13, 17]
];

Jack.prototype.renderFrame = 0;
Jack.prototype.duPerAnimFrame = 9;
Jack.prototype.nextFrame = 0;

Jack.prototype.powerupActive = false;
Jack.prototype.powerupLifespan = 0;
Jack.prototype.powerupEffectSize = 1.5;

//Jack.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values

Jack.prototype.launchVel = 2;
Jack.prototype.numSubSteps = 1;

// HACKED-IN AUDIO (no preloading)
Jack.prototype.warpSound = new Audio(
    "sounds/warpSound.wav");

Jack.prototype.warp = function () {

    this._isWarping = true;
    this._scaleDirn = -1;
    this.warpSound.play();

    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

Jack.prototype._updateWarp = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this.scale += this._scaleDirn * SHRINK_RATE * du;

    if (this.scale < 0.2 ) {

        this._moveToASafePlace();
        this.halt();
        this._scaleDirn = 1;

    } else if (this.scale > 2) {

        this.scale = 2;
        this._isWarping = false;

        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);

    }
};

Jack.prototype._moveToASafePlace = function () {

    // Move to a safe place some suitable distance away

    this.cx = this.origX;
    this.cy = this.origY;



};

Jack.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {

        var dX = +Math.sin(this.rotation);
        var dY = -Math.cos(this.rotation);
        var launchDist = this.getRadius() * 1.2;

        var relVel = this.launchVel;
        var relVelX = dX * relVel;
        var relVelY = dY * relVel;

        entityManager.fireBullet(
           this.cx + dX * launchDist, this.cy + dY * launchDist,
           this.velX + relVelX, this.velY + relVelY,
           this.rotation);

    }

};
Jack.prototype.update = function (du) {
    // Handle warping

    if(lifeManager.getJackLife() <= 0){
      spatialManager.unregister(this);
      return entityManager.KILL_ME_NOW;
    }

    // Check if Jack has 3 lifes to skip warping after game over.
    if (this._isWarping && lifeManager.getJackLife() !=3) {
        this._updateWarp(du);
        return;
    }

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    // Handle firing
    this.maybeFireBullet();

    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.velX * du;
    var nextY = prevY + this.velY * du;

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register

    if (this.powerupActive) {
        this.powerupLifespan -= du;
    }

    if (this.powerupActive && this.powerupLifespan <= 0) {
        this.powerupActive = false;
    }

    var aveVelY = (oldVelY + this.velY) / 2;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    var oldVelY = this.velY;
    // Check Y coords

    var ent = this.isColliding() ;
    if (ent){

        if (ent instanceof Enemy || ent instanceof Bird){
            this.warp();

            lifeManager.takeJackLife(1);
            console.log(lifeManager.getJackLife())
        }

        if (ent instanceof Bomb){
            var score = ent.collectBomb();
            scoreboardManager.addScore(score);
            levelManager.totalBomb--;
            console.log(levelManager.totalBomb);

        }

        if (ent instanceof Powerup){
            var score = ent.collectPowerup();
            scoreboardManager.addScore(score);
            levelManager.totalPowerup--;
            this.powerupActive = true;
            this.powerupLifespan = ent.effectLifeSpan;
        }

        if (ent instanceof Platform){
            // if(ent.collidesWithTop(prevX, prevY, nextX, nextY, this.getRadius())) {
            //     this.velY =  0;
            //     intervalVelY = this.velY;
            //     if(this.cy < ent.cy){
            //         console.log("asdasdadsdasd" ,this.cy )
            //         this._isJumping = false;
            //         this._onPlatform = true;

            //     }
            // }
        }
    }
    else spatialManager.register(this);
};

Jack.prototype.addScore = function(score){
    this._score += score;
};

Jack.prototype.getScore = function(){
    return this._score;
};


Jack.prototype.computeSubStep = function (du) {

    this.movePlayer(du);

};

Jack.prototype.calculateJump = function (accelY) {

    var jump = 0;
    var powerJump = 1;

    if (this.powerupActive) {
        powerJump = this.powerupEffectSize;
    }

    if (eatKey(this.KEY_JUMP) && !this._isJumping) {
        this._isJumping = true;
        jump += NOMINAL_JUMP;
    }

    // Apply jump

    var accelY = -1 * jump * powerJump;

    accelY += NOMINAL_GRAVITY;
    return accelY;

};

var NOMINAL_GRAVITY = 1.12;

var NOMINAL_JUMP = +25.2;



Jack.prototype.movePlayer = function (du) {

    var accelY = 0;
    var accelX = 0;

    accelY = this.calculateJump(accelY);
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;

    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du;

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;

    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;

    // s = s + v_ave * t
    var prevX = this.cx;
    var prevY = this.cy;

    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;

    // var minY = 17*this.scale;
    // // //var maxY = g_canvas.height - minY - 40;
    // var maxY = levelManager.mapHeight - minY;

    // var minX = (g_sprites.jack.width / 2)*this.scale;
    // //var maxX = g_canvas.width - minX;
    // var maxX = levelManager.mapWidth - minX;


    var minY = this.getHalfHeight()*this.scale;
    var maxY = levelManager.mapHeight - minY;

    var minX = this.getHalfWidth()*this.scale;
    var maxX = g_canvas.width - minX;

    // Ignore the bounce if the jack is already in
    // the "border zone" (to avoid trapping them there)


    if (keys[this.KEY_LEFT] && this.cx > 0 + this.getRadius()) {
        this.cx -= 6 * du;
    }
    if (keys[this.KEY_RIGHT] && this.cx < g_canvas.width - this.getRadius()) {
        this.cx += 6 * du;
    }



    if (this.cy > maxY || this.cy < minY) {

        // do nothing
    }
    else if (nextY > maxY) {
        this.cy = maxY;
        this.velY = oldVelY * 0;
        intervalVelY = this.velY;
        this._isJumping = false;

    }else if (nextY < minY){
        this.velY = oldVelY * 0;
        intervalVelY = this.velY;

    }

    for (var i = 0; i < entityManager._platforms.length; i++) {

        if(entityManager._platforms[i].collidesWith(prevX, prevY, nextX, nextY, this.getRadius())) {
            this.velY = oldVelY * 0;
            intervalVelY = this.velY;
            if(this.cy < entityManager._platforms[i].cy){
                this._isJumping = false;
            }
        }
    }

    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};



Jack.prototype.getRadius = function () {
     return ((this.animate[0][3]/2) * 0.9)*this.scale;

};

Jack.prototype.getHalfHeight = function(){
    return this.animate[0][3]/2;
};

Jack.prototype.getHalfWidth = function(){
    return this.animate[0][2]/2;
};

Jack.prototype.takeBulletHit = function () {
    this.warp();
};

Jack.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};


Jack.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    var frame;

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;


    if (this.velY < 0) {
        frame = this.animate[9];
    } else if (this._isJumping && this.velY > 0) {
        frame = this.animate[10];
    } else if (keys[this.KEY_RIGHT]) {
        frame = this.animate[this.renderFrame + 1];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 4;
        }
        this.nextFrame++;
    } else if (keys[this.KEY_LEFT]) {
        frame = this.animate[this.renderFrame + 5];
        if (this.nextFrame % this.duPerAnimFrame === 0) {
            this.renderFrame = (this.renderFrame + 1) % 4;
        }
        this.nextFrame++;
    } else {
        frame = this.animate[0];
    }

    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation, frame);


    this.sprite.scale = origScale;
};
