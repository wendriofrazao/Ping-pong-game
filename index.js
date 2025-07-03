// player number 01
class Player01 {
  constructor(ctx) {
    this.ctx = ctx;
    this.px = 0;
    this.py = 0;
    this.width = 20;
    this.height = 150;
    this.speed = 100;
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
    let keys = {};
    window.addEventListener("keydown", (event) => {
      keys[event.key] = true;
      if (keys["w"]) {
        this.py -= this.speed / 2;
        if (this.py < 0) this.py = 0;
      }
      if (keys["a"]) {
        this.px -= this.speed / 2;
        if (this.px < 0) this.px = 0;
      }
      if (keys["d"]) {
        this.px += this.speed / 2;
        if (this.px > 400) this.px = 400;
      }
      if (keys["s"]) {
        this.py += this.speed / 2;
        if (this.py > 700 - this.height) this.py = 700 - this.height;
      }

      this.onMove();
    });

    window.document.addEventListener("keyup", (event) => {
      keys[event.key] = false;
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
    this.speed = 100;
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
    let keys = {};
    window.addEventListener("keydown", (event) => {
      keys[event.key] = true;

      if (keys["8"]) {
        this.py -= this.speed / 2;
        if (this.py < 0) this.py = 0;
      }
      if (keys["4"]) {
        this.px -= this.speed / 2;
        if (this.px < 600) this.px = 600;
      }
      if (keys["6"]) {
        this.px += this.speed / 2;
        if (this.px > 1000 - this.width) this.px = 1000 - 20;
      }
      if (keys["5"]) {
        this.py += this.speed / 2;
        if (this.py > 700 - this.height) this.py = 700 - this.height;
      }
      this.onMove();
    });

    window.document.addEventListener("keyup", (event) => {
      keys[event.key] = false;
    });
  }
}

class ballGame {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 50;
    this.radius = 25;
    this.speed = 3;
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
    const audio = document.createElement("audio");

    this.x += this.dirx * this.speed;
    this.y += this.diry * this.speed;

    if (
      this.y + this.radius >= this.ctx.canvas.height ||
      this.y - this.radius <= 0
    ) {
      this.diry *= -1;
      audio.src = "../audio/parede.mp3";
      audio.play();
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
      audio.src = "../audio/rebote.mp3";
      audio.play();
    }
  }
  move2(player) {
    const audio = document.createElement("audio");

    this.x += this.dirx * this.speed;
    this.y += this.diry * this.speed;

    if (
      this.y + this.radius >= this.ctx.canvas.height ||
      this.y - this.radius <= 0
    ) {
      this.diry *= -1;
      audio.src = "../audio/parede.mp3";
      audio.play();
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
      audio.src = "../audio/rebote.mp3";
      audio.play();
    }
  }
  resetPosition() {
    if (
      this.x + this.radius >= this.ctx.canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dirx *= -1;
    }
  }
}

class score {
  constructor(ctx) {
    this.ctx = ctx;
    this.countPlr1 = 0;
    this.countPlr2 = 0;
    this.width = canvas.width / 2;
    this.height = canvas.height / 20;
    this._canCount = true;
  }
  showScore() {
    this.ctx.font = "35px Arial";
    this.ctx.fillStyle = "#B33F00";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(`${this.countPlr1}`, this.width - 30, this.height);
    this.ctx.fillText("-", this.width, this.height - 2);
    this.ctx.fillText(`${this.countPlr2}`, this.width + 30, this.height);
  }
  countPoints(bola) {
    const audioPoint = document.createElement("audio");
    const point = 1;

    // ponto do jogador 2
    if (bola.x - bola.radius <= 0) {
      this.countPlr2 += point;
      bola.resetPosition();
      audioPoint.src = "../audio/pontos.mp3";
      audioPoint.play();
    }

    // ponto do jogador 1
    if (bola.x + bola.radius >= this.ctx.canvas.width) {
      this.countPlr1 += point;
      bola.resetPosition();
      audioPoint.src = "../audio/pontos.mp3";
      audioPoint.play();
    }
  }
}

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.jogador01 = new Player01(ctx);
    this.jogador02 = new Player02(ctx);
    this.placar = new score(ctx);
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
    this.placar.showScore();
    this.bola.createBall();
  }

  loop() {
    this.bola.move(this.jogador01);
    this.bola.move2(this.jogador02);
    this.placar.countPoints(this.bola);
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}
