
function cell(x_, y_, size_, wall_) {
  this.x = x_;
  this.y = y_;
  this.s = size_;
  this.c = color(55);
  this.actual = false;

  this.wall = wall_;

}

cell.prototype.update = function() {
  if (this.wall) {
    this.c = color(55);
  } else {
    this.c = color(90);
  }

  if (this.actual == true)
    this.c = color(0, 255, 0);
}

cell.prototype.draw = function () {
  noStroke()
  fill(this.c);
  rect(this.x, this.y, this.s, this.s);
}
