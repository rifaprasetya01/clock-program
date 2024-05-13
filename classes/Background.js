import Particle from './Particle.js';

export default class Background {
  static particles = [];

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.interval = 500;
    this.timeToNextParticle = 0;
    this.lastTime = 0;

    this.maxParticles = 50;
  }

  fillParticles = (currLength) => {
    for (let i = 0; i <= this.maxParticles - currLength; i++) {
      Background.particles.push(new Particle(this.canvas, this.ctx));
    }
  };

  animate = (timestamp) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.timeToNextParticle += deltaTime;
    if (this.timeToNextParticle > this.interval) {
      this.fillParticles(Background.particles.length);
      this.timeToNextParticle = 0;
    } else {
      Background.particles = Background.particles.filter(
        (particle) => !particle.isDelete
      );
    }

    Background.particles.forEach((particle) => particle.draw());
    Background.particles.forEach((particle) => particle.update());

    requestAnimationFrame(this.animate);
  };
}
