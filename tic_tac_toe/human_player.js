(function(root) {
  var UltimateObject = root.UltimateObject = (root.UltimateObject || {});

  var HumanPlayer = UltimateObject.HumanPlayer = function (token, reader) {
    this.token = token;
    this.reader = reader;
  }

  HumanPlayer.prototype.getMove = function(ticTacToe) {
    var player = this;

    ticTacToe.render();

    this.reader.question("Player " + this.token + " turn:", function(move) {
      ticTacToe.playTurn(player, move.split(','));
    });
  }
})(this);

module.exports = this.UltimateObject.HumanPlayer




