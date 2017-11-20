// ====
// UTIL
// ====

// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {

// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},


// MISC
// ====

square: function(x) {
    return x*x;
},

// DISTANCES
// =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},


// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r,style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = oldStyle;
},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

strokeBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle=style;
    ctx.strokeRect(x, y, w, h);
    ctx.strokeStyle = oldStyle;
},

fillText: function(ctx, x, y, msg, fontSize, fontFamliy, style){
    var oldStyle = ctx.fillStyle;
    ctx.font = "bolder "+fontSize+" "+fontFamliy;
    ctx.fillStyle = style;
    ctx.fillText (msg, x, y);
    ctx.fillStyle = oldStyle;

},


};
