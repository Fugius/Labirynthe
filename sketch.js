var WIDTH = 1200, HEIGHT = 500;
var SIZE = 20;
var grid;

var inputs, buttons;
var texte_ = "";
var created_ = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  input = createInput();
  input.position(WIDTH/2 - input.width/2, 550);

  button = createButton('Set');
  button.position(input.x + input.width, 553);
  button.mousePressed(createLabirynth);

  texte_ = createElement('h3', 'Cells size (in pixels, >10 recommanded)');
  texte_.position(input.x , 543 - input.height);

  textAlign(CENTER);
  textSize(18);
}

function createLabirynth() {
  created_ = true;
  size_ = input.value();
  input.value('');
  SIZE = size_;
  grid = new board(WIDTH, HEIGHT, SIZE);
  grid.genMaze();
}

function draw() {
  if (created_)
    grid.draw();
}
