var c = document.getElementById("myArkanoid");
var ctx = c.getContext("2d");

var radius = 10;
var puntoX = c.width / 2;
var puntoY = c.height - 10;

var dx = 10;
var dy = -10;

var paddlex = c.width / 2;
var paddley = c.height - 10;
var paddleW = 150;
var paddleH = 12;

var rightMove = false;
var leftMove = false;

var brickRows = 3;
var brickColumns = 5;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 12;
var brickOfSetTop = 30;
var brickOfSetLeft = 100;

var bricks = [];
for (let i = 0; i < brickColumns; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRows; j++) {
    bricks[i][j] = { x: 0, y: 0, drawBrick: true };
  }
}

var score = 0;
var lives = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftMove = true;
  } else if (e.keyCode == 39) {
    rightMove = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftMove = false;
  } else if (e.keyCode == 39) {
    rightMove = false;
  }
}

function mouseMoveHandler(e) {
  var mouseRelativeX = e.clientX - c.offsetLeft;
  if (mouseRelativeX > 0 && mouseRelativeX < c.width) {
    paddlex = mouseRelativeX - paddleW / 2;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(puntoX, puntoY, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0066cc";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddlex, paddley, paddleW, paddleH);
  ctx.fillStyle = "#376c9c";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let i = 0; i < brickColumns; i++) {
    for (let j = 0; j < brickRows; j++) {
      if (bricks[i][j].drawBrick) {
        var bx = i * (brickWidth + brickPadding) + brickOfSetLeft;
        var by = j * (brickHeight + brickPadding) + brickOfSetTop;
        bricks[i][j].x = bx;
        bricks[i][j].y = by;
        ctx.beginPath();
        ctx.rect(bx, by, brickWidth, brickHeight);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function detectHits() {
  for (let i = 0; i < brickColumns; i++) {
    for (let j = 0; j < brickRows; j++) {
      var brick = bricks[i][j];
      if (brick.drawBrick) {
        if (
          puntoX > brick.x &&
          puntoX < brick.x + brickWidth &&
          puntoY > brick.y &&
          puntoY < brick.y + brickHeight
        ) {
          dy = -dy;
          brick.drawBrick = false;
          score++;
          if (score == brickColumns * brickRows) {
            alert("¡Eres el mejor!");
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillStyle = "#00cc33";
  ctx.fillText("Score: " + score, 10, 20);
}

function drawLives() {
  ctx.font = "13px Arial";
  ctx.fillStyle = "#0033cc";
  ctx.fillText("Lives: " + lives, c.width - 100, 20);
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawPaddle();
  drawBall();
  drawBricks();
  detectHits();
  drawScore();
  drawLives();

  if (puntoX + dx > c.width - radius || puntoX + dx < radius) {
    dx = -dx;
  }

  if (puntoY + dy < radius) {
    dy = -dy;
  } else if (puntoY + dy > c.height - radius) {
    if (puntoX > paddlex && puntoX < paddlex + paddleW) {
      dy = -dy;
    } else {
      lives--;
      if (lives < 1) {
        gameOver();
        return;
      } else {
        puntoX = c.width / 2;
        puntoY = c.height - 10;
        dx = 10;           //cambio este apra cambiopermanante de velocidad
        dy = -10;
        paddlex = c.width / 2;
      }
    }
  }

  if (leftMove && paddlex > 0) {
    paddlex -= 8;
  }
  if (rightMove && paddlex < c.width - paddleW) {
    paddlex += 8;
  }

  puntoX += dx;
  puntoY += dy;

  requestAnimationFrame(draw);
}

function gameOver() {
  document.getElementById("myArkanoidGameOver").style.display = "block";
}

draw();
//prueba
//prueba 2