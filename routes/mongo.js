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
var Kitten = mongoose.model("Kitten", kittySchema);
kittySchema.methods.speak = function() {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

var fluffy = new Kitten({ name: "fluffy" });
console.log("fluffy: ", fluffy);
console.log("fluffy.__proto__: ", fluffy.__proto__);
// fluffy.speak();
// fluffy.save(function(err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

/* GET home page. */
router.get("/", function(req, res, next) {
  //   res.render("index", { title: "mongo" });
  res.json(fluffy.__proto__);
  //   res.render("index", { title: "MyExpress" }, function(err, html) {
  // res.send(html);
  //   });
});

module.exports = router;
