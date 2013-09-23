var READER = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var hanoi = {
  1: [3,2,1],
  2: [],
  3: []
};


var checkValid = function(start, end) {

  if (typeof hanoi[start] === 'undefined' || typeof hanoi[end] === 'undefined') {
    return false;
  } else if (hanoi[start].length === 0) {
    return false;
  } else if (hanoi[start][start.length - 1] > hanoi[end][end.length - 1]) {
   return false;
  } else {
    return true;
  }
};

var checkVictory = function() {
  return (hanoi[1].length === 0 && hanoi[2].length === 0);
}

var makeMove = function(start, end, victoryCallback) {
  hanoi[end].push(hanoi[start].pop());

  if(checkVictory()) {
    console.log(hanoi);
    victoryCallback();
  } else {
    getMove(victoryCallback);
  }
}

var getMove = function (victoryCallback) {
  console.log(hanoi);

  READER.question("Two pole numbers separated by ',':", function(input){
    var poles = input.split(',');
    if (checkValid(poles[0], poles[1])) {
      makeMove(poles[0], poles[1], victoryCallback);
    } else {
      console.log("invalid move");
      getMove(victoryCallback);
    }
  })
};

getMove(function () {
  console.log("Congratulations! You win!");
  READER.close();
});