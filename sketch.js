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

function drawHandDDA(x, y, angle, length, color) {
  let endX = x + cos(angle) * length;
  let endY = y + sin(angle) * length;

  let dx = endX - x;
  let dy = endY - y;
  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  let Xincrement = dx / steps;
  let Yincrement = dy / steps;

  stroke(color);
  strokeWeight(2);
  let X = x;
  let Y = y;
  for (let i = 0; i <= steps; i++) {
    point(X, Y);
    X += Xincrement;
    Y += Yincrement;
  }
}

function drawHandBresenham(x, y, angle, length, color) {
  let endX = x + cos(angle) * length;
  let endY = y + sin(angle) * length;

  let dx = abs(endX - x);
  let dy = abs(endY - y);
  let p = 2 * dy - dx;
  let twoDy = 2 * dy;
  let twoDyMinusDx = 2 * (dy - dx);

  let X, Y, XEnd;
  if (x > endX) {
    X = endX;
    Y = endY;
    XEnd = x;
  } else {
    X = x;
    Y = y;
    XEnd = endX;
  }

  stroke(color);
  strokeWeight(2);
  point(X, Y);
  while (X < XEnd) {
    X++;
    if (p < 0) {
      p += twoDy;
    } else {
      Y++;
      p += twoDyMinusDx;
    }
    point(X, Y);
  }
}

function updateClocks() {
    let inputString = inputTime.value();
    let inputComponents = inputString.split(":");
    let newHour = int(inputComponents[0]);
    let newMinute = int(inputComponents[1]);
  
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let hourDifference = newHour - currentHour;
    let minuteDifference = newMinute - currentMinute;
  
    hourOffset = hourDifference;
    minuteOffset = minuteDifference;
  }
  
  function updateClocks() {
    let inputString = inputTime.value();
    let inputComponents = inputString.split(":");
    let newHour = int(inputComponents[0]);
    let newMinute = int(inputComponents[1]);
  
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let hourDifference = newHour - currentHour;
    let minuteDifference = newMinute - currentMinute;
  
    hourOffset = hourDifference;
    minuteOffset = minuteDifference;
  }