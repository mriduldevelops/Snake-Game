//  game constants & variables
let InputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 10 }];

food = { x: 3, y: 6 };

// game functions
function main(currTime) {
  window.requestAnimationFrame(main);

  if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = currTime;
  gameEngine();
}

function isCollide(snake) {
    for (let i=1; i<snakeArr.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

    return false;
}

function gameEngine(){
    // updating the sanke array & food
    if (isCollide(snakeArr)){
        gameOverSound.play();
        InputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 10, y: 10 }];
        score = 0;
        scoreBox.innerHTML = 'Score: 0';
    }

    // increment the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        scoreBox.innerHTML = 'Score: ' + score;
        snakeArr.unshift({x: snakeArr[0].x + InputDir.x, y: snakeArr[0].y + InputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }


    // moving the snake
    for(let i  = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;


    // display the sanke
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  InputDir = { x: 0, y: 1 }; //start game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      InputDir.x = 0;
      InputDir.y = -1;
      break;

    case "ArrowDown":
      InputDir.x = 0;
      InputDir.y = 1;
      break;

    case "ArrowLeft":
      InputDir.x = -1;
      InputDir.y = 0;
      break;

    case "ArrowRight":
      InputDir.x = 1;
      InputDir.y = 0;
      break;

    default:
      break;
    }
});

const buttons = document.querySelectorAll('button')
buttons.forEach((button)=>{
  button.addEventListener('click', ()=>{
    moveSound.play();
    if(button.classList.contains('ArrowUp')){
      InputDir.x = 0;
      InputDir.y = -1;
    } else if(button.classList.contains('ArrowRight')){
      InputDir.x = 1;
      InputDir.y = 0;
    }else if(button.classList.contains('ArrowLeft')){
      InputDir.x = -1;
      InputDir.y = 0;
    } else if(button.classList.contains('ArrowDown')){
      InputDir.x = 0;
      InputDir.y = 1;
    }
  })
})