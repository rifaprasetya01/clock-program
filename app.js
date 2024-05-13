function main() {
  const clock = new Clock();
  clock.run();

  animate(0);
}

window.onload = () => {
  main();
};

class Clock {
  constructor() {
    this.hours = document.getElementById('hoursPlaceholder');
    this.minutes = document.getElementById('minutesPlaceholder');
    this.seconds = document.getElementById('secondsPlaceholder');
  }

  update() {
    const time = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24',
    });

    const timeArr = time.slice(0, 8).split(':');

    this.hours.innerHTML = timeArr[0];
    this.minutes.innerHTML = timeArr[1];
    this.seconds.innerHTML = timeArr[2];
  }

  run() {
    this.update();
    setInterval(() => this.run(), 1000);
  }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let interval = 500;
let timeToNextParticle = 0;
let lastTime = 0;

const maxParticles = 50;
let particles = [];
class Particle {
  constructor() {
    this.radius = Math.random() * 2 + 5;
    this.x = Math.random() * canvas.width;
    this.y = 0 - this.radius;
    this.speed = Math.random() * 1 + 0.5;
    this.limiterYOffset =
      Math.random() * canvas.height + (canvas.height - canvas.height / 3);
    this.isDelete = false;
    this.opacity = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.speed;

    if (this.limiterYOffset - this.y < 200 || canvas.height - this.y < 200) {
      this.opacity -= 0.01;
    }

    if (this.y >= this.limiterYOffset || this.y > canvas.height) {
      this.isDelete = true;
    }
  }
}

function fillParticles(currLength) {
  for (let i = 0; i <= maxParticles - currLength; i++) {
    particles.push(new Particle());
  }
}

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextParticle += deltaTime;
  if (timeToNextParticle > interval) {
    fillParticles(particles.length);
    timeToNextParticle = 0;
  } else {
    particles = particles.filter((particle) => !particle.isDelete);
  }

  particles.forEach((particle) => particle.draw());
  particles.forEach((particle) => particle.update());

  requestAnimationFrame(animate);
}
