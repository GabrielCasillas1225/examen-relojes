/*
Integrantes:
Jonathan Posada Dominguez
Luis Gabriel Casillas Moreno
Graficacion y Multimedia Examen Unidad 2
IDS 8 T.M.
*/
let timeZoneDifferences = [0, +1, +9];
let hourOffset = 0;
let minuteOffset = 0;
let inputTime;
let inputButton;

function setup() {
  createCanvas(600, 250);
  angleMode(DEGREES);

  inputTime = createInput("", "text");
  inputTime.position(20, height + 20);

  inputButton = createButton('Actualizar');
  inputButton.position(inputTime.x + inputTime.width + 10, height + 20);
  inputButton.mousePressed(updateClocks);
  inputTime.changed(updateClocks);
}

function draw() {
  background(255);
  let now = new Date();
  now.setHours(now.getHours() + hourOffset);
  now.setMinutes(now.getMinutes() + minuteOffset);

  drawClock(100, 100, now.getHours(), now.getMinutes(), now.getSeconds(), 0, "La Paz");
  drawClock(300, 100, (now.getHours() + timeZoneDifferences[1]) % 24, (now.getMinutes() + timeZoneDifferences[1] * 60) % 60, now.getSeconds(), 1, "CDMX");
  drawClock(500, 100, (now.getHours() + timeZoneDifferences[2]) % 24, (now.getMinutes() + timeZoneDifferences[2] * 60) % 60, now.getSeconds(), 2, "Barcelona");
}

function drawClock(x, y, h, m, s, type, city) {
  stroke(0);
  noFill();
  ellipse(x, y, 80, 80);

  textSize(14);
  textAlign(CENTER, CENTER);
  fill(0);
  text(city, x, y - 50);

  if (type === 0) {
    drawHandPuntoPendiente(x, y, map(s, 0, 60, 0, 360) - 90, 30, color(255, 0, 0));
    drawHandPuntoPendiente(x, y, map(m, 0, 60, 0, 360) - 90 + map(s, 0, 60, 0, 360) / 60, 25, color(0, 255, 0));
    drawHandPuntoPendiente(x, y, map(h % 12, 0, 12, 0, 360) - 90 + map(m, 0, 60, 0, 360) / 12, 20, color(0, 0, 255));
  } else if (type === 1) {
    drawHandDDA(x, y, map(s, 0, 60, 0, 360) - 90, 30, color(255, 0, 0));
    drawHandDDA(x, y, map(m, 0, 60, 0, 360) - 90 + map(s, 0, 60, 0, 360) / 60, 25, color(0, 255, 0));
    drawHandDDA(x, y, map(h % 12, 0, 12, 0, 360) - 90 + map(m, 0, 60, 0, 360) / 12, 20, color(0, 0, 255));
  } else {
    drawHandPuntoPendiente(x, y, map(s, 0, 60, 0, 360) - 90, 30, color(255, 0, 0)); // Segundos
    drawHandPuntoPendiente(x, y, map(m, 0, 60, 0, 360) - 90 + map(s, 0, 60, 0, 360) / 60, 25, color(0, 255, 0)); // Minutos
    drawHandPuntoPendiente(x, y, map(h % 12, 0, 12, 0, 360) - 90 + map(m, 0, 60, 0, 360) / 12, 20, color(0, 0, 255)); // Horas
  }
}

function drawHandPuntoPendiente(x, y, angle, length, color) {
  let endX = x + cos(angle) * length;
  let endY = y + sin(angle) * length;

  stroke(color);
  strokeWeight(2);
  line(x, y, endX, endY);
}