Function.prototype.myBind = function(obj) {
  this.apply(obj);
};

function greet() {
  console.log("Hey " + this.name);
}


function Cat(name) {
  this.name = name;
}

c = new Cat("Seuss");

greet.myBind(c)