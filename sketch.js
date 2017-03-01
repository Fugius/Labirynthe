var WIDTH = 800, HEIGHT = 400;
var SIZE = 50;
var grid;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = new board(WIDTH, HEIGHT, SIZE);

  grid.genMaze();
}

function draw() {
  grid.draw();
}
