var READER = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function Player(token) {
  this.token = token;
}

function HumanPlayer(token) {
  this.token = token;
}

HumanPlayer.prototype = new Player();

HumanPlayer.prototype.getMove = function(ticTacToe) {
  var player = this;

  ticTacToe.render();

  READER.question("Player " + this.token + " turn:", function(move) {
    ticTacToe.playTurn(player, move.split(','));
  });
}

function BoardNode(board, move) {
  this.move = move;
  this.board = board;
  this.children = [];
}

BoardNode.prototype.addChild = function(child) {
  this.children.push(child);
}

function ComputerPlayer(token) {
  this.token = token;
}

ComputerPlayer.prototype = new Player();

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
  this.players = [new HumanPlayer("X"), new ComputerPlayer("O")];
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