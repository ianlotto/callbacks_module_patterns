var BoardNode = require('./board_node.js');

(function(root) {
  var UltimateObject = root.UltimateObject = (root.UltimateObject || {});

  var ComputerPlayer = UltimateObject.ComputerPlayer = function (token) {
    this.token = token;
  }

  ComputerPlayer.prototype.getMove = function(ticTacToe) {
    var move;
    var that = this;
    var currentTier = new BoardNode(ticTacToe.board);
    currentTier = this.allMoves(this.token, currentTier);

    currentTier.children.forEach(function(child) {
      if(ticTacToe.checkVictory(that.token, child.board)) {
        move = child.move;
      }
    });

    if (typeof move === 'undefined') {
      move = currentTier.children[0].move;
    }

    ticTacToe.playTurn(this, move);
  }

  ComputerPlayer.prototype.allMoves = function(token, currentTier) {
    for ( var i = 0; i < 3; i++ ) {
      for ( var j = 0; j < 3; j++ ) {
        if(currentTier.board[i][j] === "*") {
          var newBoard = this.dupBoard(currentTier.board);
          newBoard[i][j] = token;
          newNode = new BoardNode(newBoard, [i, j]);
          currentTier.addChild(newNode);
        }
      }
    }

    return currentTier;
  }

  ComputerPlayer.prototype.dupBoard = function(board) {
    var newBoard = [];

    board.forEach(function(column){
      newBoard.push(column.slice());
    });

    return newBoard;
  }

})(this);

module.exports = this.UltimateObject.ComputerPlayer

