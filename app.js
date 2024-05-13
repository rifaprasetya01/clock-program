import Clock from './classes/Clock.js';
import Background from './classes/Background.js';

function main() {
  const clock = new Clock();
  clock.run();

  const background = new Background();
  background.animate(0);
}

window.onload = () => {
  main();
};
