let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let box = 32;
let move;
let score =0;
let sound = true;

let ground = new Image;
ground.src = "./Images/ground.jpg";

let food = new Image;
food.src = "./Images/food.png";

let gameover = new Image;
gameover.src = "./Images/gameover.png";

let dead = new Audio();
dead.src = "./audio/dead.mp3";

let up = new Audio();
up.src = "./audio/up.mp3";

let down = new Audio();
down.src = "./audio/down.mp3";

let right = new Audio();
right.src = "./audio/right.mp3";

let left = new Audio();
left.src = "./audio/left.mp3";

let eat = new Audio();
eat.src = "./audio/eat.mp3";

let snake = [];
snake[0]={
    x:4*32,
    y:7*32
}

let foody ={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box
}

document.addEventListener("keydown",function(event){
    if(event.keyCode==37 && move!="right"){
        if(sound){
            left.play();
        }
        move = "left";
    }else if(event.keyCode==38 && move!="down"){
        if(sound){
            up.play();
        }
        
        move = "top";
    }else if(event.keyCode==39 && move!="left"){
        if(sound){
            right.play();
        }
        
        move = "right";
    }
    else if(event.keyCode==40 && move!="top"){
        if(sound){
            down.play();
        }
        
        move = "down";
    }
    
});

function draw(){
    for(let i =0;i<snake.length;i++){
        ctx.fillStyle= (i==0)? "black":"yellow";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    if(move=="left"){
        snakeX -= box;
    }else if(move=="top"){
        snakeY -= box;
    }else if(move=="right"){
        snakeX += box;
    }else if(move=="down"){
        snakeY += box;
    }

    let newHead ={
        x:snakeX,
        y:snakeY
    }
    if(snakeX==foody.x && snakeY==foody.y){
        score++;
        eat.play();
        foody.x = Math.floor(Math.random()*17+1)*box;
        foody.y = Math.floor(Math.random()*15+3)*box;
    }else{
        snake.pop();
    }

    function collision(head,array){
        for(let i = 0; i<array.length;i++){
            if(newHead.x==array[i].x && newHead.y==array[i].y){
                return true;
            }
        }
        return false;
    }

    function dragon(){
        let dragon1 = document.getElementById("dragon1");
        let dragon2 = document.getElementById("dragon2");
        dragon1.style.display="block";
        dragon2.style.display="block";
    }

    if(snakeX<box || snakeX>box*17 || snakeY<box*3 || snakeY>box*17 || collision(newHead,snake)){
        dragon();
        dead.play();
        clearInterval(game);
        sound = false;
        ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200);
    }
    snake.unshift(newHead);
    ctx.fillStyle = "#fff";
    ctx.font = "40px impact";
    ctx.fillText(score,box*2.2,box*1.6)
    ctx.drawImage(food,0,0,32,32,foody.x,foody.y,32,32);
    

}

function loop(){
    ctx.drawImage(ground,0,0,608,608,0,0,608,608);
    draw();

}

let game = setInterval(loop,100);