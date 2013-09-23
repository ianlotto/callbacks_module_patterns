// var readline = require('readline');

var READER = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft === 0) {
    completionCallback(sum);
    return;
  }

  if(numsLeft > 0) {
    READER.question("Enter a number: ", function (number) {
      number = parseInt(number);
      sum += number;
      console.log(sum);

      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
  READER.close();
});

