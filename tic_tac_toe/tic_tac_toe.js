var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var HumanPlayer = require('./human_player.js');
var ComputerPlayer = require('./computer_player.js');

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

  var x = parseInt(move[0]), y = parseInt(move[1]);
  if (typeof this.board[x] === "undefined" || typeof this.board[x][y] === "undefined") {
    return false;
  } else if (this.board[x][y] !== "*") {
    return false;
  } else {
    return true;
  }
}

TicTacToe.prototype.playTurn = function(player, move) {

  if(this.validMove(move)) {

    this.board[move[0]][move[1]] = player.token;

    if(this.checkDraw(this.board)) {
      this.endGame();
    } else if(this.checkVictory(player.token, this.board)) {
      this.endGame(player.token);
    } else {
      if(player.token === "X") {
         this.players[1].getMove(this);
      } else {
        this.players[0].getMove(this);
      }
    }
  } else {
    console.log("invalid move");
    player.getMove(this);
  }
}

TicTacToe.prototype.checkVictory = function(token, board) {
  var victory = false;

  var horizontal = [[],[],[]];
  var vertical = board;
  var diagonal = [[board[0][0], board[1][1], board[2][2]],
                  [board[2][0], board[1][1], board[0][2]]
                  ];

  for( var i = 0; i < 3; i++ ) {
    for ( var j = 0; j < 3; j++ ) {
      horizontal[i][j] = board[j][i];
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

TicTacToe.prototype.checkDraw = function(board) {
  return board.every(function(column){
    return column.every(function(space){
      return space !== "*";
    });
  });
}

TicTacToe.prototype.startGame = function() {
  this.players = [new HumanPlayer("X", READER), new ComputerPlayer("O")];
  this.players[0].getMove(this);
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