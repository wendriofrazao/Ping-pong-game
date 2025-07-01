// player number 01
class Player01 {
  constructor(ctx) {
    this.ctx = ctx;
    this.px = 0;
    this.py = 0;
    this.width = 20;
    this.height = 150;
    this.speed = 30;
    this.onMove = () => {};
  }

  setOnMove(callback) {
    this.onMove = callback;
    this.playerMoveGame();
  }

  generation() {
    this.ctx.fillStyle = "#3B5998";
    this.ctx.fillRect(this.px, this.py, this.width, this.height);
  }

  playerMoveGame() {
    window.addEventListener("keypress", (event) => {
      switch (event.key) {
        case "w":
          this.py -= this.speed;
          if (this.py < 0) this.py = 0;
          break;
        case "a":
          this.px -= this.speed;
          if (this.px < 0) this.px = 0;
          break;
        case "d":
          this.px += this.speed;
          if (this.px > 400) this.px = 400;
          break;
        case "s":
          this.py += this.speed;
          if (this.py > 700 - this.height) this.py = 700 - this.height;
          break;
        default:
          return;
      }

      this.onMove();
    });
  }
}

// player number 02
class Player02 {
  constructor(ctx) {
    this.ctx = ctx;
    this.px = 980;
    this.py = 700 - 150;
    this.width = 20;
    this.height = 150;
    this.speed = 30;
    this.onMove = () => {};
  }

  setOnMove(callback) {
    this.onMove = callback;
    this.playerMoveGame();
  }

  generation() {
    this.ctx.fillStyle = "#A61B1B";
    this.ctx.fillRect(this.px, this.py, this.width, this.height);
  }

  playerMoveGame() {
    window.addEventListener("keypress", (event) => {
      switch (event.key) {
        case "8":
          this.py -= this.speed;
          if (this.py < 0) this.py = 0;
          break;
        case "4":
          this.px -= this.speed;
          if (this.px < 600) this.px = 600;
          break;
        case "6":
          this.px += this.speed;
          if (this.px > 1000 - this.width) this.px = 1000 - 20;
          break;
        case "5":
          this.py += this.speed;
          if (this.py > 700 - this.height) this.py = 700 - this.height;
          break;
        default:
          return;
      }

      this.onMove();
    });
  }
}

class ballGame {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 50;
    this.radius = 25;
    this.speed = 6;
    this.angleStart = 0;
    this.angleEnd = Math.PI * 2;

    // direção/movimento
    this.dirx = 1;
    this.diry = 1;
  }

  createBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.angleStart, this.angleEnd);
    this.ctx.fillStyle = "#262626";
    this.ctx.fill();
    this.ctx.stroke();
  }

  move(player) {
    this.x += this.dirx * this.speed;
    this.y += this.diry * this.speed;

    if (
      this.x + this.radius >= this.ctx.canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dirx *= -1;
    } else if (
      this.y + this.radius >= this.ctx.canvas.height ||
      this.y - this.radius <= 0
    ) {
      this.diry *= -1;
    }

    // Colisão com jogador do lado esquerdo

    if (
      this.x - this.radius <= player.px + player.width &&
      this.x > player.px &&
      this.y >= player.py &&
      this.y <= player.py + player.height
    ) {
      this.dirx *= -1;
      this.x = player.px + player.width + this.radius;
    }
  }
  move2(player) {
    this.x += this.dirx * this.speed;
    this.y += this.diry * this.speed;

    if (
      this.x + this.radius >= this.ctx.canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dirx *= -1;
    }

    if (
      this.y + this.radius >= this.ctx.canvas.height ||
      this.y - this.radius <= 0
    ) {
      this.diry *= -1;
    }

    // Colisão com jogador do lado direito
    if (
      this.x + this.radius >= player.px &&
      this.x < player.px + player.width &&
      this.y >= player.py &&
      this.y <= player.py + player.height
    ) {
      this.dirx *= -1;
      this.x = player.px - this.radius;
    }
  }
}

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.jogador01 = new Player01(ctx);
    this.jogador02 = new Player02(ctx);
    this.bola = new ballGame(ctx);
    this.init();
  }

  init() {
    this.draw();
    this.jogador01.setOnMove(() => this.draw());
    this.jogador02.setOnMove(() => this.draw());
    this.loop();
  }

  draw() {
    this.ctx.clearRect(0, 0, 1000, 700);
    this.jogador01.generation();
    this.jogador02.generation();
    this.bola.createBall();
  }

  loop() {
    this.bola.move(this.jogador01);
    this.bola.move2(this.jogador02);
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}
