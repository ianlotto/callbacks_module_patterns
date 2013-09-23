var readline = require('readline');

var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var askLessThan = function(el1, el2, callback) {
  var questionStr = "Is " + el1 + " less than " + el2 + "?";
  READER.question(questionStr, function(answer) {
    if (answer === "yes") {
      callback(true);
    } else {
      callback(false);
    } // else {
//       askLessThan(el1, el2, callback);
//     }
  });
};

var performSortPass = function(arr, i, madeAnySwaps, callback) {
  if (i < arr.length - 1) {
    askLessThan(arr[i], arr[i + 1], function(lessThan) {
      if (!lessThan) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }

      performSortPass(arr, i + 1, madeAnySwaps, callback);
    });

  }
  if (i === (arr.length - 1)) {
    callback(madeAnySwaps);
  }
};

var crazyBubbleSort = function(arr, sortCompletionCallback) {

  var sortPassCallback = function(madeAnySwaps) {
    if (madeAnySwaps) {
      performSortPass(arr, 0, false, sortPassCallback);
    } else {
      sortCompletionCallback(arr);
    }
  }

  performSortPass(arr, 0, false, sortPassCallback);
};

crazyBubbleSort([3, 2, 1], function (arr) {
  console.log(arr);
  READER.close();
});