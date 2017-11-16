// =========
// ASTEROIDS
// =========
/*

A sort-of-playable version of the classic arcade game.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL SHIPS
// ====================

function initialFirstLevel() {
    levelManager.createLevel(1);
}

function init() {
    intro.playIntro(initialFirstLevel);
  //  winningScene.playIntro(initialFirstLevel);
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();
    if(winningScene.isPlaying){
      winningScene.update(du)
      return
    };

    if(intro.hasBeenPlayed){
        levelManager.update(du);
        lifeManager.update(du);
        entityManager.update(du);

    }
    else intro.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = true;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_renderLevelDebug = false;

var KEY_MIXED   = keyCode('M');
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();


}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {


    backgroundManager.render(ctx);
    if(!intro.hasBeenPlayed) intro.render(ctx);
    if(winningScene.isPlaying) winningScene.render(ctx);
    entityManager.render(ctx);
    scoreboardManager.render(ctx);
    lifeManager.render(ctx);
    levelManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        bomb    : "img/Arcade_Bomb_Jack_General_Sprites_3.png",
        powerup : "img/Arcade_Bomb_Jack_General_Sprites_2.png",
        enemy   : "img/Arcade_Bomb_Jack_General_Sprites_2.png",
        bird1   : "img/Arcade_Bomb_Jack_General_Sprites_2.png",
        bird2   : "img/Arcade_Bomb_Jack_General_Sprites_2-MirrorImage.png",
        jack    : "img/Arcade_Bomb_Jack_General_Sprites_2.png",
        bombJackSprite : "img/Arcade_Bomb_Jack_General_Sprites_3.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.bomb      = new Sprite(g_images.bomb);
    g_sprites.powerup   = new Sprite(g_images.powerup);
    g_sprites.enemy     = new Sprite(g_images.enemy);
    g_sprites.birdLeft  = new Sprite(g_images.bird1);
    g_sprites.birdRight = new Sprite(g_images.bird2);
    g_sprites.jack      = new Sprite(g_images.jack);
    g_sprites.intro     = new Sprite(g_images.bombJackSprite);
    g_sprites.bombJack  = new Sprite(g_images.bombJackSprite);

    entityManager.init();
    init();

    main.init();
}

// Kick it off
requestPreloads();
