var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a8999b50-63a9-4d4d-ad02-e303fd7da080","fd9c8b3d-cb72-4b67-a061-c1096f28a01c","4967abb1-eded-40b9-b68b-8f2a4e1cfae1"],"propsByKey":{"a8999b50-63a9-4d4d-ad02-e303fd7da080":{"name":"golfball","sourceUrl":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png"},"fd9c8b3d-cb72-4b67-a061-c1096f28a01c":{"name":"girl","sourceUrl":"assets/api/v1/animation-library/gamelab/ajiwg1mVBfXEw7BrAKOmYdXrdhpmDJn5/category_people/blue_dress_hands_in_front.png","frameSize":{"x":127,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"ajiwg1mVBfXEw7BrAKOmYdXrdhpmDJn5","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":127,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/ajiwg1mVBfXEw7BrAKOmYdXrdhpmDJn5/category_people/blue_dress_hands_in_front.png"},"4967abb1-eded-40b9-b68b-8f2a4e1cfae1":{"name":"robot","sourceUrl":"assets/api/v1/animation-library/gamelab/TQLQS4N5N65EoHWE_QQsm5sJb90US0MD/category_robots/robot_03.png","frameSize":{"x":214,"y":396},"frameCount":1,"looping":true,"frameDelay":2,"version":"TQLQS4N5N65EoHWE_QQsm5sJb90US0MD","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":214,"y":396},"rootRelativePath":"assets/api/v1/animation-library/gamelab/TQLQS4N5N65EoHWE_QQsm5sJb90US0MD/category_robots/robot_03.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;
var gamestate ="serve";
var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");


// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";
striker.setAnimation("golfball");
striker.scale=.05

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";
playerMallet.setAnimation("girl");
playerMallet.scale=.15

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";
computerMallet.setAnimation("robot");
computerMallet.scale=.15


//score variables
var playerScore=0;
var compScore=0;

function draw() {
  
  //clear the screen
  background("green");
  
 
 //display scores
  textSize(18);
  fill("pink");
  text(compScore, 25,225);
  text(playerScore,25,185);   
  

 if (gamestate==serve) {
//display text
textSize(18)
fill("maroon")
text("Press space to strike",120,180);
//serve the striker when space is pressed
  if (keyDown("space")) 
    serve();{
gamestate="play"}
 }
   

if (gamestate == "play") {
 //make it move with the striker's y position
  computerMallet.x = striker.x;}
   if (playerScore==5 || compScore==5) {
    gameState="end"
  }
   

if (gamestate == "end") {
    if( playerScore==5 || compScore==5)
      
        fill("red");
        textSize(22);
        text("Game Over!",170,160); }
    
  
  
 // Score
  
     if(striker.isTouching(goal1))
      { 
        compScore = compScore + 1;
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
   
      
     //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
 //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  
  
 
 

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}
 drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
