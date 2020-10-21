var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var back, backIm;
var invi;
var banG;
var ObG;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monstop;
var survivalTime=0;
var sound;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  backIm = loadImage("ground.jfif");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monstop=loadImage("sprite_0.png");
  sound=loadSound('460509__florianreichelt__hitting-in-a-face.mp3');
}



function setup() {
  createCanvas(600, 450);
  banG = new Group();
  obG = new Group();
 
  invi = createSprite(200, 450, 800, 200);
  invi.shapeColor = color("green");
  invi.velocityX=-15;
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;


}


function draw() {
  background("lightblue");
  if(invi.x<200){
   invi.x=invi.width/2; 
  }
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
    
  
  if(gamestate===PLAY){
    if (banG.isTouching(monkey)) {
      
    banG.destroyEach();
    score=score+1;
      
  }
 stroke("black");
  textSize(20);
  fill("black");
 survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,100,50);
  if(monkey.isTouching(obG)){
    gamestate=END;
    sound.play();
     
  }
  
  
  monkey.collide(invi)
  }
   
  if (keyDown("space")&&monkey.y>230&&gamestate===PLAY){
    monkey.velocityY = -12
  }
   
  if(keyDown("r")&&gamestate===END){
    gamestate=PLAY;
    score=0;
    survivalTime=0;
     
 
  }
    if(gamestate===END){  
      monkey.collide(invi)
      banG.destroyEach();
     obG.destroyEach();
        obstacle.SetVelocityX = 0;
  banana.SetVelocityX = 0;
  monkey.setVelocityX=0;
  obG.destroyEach();
  banG.destroyEach();
  monkey.addImage("mons",monstop);
  stroke("black");
  textSize(25);
   fill("yellow");
  text("You lost. Press R to restart",200,225);

   monkey.velocityY = monkey.velocityY + 0;
  
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  ban();
  ob();
  drawSprites()

}
function ban() {
  if (frameCount % 100 === 0&&gamestate===PLAY) {
    banana = createSprite(600, 120, 40, 10);
    banana.scale = 0.1;
    banana.velocityX = -(10+3*(score/10));
    banana.lifetime = 200;
    banana.y = Math.round(random(120, 200));
    banana.addImage("banIM", bananaImage);
    banG.add(banana);
  }
}

function ob() {
  if (frameCount % 200 === 0&&gamestate===PLAY) {
    obstacle = createSprite(600, 120, 40, 10);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(10+3*(score/10));     
    obstacle.lifetime=200;
    obstacle.y = Math.round(random(80,300));
    obstacle.x=Math.round(random(0,600));
    obstacle.addImage("ob", obstacleImage);
    obG.add(obstacle);
  }
  }