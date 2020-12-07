var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
// creating the  monkey 
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running)
monkey.scale = 0.1;

// creating the ground
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
 
// scoreboard
var survivalTime=0;

// creating groups
FoodGroup = createGroup();
obstaclesGroup = createGroup();
}


function draw() {
background("darkgreen")
// making the ground infinite
if (ground.x < 0){
ground.x = ground.width/2;}
// making the monkey jump with the help of space bar
if(keyDown("space"))
monkey.velocityY = -12;
// adding gravity
monkey.velocityY = monkey.velocityY + 0.8
//stop monkry from falling down
monkey.collide(ground);
food ();
 obstacles();
drawSprites();
stroke("white");
textSize(20);
fill("white");
text("Score: "+ score, 500,50);        
  
//  
if(obstaclesGroup.isTouching(monkey)){
   ground.velocityX = 0;
   monkey.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
                                     }
  
stroke("white");
textSize(20);
fill("white");
survivalTime=Math.ceil(frameCount/frameRate()) 
text("Survival Time: "+ survivalTime, 100,50);
}

function food () {
if (frameCount % 80 === 0) {
var banana = createSprite(600,120,40,10);
banana.y = Math.round(random(120,200));
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.velocityX = -3;
//assign lifetime to the bananas
  banana.lifetime = 200;
  //add each banana to the group
   FoodGroup.add(banana);
}
}

function obstacles() {
if(frameCount % 300 === 0) {
   obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -6; 
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.15;
//assgin to the obstacle     
   obstacle.lifetime = 300;
//add each obstacle to the group
   obstaclesGroup.add(obstacle);
  }
}
