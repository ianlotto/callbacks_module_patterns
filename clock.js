function Clock() {
};

Clock.prototype.run = function() {
  var now = new Date();

  setInterval(function() {
    now.setSeconds(now.getSeconds() + 5);

    timeString = now.getHours() + ":"
      + now.getMinutes() + ":"
      + now.getSeconds();

    console.log(timeString);
  }, 5000);
};

var c = new Clock();
c.run();