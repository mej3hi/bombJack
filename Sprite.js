// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image;

    this.width = image.width;
    this.height = image.height;
    this.scale = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, frame) {
    if (rotation === undefined) rotation = 0;
    
    var cropX = frame[0];
    var cropY = frame[1];
    var cropWidth = frame[2];
    var cropHeight = frame[3];

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-cx, -cy);
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, cropX, cropY, cropWidth, cropHeight, cx - (cropWidth/2), cy-(cropHeight/2), cropWidth, cropHeight);
    
    ctx.restore();
};  

