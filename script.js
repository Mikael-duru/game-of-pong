const gameBoard = document.querySelector("#gameBoard");
const gameContext = gameBoard.getContext("2d");
const scoreBoard = document.querySelector("#gameScore");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

// Utility  styling 
const boardBgColor = "forestgreen";
const paddle1Color = "#801313";
const paddle2Color = "#f57f17";
const paddleBorder = "#000";
const ballColor = "#fff";
const ballBorderColor = "#fff";
const ballRadius = 12.5;
const paddleSpeed = 50;

// Utility variables
let intervalId;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0
}
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100
}

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
  updateBall();
  nextTick();
};

function nextTick(){
  intervalId = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX,ballY);
    checkCollision();
    nextTick();
  }, 10)
};

function clearBoard(){
  gameContext.fillStyle = boardBgColor;
  gameContext.fillRect(0, 0, gameWidth, gameHeight);
};

function drawPaddles(){
  gameContext.strokeStyle = paddleBorder;

  gameContext.fillStyle = paddle1Color;
  gameContext.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  gameContext.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  gameContext.fillStyle = paddle2Color;
  gameContext.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  gameContext.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

function updateBall(){
  ballSpeed = 1;
  if(Math.round(Math.random()) === 1){
    ballXDirection = 1;
  }
  else {
    ballXDirection = -1;
  }
  if(Math.round(Math.random()) === 1){
    ballYDirection = 1;
  }
  else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX,ballY);
};

function moveBall(){
  ballX += (ballSpeed * ballXDirection);
  ballY += (ballSpeed * ballYDirection);
};

function drawBall(ballX,ballY){
  gameContext.fillStyle = ballColor;
  gameContext.strokeStyle = ballBorderColor;
  gameContext.lineWidth = 2;
  gameContext.beginPath();
  gameContext.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  gameContext.stroke();
  gameContext.fill();
};

function checkCollision(){
  if(ballY <= 0 + ballRadius){
    ballYDirection *= -1
  }
  if(ballY >= gameHeight - ballRadius){
    ballYDirection *= -1
  }
  if(ballX <= 0){
    player2Score++;
    updateScore();
    updateBall();
    return;
  }
  if(ballX >= gameWidth){
    player1Score++;
    updateScore();
    updateBall();
    return;
  }
  if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
    if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
      ballX = (paddle1.x + paddle1.width) + ballRadius; //if ball gets stuck
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
  if(ballX >= (paddle2.x - ballRadius)){
    if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
      ballSpeed += 1;
    }
  }
};

function changeDirection(e){
  const keyPressed = e.keyCode;

  // (up) w = 87; (down) s = 83; arrow-up = 38; arrow-down = 40.
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch(keyPressed){
    case(paddle1Up):
      if(paddle1.y > 0){
        paddle1.y -= paddleSpeed;
      }
      break;
    case(paddle1Down):
      if(paddle1.y < gameHeight - 100){
        paddle1.y += paddleSpeed;
      };
      break;
    case(paddle2Up):
      if(paddle2.y > 0){
        paddle2.y -= paddleSpeed;
      }
      break;
    case(paddle2Down):
      if(paddle2.y < gameHeight - 100){
        paddle2.y += paddleSpeed;
      };
      break;
  }

};

function updateScore(){
  scoreBoard.textContent = `${player1Score} : ${player2Score}`
};

function resetGame(){
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
  }
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
  }
  ballXDirection = 0;
  ballYDirection = 0;
  ballSpeed = 1;
  ballX = 0;
  ballY = 0;
  player1Score = 0;
  player2Score = 0;
  updateScore();
  clearInterval(intervalId);
  gameStart();
};