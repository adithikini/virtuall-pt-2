var dog, happydog
var database
var foodS, foodStock
var happydogimg,dogimg1
var petFOOD
var fedTime,lastFed
var feed,addFood

function preload()
{
	happydogImg=loadImage("images/happydog.png")
  dog1Img=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(900, 900);
  database=firebase.database();
  
  
    foodObj = new Food();
  
    foodStock=database.ref('food');
    foodStock.on("value",readStock);
    
    dog=createSprite(800,200,150,150);
    dog.addImage(dog1Img);
    dog.scale=0.15;
    
    feed=createButton("Feed the dog");
    feed.position(700,105);
    feed.mousePressed(feedDog);
  
    addFood=createButton("addFood");
    addFood.position(800,105);
    addFood.mousePressed(addFoods);
  
  }
    
function draw() { 

background(46,139,87)
if(keyWentDown(UP_ARROW)){
 
  console.log(foodS)
  writeStock(foodS)
  
  dog.addImage(happydogImg)
  }
  
  fedTime = database.ref('fedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();
  })

  textSize(25);
  fill("black");
  text("food remaining:"+ foodS,30,100);
  text("press space to feed the dog!" ,30 , 140 )

if(lastFed>=12){
  text("Last Feed:"+lastFed%12 +"PM",350,30)
}
else if(lastFed===0){
  text("Last Feed:12 AM",350,30)

}
else{
  text("Last Feed:"+lastFed+"AM",350,30)
}

drawSprites();


}
function writeStock(petFOOD){
  if(petFOOD<=0){
      petFOOD=0
  }
  else{
      petFOOD=petFOOD-1;
  }
  //console.log(petFOOD)

  database.ref('/').update({
      food:petFOOD
  })
}


function readStock(data){
  foodS=data.val();
  console.log(foodS)
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happydogImg);

  /*foodObj.updateFoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getfoodStock(),
    FeedTime:hour()
  })*/

  console.log(foodS)
  writeStock(foodS)
  
  dog.addImage(happydogImg)
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
    
  })
}

