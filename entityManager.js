// ==============
// ENTITY MANAGER
// ==============

/*

entityManager.js

A module which handles arbitrary entity-management for "Bomb Jack"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_platforms : [],
_bullets   : [],
_enemies   : [],
_birds     : [],
_jack      : [],
_bombs     : [],
_powerups  : [],

// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._platforms, this._bombs ,this._powerups, this._enemies, this._birds, this._bullets, this._jack];
},

eraseAllEntities : function(){
    for (var c = 0; c < this._categories.length; ++c) {
        var aCategory = this._categories[c];
        var i = 0;
        while (i < aCategory.length) {
            aCategory[i].kill();
            i++;
        }
    }

},

init: function() {
    //this._generateShip();
},


generatePlatform : function(descr) {
    this._platforms.push(new Platform(descr));
},

generateBomb : function(descr) {
    this._bombs.push(new Bomb(descr));
},

generatePowerup : function(descr) {
    this._powerups.push(new Powerup(descr));
},

generateEnemy : function(descr) {
    this._enemies.push(new Enemy(descr));
},

generateBird : function(descr) {
    this._birds.push(new Bird(descr));
},

generateJack : function(descr) {
    this._jack.push(new Jack(descr));
},


update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
