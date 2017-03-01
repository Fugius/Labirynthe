var WIDTH = 1200, HEIGHT = 600;
var SIZE = 10;
var grid;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = new board(WIDTH, HEIGHT, SIZE);

  grid.genMaze();
}

function draw() {
  grid.draw();
}
