(function(root) {
   var UltimateObject = root.UltimateObject = (root.UltimateObject || {});

   var BoardNode = UltimateObject.BoardNode = function(board, move) {
      this.move = move;
      this.board = board;
      this.children = [];
    }

    BoardNode.prototype.addChild = function(child) {
      this.children.push(child);
    }
})(this);

module.exports = this.UltimateObject.BoardNode