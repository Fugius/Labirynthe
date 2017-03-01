
function board(width_, height_, size_) {
  this.WIDTH = width_;
  this.HEIGHT = height_;
  this.s = size_;
  this.step = 0;
  this.load_indicator = "0 / 0";
  this.texte_ = createElement('p', this.load_indicator);
  this.max_it = 0;

 console.log(Math.round(this.WIDTH / this.s));
  this.cells = new Array(Math.round(this.WIDTH / this.s));

  //generate cells
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i] = new Array(Math.round(this.HEIGHT / this.s));
  }

  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      this.cells[i][j] = new cell(i * this.s, j * this.s, this.s, true);
    }
  }
}

board.prototype.draw = function() {
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      this.cells[i][j].update();
      this.cells[i][j].draw();
    }
  }

  if (this.step < this.max_it) {
    textSize(150);
    this.texte_ = createElement('p', this.load_indicator);
    this.texte_.position(this.WIDTH - 300, this.HEIGHT);
    fill(60);
  } else if (this.text >= this.max_it) {
    this.texte_.remove();
  }
}

board.prototype.update = function() {
  this.genMaze();
}

board.prototype.wallBehaviors = function(Apos) {
  var b_cells = 0;
  if (Apos.x > 0 && Apos.x < Math.round(this.WIDTH / this.s) - 2 && Apos.y > 0 && Apos.y < (this.HEIGHT / this.s) - 2) {
    if (this.cells[Apos.x+1][Apos.y].wall)
      b_cells++;
    if (this.cells[Apos.x-1][Apos.y].wall)
      b_cells++;
    if (this.cells[Apos.x][Apos.y+1].wall)
      b_cells++;
    if (this.cells[Apos.x][Apos.y-1].wall)
      b_cells++;
  }
  return b_cells;
}

board.prototype.genMaze = function() {
  //loading indicator
  this.max_it = Math.round(((this.WIDTH / this.s) * (this.HEIGHT / this.s)) / 3);
  this.load_indicator = this.step + " / " + this.max_it;
  this.texte_.remove();

  var cells_drawable = [0];

  if (this.step == 0) {
    this.createRoute(createVector(1, Math.round(random((HEIGHT / SIZE) - 3) + 1)));
  }

  if (this.step < this.max_it) {
    cells_drawable = [];
    var temp = [];

    //we look for cell drawable
    for (var i = 0; i < this.cells.length; i++) {
      for (var j = 0; j < this.cells[i].length; j++) {
        if (!this.cells[i][j].wall) {
          if (i+1 < this.cells.length) temp.push(this.cells[i+1][j]);
          if (i-1 > 0) temp.push(this.cells[i-1][j]);
          if (i+1 < this.cells[i].length) temp.push(this.cells[i][j+1]);
          if (i-1 > 0) temp.push(this.cells[i][j-1]);

          for (var l = 0; l < temp.length; l++) {

            temp[l] = createVector(Math.round(temp[l].x / this.s), Math.round(temp[l].y / this.s));
            if (this.wallBehaviors(temp[l]) > 2)
              cells_drawable.push(temp[l]);

          }

          temp = [];

        }

      }
    }

    //create one of the possible routes
      if (cells_drawable.length > 0) {
        var chosen = random(cells_drawable);
        this.createRoute(createVector(chosen.x, chosen.y));
      }
      this.step++;
  }
}

board.prototype.createRoute = function(pos) {
  var Apos = createVector(pos.x, pos.y);
  var Lpos = createVector(Apos.x - 1, Apos.y);

  while (true) {

    //actual pos is no more a wal
    this.cells[Apos.x][Apos.y].wall = false;

    //all the possibilities of next wall
    var possibilities = [createVector(Apos.x+1, Apos.y),
                         createVector(Apos.x-1, Apos.y),
                         createVector(Apos.x, Apos.y+1),
                         createVector(Apos.x, Apos.y-1)];

    var goodP = [];

    //find the good possibilities of road (if there is any)
    for (var i = 0; i < 4; i++) {
      if (possibilities[possibilities.length - 1].equals(Lpos) || this.wallBehaviors(possibilities[possibilities.length - 1]) < 3) {
        possibilities.splice(possibilities.length - 1, 1);

      } else if (possibilities[possibilities.length - 1].x > Math.round(this.WIDTH / this.s) - 2 || possibilities[possibilities.length - 1].x < 1) {
        possibilities.splice(possibilities.length - 1, 1);

      } else if (possibilities[possibilities.length - 1].y > Math.round(this.HEIGHT / this.s) - 2 || possibilities[possibilities.length - 1].i < 1) {
        possibilities.splice(possibilities.length - 1, 1);

      } else {
        goodP.push(possibilities[possibilities.length - 1]);
        possibilities.splice(possibilities.length - 1, 1);
      }
    }

    //end the road if there is no possibility, transform the possibility into road if there is only one, pick one if there is more than one
    if (goodP.length == 0)
    {
      //console.log("possibilité = 0");
      break;

    } else if (goodP.length > 1) {
      var res = random(goodP);
      Lpos.x = Apos.x; Lpos.y = Apos.y;
      Apos.x = res.x; Apos.y = res.y;

    } else if (goodP.length == 1) {
      var res = goodP[0];
      Lpos.x = Apos.x; Lpos.y = Apos.y;
      Apos.x = res.x; Apos.y = res.y;

    }

    this.cells[Apos.x][Apos.y].wall = false;

  }
      //to see the last cell
      //this.cells[Apos.x][Apos.y].actual = true;
      this.cells[Apos.x][Apos.y].wall = false;

}
