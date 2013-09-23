var READER = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function Player(token) {
  this.token = token
}

function TicTacToe(board) {
  this.board = (function(board){
    if(typeof board === "undefined") {
      return [
              ["*", "*", "*"],
              ["*", "*", "*"],
              ["*", "*", "*"]
              ];
    } else {
      return board;
    }
  })(board);
}

TicTacToe.prototype.render = function() {
  boardStr = "";
  for( var y = 0; y < 3; y++ ) {
    for( var x = 0; x < 3; x++ ) {
      boardStr += this.board[x][y] + " ";
    }
    boardStr += "\n";
  }
  console.log(boardStr);
}

TicTacToe.prototype.validMove = function(move) {
  var coords = move.split(',');

  var x = parseInt(coords[0]), y = parseInt(coords[1]);
  if (typeof this.board[x] === "undefined" || typeof this.board[x][y] === "undefined") {
    return false;
  } else if (this.board[x][y] !== "*") {
    return false;
  } else {
    return true;
  }
}

TicTacToe.prototype.playTurn = function(player) {
  this.render();
  var that = this;

  READER.question("Player " + player.token + " turn:", function(move) {

    if(that.validMove(move)) {
      var coords = move.split(',');

      that.board[coords[0]][coords[1]] = player.token;

      if(that.checkDraw()) {
        that.endGame();
      } else if(that.checkVictory(player.token)) {
        that.endGame(player.token);
      } else {
        if(player.token === "X") {
           that.playTurn(that.players[1]);
        } else {
          that.playTurn(that.players[0]);
        }
      }

    } else {
      console.log("invalid move");
      that.playTurn(player);
    }
  });
}

TicTacToe.prototype.checkVictory = function(token) {
  var victory = false;
  var horizontal = [[],[],[]];
  var vertical = this.board;
  var diagonal = [[this.board[0][0], this.board[1][1], this.board[2][2]],
                  [this.board[2][0], this.board[1][1], this.board[0][2]]
                  ];

  for( var i = 0; i < 3; i++ ) {
    for ( var j = 0; j < 3; j++ ) {
      horizontal[i][j] = this.board[j][i];
    }
  }

  [vertical, horizontal, diagonal].forEach(function(set) {
    set.forEach(function(line) {
      if(!victory) {
        victory = line.every(function(space) {
          return space === token;
        });
      }
    });
  });

  return victory;
}

TicTacToe.prototype.checkDraw = function() {
  return this.board.every(function(column){
    return column.every(function(space){
      return space !== "*";
    });
  });
}


TicTacToe.prototype.startGame = function() {
  this.players = [new Player("X"), new Player("O")];
  this.playTurn(this.players[0]);
}

TicTacToe.prototype.endGame = function(token) {
  this.render();
  READER.close();
  if (typeof token === 'undefined') {
    console.log("Draw.");
  } else {
    console.log(token + " play wins!");
  }
}

var ttt = new TicTacToe();
ttt.startGame()