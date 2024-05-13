export default class Clock {
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
