const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;

    const box = 20;
    let snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    let food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };

    let direction;
    let score = 0;

    document.addEventListener('keydown', directionControl);

    function directionControl(event) {
      if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
      } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
      } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
      } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
      }
    }

    function collision(newHead, array) {
      for (let i = 0; i < array.length; i++) {
        if (newHead.x === array[i].x && newHead.y === array[i].y) {
          return true;
        }
      }
      return false;
    }

    let game;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'purple' : 'darkviolet';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = 'gold'; // Changed food color to gold
      ctx.fillRect(food.x, food.y, box, box);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === 'LEFT') snakeX -= box;
      if (direction === 'UP') snakeY -= box;
      if (direction === 'RIGHT') snakeX += box;
      if (direction === 'DOWN') snakeY += box;

      if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
        food = {
          x: Math.floor(Math.random() * 19 + 1) * box,
          y: Math.floor(Math.random() * 19 + 1) * box
        };
      } else {
        snake.pop();
      }

      let newHead = {
        x: snakeX,
        y: snakeY
      };

      if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        document.getElementById('restartButton').style.display = 'block';
      }

      snake.unshift(newHead);
    }

    function restartGame() {
      score = 0;
      document.getElementById('scoreDisplay').innerText = `Score: ${score}`;
      snake = [];
      snake[0] = { x: 9 * box, y: 10 * box };
      food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
      };
      direction = undefined;
      document.getElementById('restartButton').style.display = 'none';
      game = setInterval(draw, 100);
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
    }

    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('restartButton').addEventListener('click', restartGame);

    game = setInterval(draw, 100);
