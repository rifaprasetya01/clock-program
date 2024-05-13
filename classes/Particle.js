export default class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.radius = Math.random() * 2 + 5;
    this.x = Math.random() * this.canvas.width;
    this.y = 0 - this.radius;
    this.speed = Math.random() * 1 + 0.5;
    this.limiterYOffset =
      Math.random() * this.canvas.height +
      (this.canvas.height - this.canvas.height / 3);
    this.isDelete = false;
    this.opacity = 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.y += this.speed;

    if (
      this.limiterYOffset - this.y < 200 ||
      this.canvas.height - this.y < 200
    ) {
      this.opacity -= 0.01;
    }

    if (this.y >= this.limiterYOffset || this.y > this.canvas.height) {
      this.isDelete = true;
    }
  }
}
