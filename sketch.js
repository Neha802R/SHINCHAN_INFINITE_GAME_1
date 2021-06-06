//creating all the variables
var shinchan , shinchanImg ;
var capsicum , capsicumImg ;
var chocochips , chocochipsImg ;
var gameOver , gameOverImg ;
var sky , skyImg ;
var cocoCola , cocoColaImg;
var sound ;

//creating gameState
var PLAY = 1 ;
var END = 0 ;
var gameState  ;  

//creating score
var score ;

function preload(){
 
  //loading all the necessary images and sounds
  shinchanImg = loadImage("Shinchan.png");
  capsicumImg = loadImage("16-green-pepper-png-image.png");
  chocoChipsImg = loadImage("chocochips.png");
  skyImg = loadImage("sky.jpg");
  gameOverImg = loadImage("gameOver.png");
  cocoColaImg = loadImage("coco cola.png");
  
  sound = loadSound("Shinchan Song ! Shinchan cartoon.mp3");
  
}

function setup() {
  createCanvas(500 , 500);
  
  //creating background sound
  sound.loop();
  
  //creating sky
  sky = createSprite(250 , 250);
  sky.addImage("sky",skyImg);
  sky.velocityY = 0;
  
  //creating shinchan
  shinchan = createSprite(250 , 400 , 40 , 40);
  shinchan.addImage("shinchan",shinchanImg);
  shinchan.scale =0.1;
  
  //creating groups
  capsicumG = new Group();
  chocoChipsG = new Group();
  cocoColaG = new Group();
  
  //creating score
  score = 0;
}

function draw() {
 background(0);

  //creating game over image
  gameOver = createSprite(250 , 250);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  //start the game when I press enter
  if(keyDown("enter")){
    gameState = PLAY;
  }
  
  if(gameState === PLAY){
    
    //move shinchan right by pressing right arrow
    if(keyDown("right_arrow")){
      shinchan.x = shinchan.x + 3;
    }
    //move shinchan left by pressing left arrow
     if(keyDown("left_arrow")){
      shinchan.x = shinchan.x - 3;
    }
   // make my shinchan jump when I press space
    if(keyDown("space")){
      shinchan.velocityY = -5;
      
  //when shinchan goes out of the screen from up stop my shinchan there
      if(shinchan.y <150){
        shinchan.y= 0;
      }
    }
    
    
    
  //give some gravity to shinchan
     shinchan.velocityY = shinchan.velocityY + 0.8
    
    //make my sky look continuously moving
     if(sky.y > 500){
      sky.y = 300
    }
    spawnCapsicums();
    
    spawnChocochips();
    
    spawnCocoCola();
    
    //when I am touching chocochips make my score increse to 50 and destroy chocochips
    if(chocoChipsG.isTouching(shinchan)){
      score = score+50;
      chocoChipsG.destroyEach();
    }
    //when I am touching cocoCola make my score increse to 100 and destroy cococola
    if(cocoColaG.isTouching(shinchan)){
      score = score+100;
      cocoColaG.destroyEach();
    }
    //if I am touching capsicumG change my gameState to end
     if(capsicumG.isTouching(shinchan)||shinchan.y>500){
      gameState = END;
     }
    if(gameState === END){
      
      //make my gameOver image visible on the screen
      gameOver.visible = true;
      
      //destroy all the variables
      sky.destroy();
      capsicumG.destroyEach();
      chocoChipsG.destroyEach();
      cocoColaG.destroyEach();
      shinchan.destroy();
      
    }
    
  }
  drawSprites();
  
  //make my score visible on the screen
  fill("black");
  text("Score: "+ score, 400,50);
  
  //rules of the game
  if(shinchan.velocityY === 0)
    {
  text("1.Press 'enter' to start",150,100);
  text("2.Use 'space' to move shinchan,right and left arrow to score" , 150,120);
  text("3.Do not touch Capsicum", 150, 140);
  text("4.if you touch cocoCola you will score 100 points", 150 , 160);
  text("5.if you touch chocobi you score 50 points",150,180);
  text("6.All The Best",150,200);
    }
  
}
function spawnCapsicums(){
  //creating capsicum
  
  if (World.frameCount % 350 == 0) {
  var capsicum = createSprite(Math.round(random(50, width-50),40, 10, 10));
  capsicum.addImage(capsicumImg);
  capsicum.scale=0.1;  
  capsicum.velocityY = (5+(score/50));
  capsicum.lifetime = 150;
  capsicumG.add(capsicum);
  }
  
}
function spawnChocochips(){
  //creating chocochips
  
   if (World.frameCount % 300 == 0) {
  var chocoChips = createSprite(Math.round(random(50, width-50),40, 10, 10));
  chocoChips.addImage(chocoChipsImg);
  chocoChips.scale=0.15;
  chocoChips.velocityY = (5+(score/50));
  chocoChips.lifetime = 150;
  chocoChipsG.add(chocoChips);
  }  
}
function spawnCocoCola(){
  //creating cocoCola
  
   if (World.frameCount % 200 == 0) {
  var cocoCola = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cocoCola.addImage(cocoColaImg);
  cocoCola.scale=0.12;
  cocoCola.velocityY = (5+(score/50));
  cocoCola.lifetime = 150;
  cocoColaG.add(cocoCola);
  }
}