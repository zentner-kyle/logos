const BLANK = 0;
const GOLD = 1;
const RED = 2;
const BLACK = 3;
const UNKNOWN = -1;

function add(x, y) {
  if (x < 0 || y < 0) {
    throw new Error("Adding with a negative.");
  }
  return (x + y) & 0x3;
}

function sub(x, y) {
  if (x < 0 || y < 0) {
    throw new Error("Subtracting with a negative.");
  }
  return (x - y) & 0x3;
}

function randomColor() {
  if (Math.random() > 0.5) {
    return BLANK;
  } else {
    return randRange(BLANK, BLACK + 1);
  }
}

function nameOfColor(color) {
  if (color == BLANK) {
    return "blank";
  } else if (color == GOLD) {
    return "gold";
  } else if (color == RED) {
    return "red";
  } else if (color == BLACK) {
    return "black";
  } else if (color == UNKNOWN) {
    return "magenta";
  }
}

function divWithClasses(classes) {
  let elt = document.createElement("div");
  for (cls of classes) {
    elt.classList.add(cls);
  }
  return elt;
}

function show(square) {
  let squares = divWithClasses(["squares"]);
  for (row of square) {
    for (color of row) {
      squares.appendChild(divWithClasses([nameOfColor(color), "square"]));
    }
  }
  document.body.append(squares);
  document.body.append(JSON.stringify(square));
}

function randRange(min, max) {
  return min + Math.random() * (max - min) | 0;
}

function generateSquare() {
  let square_size = 8;
  let square = [
    [GOLD    , GOLD    , GOLD    , RED , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [GOLD    , GOLD    , GOLD    , BLACK , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [GOLD    , GOLD    , GOLD    , BLANK , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [BLACK , BLANK , RED , BLANK , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
    [UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN , UNKNOWN] ,
  ];
  let fixed = [
    [true  , true  , true  , true , false , false , false , false] ,
    [true  , true  , true  , true , false , false , false , false] ,
    [true  , true  , true  , true , false , false , false , false] ,
    [true , true , true , true , false , false , false , false] ,
    [false , false , false , false , false , false , false , false] ,
    [false , false , false , false , false , false , false , false] ,
    [false , false , false , false , false , false , false , false] ,
    [false , false , false , false , false , false , false , false] ,
  ];
  let threeGold = add(add(GOLD, GOLD), GOLD);
  let rowTotals = [threeGold, threeGold, threeGold, 0, 0, 0, 0, 0];
  let columnTotals = [threeGold, threeGold, threeGold, 0, 0, 0, 0, 0];
  let done = false;
  let iterations = 0;
  while (!done && iterations < 100000) {
    ++iterations;
    for (i in square) {
      let row = square[i];
      for (j in row) {
        if (row[j] == UNKNOWN) {
          row[j] = randomColor();
          rowTotals[i] = add(rowTotals[i], row[j]);
          columnTotals[j] = add(columnTotals[j], row[j]);
        }
      }
    }
    done = true;
    for (let i = 0; i < square_size; i++) {
      if (rowTotals[i] != rowTotals[0]) {
        let j = randRange(0, square_size);
        while (fixed[i][j]) {
          j = randRange(0, square_size);
        }
        rowTotals[i] = sub(rowTotals[i], square[i][j]);
        columnTotals[j] = sub(columnTotals[j], square[i][j]);
        square[i][j] = UNKNOWN;
        done = false;
        break;
      }
      if (columnTotals[i] != columnTotals[0]) {
        let j = randRange(0, square_size);
        while (fixed[i][j]) {
          j = randRange(0, square_size);
        }
        rowTotals[j] = sub(rowTotals[j], square[j][i]);
        columnTotals[i] = sub(columnTotals[i], square[j][i]);
        square[j][i] = UNKNOWN;
        done = false;
        break;
      }
    }
  }
  return square;
}

window.addEventListener("load", function() {
  //for (let i = 0; i < 100; i++) {
    //show(generateSquare());
  //}
});
