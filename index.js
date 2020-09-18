//600x600 => 30x30

//give a unit of space (square)
let box = 20;
let ymin = 2 * box;
//Load canvas
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext('2d');
//Give relative length of canvas
LEN = {x: cvs.width/box,y: cvs.height/box};
//Creates food location
function newFood(){
    let food = {
        x: Math.floor(Math.random() * LEN.x) * box,
        //y: ymin + Math.floor(Math.random() * (LEN.y - 2)) * box};
        y: 40}
    return food;
}

//Record direction
function getDirection(event){
    if(event.keyCode == 37 && direction != "RIGHT"){
        direction = "LEFT";
    }else if(event.keyCode == 38 && direction != "DOWN"){
        direction = "UP";
    }else if(event.keyCode == 39 && direction != "LEFT"){
        direction = "RIGHT";
    }else if(event.keyCode == 40 && direction != "UP"){
        direction = "DOWN";
    }
}
function collision(newHead, snake){
    for(let i = 0; i < snake.length; i++)
        if(newHead.x == snake[i].x && newHead.y == snake[i].y)
            return true;
    return false;
}

function move(){
    //Positions for the head of the snake
    newX = snake[0].x;
    newY = snake[0].y;
    
    //If snake eats food, increment score and generate new food
    //And leave the tail as snake should grow
    if(newX == food.x && newY == food.y){
        score++;
        food = newFood();
        console.log(food)
    }else 
        snake.pop();

    //Give new positon for head of snake
    if(direction == "LEFT") newX -= box;
    else if(direction == "RIGHT") newX += box;
    else if(direction == "UP") newY -= box;
    else if(direction == "DOWN") newY += box;
    
    //Snake passes the border
    if (newX < 0) newX = (LEN.x-1) * box;
    else if(newX >= LEN.x * box) newX = 0;
    else if(newY < ymin) newY = (LEN.y - 1) * box;
    else if(newY >= LEN.y * box) newY = ymin;
    //Alternative
    //Game stops if snake crosses the border
    //if (newX < 0 || newX >= (LEN.x) * box || newY < 0 || newY >= (LEN.y) * box){
    //    clearInterval(game);
    //}
    newHead = {x: newX, y: newY};
    
        
    if(collision(newHead, snake))
        clearInterval(game);
    snake.unshift(newHead);
}

function draw(){
    
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "white" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        //ctx.strokeStyle = "red";
        //ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "#679b9b";
    ctx.fillRect(0, 0, LEN.x*box, ymin);
    ctx.fillStyle = "white";
    ctx.font = "30px Changa One";
    ctx.fillText("Score: " + score, box, 1.5*box);
    ctx.fillText("Speed: " + speed, 10*box, 1.5*box);
    move();
}
let score = 0;
let direction;
let snake = [];
snake[0] = {x: 10*box, y: 10*box};
speed = 10;

food = newFood();
console.log(food)
document.addEventListener("keydown", getDirection);
document.addEventListener("keydown", event => {
    if (event.keyCode === 61 && speed < 100) {
        console.log("acceleration")
        speed++;
        clearInterval(game)
        game = setInterval(draw, 500/speed);
    }else if(event.keyCode == 173 && speed > 5){
        console.log("decceleration");
        speed--;
        clearInterval(game);
        game = setInterval(draw, 1000/speed);
    }
    
})
game = setInterval(draw, 500/speed);
