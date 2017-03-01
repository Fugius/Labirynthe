var WIDTH = 1200, HEIGHT = 500;
var SIZE = 20;
var grid;

var inputs, buttons;
var texte_ = "";
var created_ = false;

var grid;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  texte_ = createElement('h3', 'Cells size (in pixels, >10 recommanded)');
  texte_.position(0, 543);

  //textAlign(CENTER);
  textSize(18);

  input = createInput();
  input.position(texte_.size().width + 10, (texte_.size().height/2) + 553);

  button = createButton('Set');
  button.position(input.x + input.width, (texte_.size().height/2) + 553);
  button.mousePressed(createLabirynth);

}

function createLabirynth() {
  created_ = true;
  size_ = input.value();
  input.value('');
  SIZE = size_;
  delete(window.grid);
  grid = new board(WIDTH, HEIGHT, SIZE);
  grid.genMaze();
}

function draw() {
  if (created_) {
    grid.update();
    grid.draw();
  }
}
