const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var link,link2,link3;
var engine;
var backgroundImg;
var melonImg;
var buttonMute;
var bunnyImg,bunny,bunnyIdle,bunnyEat,bunnySad;
var airSound,ropeCut,sadSound,sound1,eatingSound;
var balloon;
var world;
var ground;
var button,button2,button3;
var rope,rope2,rope3;
var melon;
function preload(){
  backgroundImg = loadImage("images/background.png");
  melonImg = loadImage("images/melon.png");
  bunnyImg = loadImage("images/rabbit1.png");
  bunnyIdle = loadAnimation("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png","images/rabbit2.png");
  bunnyEat = loadAnimation("images/eat.png","images/eat2.png","images/eat3.png","images/eat4.png");
  bunnySad = loadAnimation("images/sad_1.png","images/sad_2.png","images/sad_3.png");
  bunnyEat.looping = false
  bunnySad.looping = false
  airSound = loadSound("sounds/air.wav");
  ropeCut = loadSound("sounds/rope_cut.mp3");
  sadSound = loadSound("sounds/sad.wav");
  sound1 = loadSound("sounds/sound1.mp3");
  eatingSound = loadSound("sounds/eating_sound.mp3");
}
function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = Bodies.rectangle(250,690,500,20,{isStatic:true})
  World.add(world,ground);
  melon = Bodies.circle(250,300,30,{density:0.0005})
  rope = new Rope(8,{x:250,y:30});
  Composite.add(rope.body,melon);
  link = new Link(rope,melon)
  bunny = createSprite(350,550);
  bunnyIdle.frameDelay = 10
  bunnyEat.frameDelay = 10
  bunnySad.frameDelay = 10
  bunny.addAnimation("idle",bunnyIdle);
  bunny.addAnimation("Eat",bunnyEat);
  bunny.addAnimation("Sad",bunnySad);
  bunny.scale = 0.3

  button = createImg("images/cut_button.png");
  button.size(50,50)
  button.position(230,30)
  button.mouseClicked(drop);
  
  button2 = createImg("images/cut_button.png");
  button2.size(50,50)
  button2.position(10,30)
  button2.mouseClicked(drop2);

  button3 = createImg("images/cut_button.png");
  button3.size(50,50)
  button3.position(100,400)
  button3.mouseClicked(drop3);

  balloon = createImg("images/balloon.png");
  balloon.size(150,100);
  balloon.position(10,300);
  balloon.mouseClicked(airBlow);

  sound1.play()
  sound1.setVolume(0.1)

  buttonMute = createImg("images/mute.png");
  buttonMute.size(50,50);
  buttonMute.position(450,30);
  buttonMute.mouseClicked(mute);

  rope2 = new Rope(6,{x:20,y:30});
  link2 = new Link(rope2,melon);
  
  rope3 = new Rope(4,{x:100,y:400});
  link3 = new Link(rope3,melon);
}

function draw(){
  background(50);
  Engine.update(engine);
  imageMode(CENTER);
  image(backgroundImg,250,350,500,700);
  rope.show()
  if(melon!=null){
    image(melonImg,melon.position.x,melon.position.y,80,80)
  }
  if(melon!=null && melon.position.y>=650){
    bunny.changeAnimation("Sad")
    melon=null
    sadSound.play()
  }
  if(Colide(melon,bunny)==true){
    bunny.changeAnimation("Eat")
    eatingSound.play()
  }
  rope2.show()
  rope3.show()
  drawSprites()
}
function drop(){
  rope.break()
  link.break()
  link=null
  ropeCut.play();
}
function drop2(){
  rope2.break()
  link2.break()
  link2=null
  ropeCut.play();
}
function drop3(){
  rope3.break()
  link3.break()
  link3=null
  ropeCut.play();
}
function Colide( body,sprite){
  if(body!=null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(world,melon)
      melon=null
      return true
    }
    else{
      return false
    }
  }
}
function airBlow(){
  Matter.Body.applyForce(melon,{x:0,y:0},{x:0.05,y:0})
  airSound.play()
}
function mute(){
  if(sound1.isPlaying()){
    sound1.stop()
  }else{
    sound1.play()
  }
  
}
