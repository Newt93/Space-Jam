import kaboom from "kaboom"

// initialize context
kaboom({
  width: 720,
  height: 540
})

// load assets
loadPedit("Player", "sprites/Player.pedit");
loadSprite("lightening", "sprites/lightening.png");
loadSprite("coin", "sprites/coin.png");
loadSprite("bomb", "sprites/bomb.png");
loadSound("coinpickup", "sounds/coinpickup.mp3");
loadSound("explode", "sounds/explode.mp3");
loadSound("theGreatMachine", "sounds/theGreatMachine.ogg");
loadSprite("lvlOneBg", "sprites/lvlOneBg.jpg");
loadSound("ouch", "sounds/ouch.mp3");

// Game Setup
// Layers
layers([
  "bg",
  "game",
  "ui",
], "game")

// Adds the background for the level
add([
  sprite("lvlOneBg"),
  pos(0, 0),
  layer("bg"),
  fixed()
])

// Plays background music for level 1
play("theGreatMachine", {
  volume: 0.5,
  loop: true
})

// add a character to screen
let Player = add([
  sprite("Player"),
  pos(80, 40),
  area(),
  scale(1.7),
  rotate(90),
  body(),
  layer("game"),
  gravity(-0.1),
  origin("center")
])

// Level Design
addLevel([
  "                     ",
  "    $                ",
  "           $         ",
  "      %      $       ",
  "                     ",
  "         ^           ",
  "    $         ^      ",
  "             $       ",
  "  ^      $           ",
  "     %               ",
  "             ^       ",
  "      $              "
], {
  width: 42,
  height: 42,
  // Defining symbols for object placement
  "^": () => [
    sprite("bomb"),
    area(),
    solid(),
    "bomb",
    scale(0.5),
    layer("game"),
    origin("center")
  ],
  "$": () => [
    sprite("coin"),
    area(),
    pos(0, -9),
    "coin",
    scale(0.5),
    layer("game"),
    origin("center")
  ],
  "%": () => [
    sprite("lightening"),
    area(),
    "boost",
    scale(0.4),
    layer("game"),
    origin("center")
  ],
})

// Player Movement 
// Move player right
onKeyDown("d", () => {
  Player.move(150, 0)
})

// Move player left
onKeyDown("a", () => {
  Player.move(-150, 0)
})

// Move player down
onKeyDown("s", () => {
  Player.move(0, 150)
})

// Move player up
onKeyDown("w", () => {
  Player.move(0, -150)
})

// On Collision
// Colliding with coins
Player.onCollide("coin", (coin) => {
  destroy(coin),
    play("coinpickup")
})

// Colliding with bombs
Player.onCollide("bomb", (bomb) => {
  destroy(bomb),
    play("explode"),
    destroy(Player)
})


