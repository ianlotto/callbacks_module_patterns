function Play(){};

Play.prototype.test = function() {
  var str = "string";

  setInterval(function() {
    console.log(str);
  }, 5000);
}

var p = new Play();
p.test();