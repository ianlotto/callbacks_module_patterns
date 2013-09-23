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

TicTacToe.prototype.getMove = function(player) {
  READER.question("Player " + player.token + " turn:", funtion(move) {

  });

}


TicTacToe.prototype.startGame = function() {
  this.players = [new Player("X"), new Player("O")];

}

var ttt = new TicTacToe();

console.log(ttt.board);


