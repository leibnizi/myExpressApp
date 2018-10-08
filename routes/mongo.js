var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});

var kittySchema = new mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function() {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

var Kitten = mongoose.model("Kitten", kittySchema);
var silence = new Kitten({ name: "Silence" });

var fluffy = new Kitten({ name: "fluffy" });
// console.log("fluffy.__proto__: ", fluffy.__proto__);
fluffy.speak();
// fluffy.save(function(err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

fluffy.save(function(err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

var findResult;
Kitten.find(function(err, kittens) {
  if (err) return console.error(err);
  findResult = kittens;
});
Kitten.find({ name: "findfluffy" }, (err, res) =>
  console.log("findfluffy", res)
);

/* GET home page. */
router.get("/", function(req, res, next) {
  //   res.render("index", { title: "mongo" });
  res.json(findResult);
  //   res.render("index", { title: "MyExpress" }, function(err, html) {
  // res.send(findResult);
  //   });
});

module.exports = router;
